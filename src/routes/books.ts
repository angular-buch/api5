import { NextFunction, Request, Response, Router } from 'express';
import * as _ from 'lodash';

import { BookFactory, PLACEHOLDER_IMG_URL } from '../model/book-factory';
import { BooksStore } from '../books-store';
import { HTTP } from './http';
import { NotificationService } from '../notification-service';

const ISBN_CHECK_DELAY = 2_000;

export class BooksRoute {

  public static create(router: Router, bookStore: BooksStore, notificationService: NotificationService) {

    const booksRoute = new BooksRoute(bookStore, notificationService);
    const methodsToBind = [
      'getAll', 'getAllBySearch', 'reset', 'create',
      'getByISBN', 'checkISBN', 'update', 'delete']
    _.bindAll(booksRoute, methodsToBind);

    router.get('/', booksRoute.getAll);
    router.get('/search/:search', booksRoute.getAllBySearch);
    router.delete('/', booksRoute.reset);
    router.post('/', booksRoute.create);
    router.get('/:isbn', booksRoute.getByISBN);
    router.get('/:isbn/check', booksRoute.checkISBN);
    router.put('/:isbn', booksRoute.update);
    router.delete('/:isbn', booksRoute.delete);
  }

  constructor(
    private store: BooksStore,
    private notificationService: NotificationService
  ) {  }

  // GET /books
  getAll(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    res.json(this.store.getAll());
    next();
  };

  getAllBySearch(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    const searchTerm = req.params.search;

    res.json(this.store.getAllBySearch(searchTerm));
    next();
  };

  getByISBN(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    const isbn = req.params.isbn;
    const book = this.store.getByIsbn(isbn);

    if (!book) {
      return res.status(HTTP.NOT_FOUND).send('Book does not exist');
    }

    res.json(book);
    next();
  };

  checkISBN(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    const isbn = req.params.isbn;
    const bookExist = this.store.isbnExists(isbn);

    setTimeout(() => {
      res.json(bookExist);
      next();
    }, ISBN_CHECK_DELAY);
  };

  create(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    const bookJson = req.body;
    const isbn = bookJson.isbn;

    if (!isbn) {
      return res.status(HTTP.BAD_REQUEST).send('Invalid data: ISBN number is mandatory');
    }

    if (this.store.isbnExists(isbn)) {
      return res.status(HTTP.CONFLICT).send('Book does already exist');
    }

    const book = BookFactory.fromJson(bookJson);
    this.store.create(book);

    res.status(HTTP.CREATED).json(book);

    // Send notifications if there is a subscription
    if (this.notificationService.hasSubscriber()) {
      const notificationPayload = {
        title: `🆕📕 ${book.title}`,
        body: `ISBN: ${book.isbn}`,
        icon: book.thumbnailUrl || PLACEHOLDER_IMG_URL,
        vibrate: [100, 50, 100],
        data: { book }
      };
      this.notificationService.notifySubscribers(notificationPayload);
    }

    next();
  };

  update(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    const bookJson = req.body;
    const isbn = bookJson.isbn;

    if (!isbn) {
      return res.status(HTTP.BAD_REQUEST).send('Invalid data: ISBN number is mandatory');
    }

    if (req.params.isbn != isbn) {
      return res.status(HTTP.BAD_REQUEST).send('Invalid data: ISBN from query and body must match');
    }

    if (!this.store.isbnExists(isbn)) {
      return res.status(HTTP.NOT_FOUND).send('Book does not exist');
    }

    const book = BookFactory.fromJson(bookJson);
    this.store.update(book)

    res.status(HTTP.OK).json(book);
    next();
  };

  delete(req: Request, res: Response, next: NextFunction) {
    this.store.setSecure(res.locals.authorized);

    const isbn = req.params.isbn;
    this.store.delete(isbn);

    res.send(HTTP.OK);
    next();
  };

  reset(req: Request, res: Response, next: NextFunction) {

    this.store.reset();

    // reset() can be also called without params!
    if (res && next) {
      res.send(HTTP.OK);
      next();
    }
  };
}
