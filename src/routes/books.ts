import type { Request as ExpressRequest, Response, Router } from 'express';

import { BookFactory, PLACEHOLDER_IMG_URL } from '../model/book-factory.ts';
import { BooksStore } from '../books-store.ts';
import { HTTP } from './http-status.ts';
import { NotificationService } from '../notification-service.ts';
import { OpenApiDocument } from '../openapi.ts';
import { BookSchema, RestErrorSchema } from '../schemas.ts';

type Request = ExpressRequest<Record<string, string>>;

const ISBN_CHECK_DELAY = 2_000;

const BOOKS = { title: 'Books', arrayOf: BookSchema };
const ERROR_500 = { description: 'Unexpected Internal Server Error', schema: RestErrorSchema };
const ISBN_PARAM = { name: 'isbn', type: 'string', description: 'ISBN of the book' } as const;

export class BooksRoute {

  public static create(router: Router, bookStore: BooksStore, notificationService: NotificationService, doc: OpenApiDocument) {

    const booksRoute = new BooksRoute(bookStore, notificationService);
    const route = doc.route.bind(doc, router, '/books');

    route('get', '', {
      tags: ['books'],
      summary: 'Get all books',
      responses: { 200: { description: 'List of all books', schema: BOOKS }, 500: ERROR_500 },
      security: [{ ApiKeyAuth: [] }]
    }, (req, res) => booksRoute.getAll(req, res));

    route('get', '/search/{searchTerm}', {
      tags: ['books'],
      summary: 'Get all books matching the given search term (case insensitive). The properties isbn, title, authors, published, subtitle and description are evaluated for a match.',
      parameters: [{ name: 'searchTerm', type: 'string', description: 'search term (treated case insensitive)' }],
      responses: { 200: { description: 'List of all books matching the give search term', schema: BOOKS }, 500: ERROR_500 }
    }, (req, res) => booksRoute.getAllBySearch(req, res));

    route('delete', '', {
      tags: ['books'],
      summary: 'Reset store to initial state',
      responses: { 200: { description: 'All data is now on initial state' }, 500: ERROR_500 }
    }, (req, res) => booksRoute.reset(req, res));

    route('post', '', {
      tags: ['books'],
      summary: 'Create a new book',
      requestBody: { name: 'book', description: 'A new book to be stored', schema: BookSchema },
      responses: {
        201: { description: 'Book was created', schema: BookSchema },
        400: { description: 'Invalid data', schema: RestErrorSchema },
        409: { description: 'Book does already exist', schema: RestErrorSchema },
        500: ERROR_500
      }
    }, (req, res) => booksRoute.create(req, res));

    route('get', '/{isbn}', {
      tags: ['books'],
      summary: 'Return a single book by ISBN',
      parameters: [ISBN_PARAM],
      responses: {
        200: { description: 'Returns the book with the requested ISBN', schema: BookSchema },
        404: { description: 'Book does not exist', schema: RestErrorSchema },
        500: ERROR_500
      }
    }, (req, res) => booksRoute.getByISBN(req, res));

    route('get', '/{isbn}/check', {
      tags: ['books'],
      summary: 'Return whether ISBN exists or not',
      description: 'This endpoint returns wether a book exists or not after an artificial delay of 2 seconds.',
      parameters: [ISBN_PARAM],
      responses: {
        200: { description: 'Returns whether the ISBN exists in the database or not (boolean)' },
        500: ERROR_500
      }
    }, (req, res) => booksRoute.checkISBN(req, res));

    route('put', '/{isbn}', {
      tags: ['books'],
      summary: 'Update an existing book',
      description: 'Requires a full book entry, ISBN in query and body must match',
      parameters: [{ ...ISBN_PARAM, description: 'ISBN of the book to update' }],
      requestBody: { name: 'book', description: 'An existing book to update', schema: BookSchema },
      responses: {
        200: { description: 'Book was updated', schema: BookSchema },
        400: { description: 'Invalid data', schema: RestErrorSchema },
        404: { description: 'Book does not exist', schema: RestErrorSchema },
        500: ERROR_500
      }
    }, (req, res) => booksRoute.update(req, res));

    route('delete', '/{isbn}', {
      tags: ['books'],
      summary: 'Delete a book',
      parameters: [{ ...ISBN_PARAM, description: 'ISBN of the book to delete' }],
      responses: {
        200: { description: 'Book was deleted or does not exist' },
        500: ERROR_500
      }
    }, (req, res) => booksRoute.delete(req, res));
  }

  private store: BooksStore;
  private notificationService: NotificationService;

  constructor(store: BooksStore, notificationService: NotificationService) {
    this.store = store;
    this.notificationService = notificationService;
  }

  // GET /books
  getAll(req: Request, res: Response) {
    this.store.setSecure(res.locals.authorized);

    res.json(this.store.getAll());
  };

  getAllBySearch(req: Request, res: Response) {
    this.store.setSecure(res.locals.authorized);

    const searchTerm = req.params.searchTerm;

    res.json(this.store.getAllBySearch(searchTerm));
  };

  getByISBN(req: Request, res: Response) {
    this.store.setSecure(res.locals.authorized);

    const isbn = req.params.isbn;
    const book = this.store.getByIsbn(isbn);

    if (!book) {
      return res.status(HTTP.NOT_FOUND).send('Book does not exist');
    }

    res.json(book);
  };

  checkISBN(req: Request, res: Response) {
    this.store.setSecure(res.locals.authorized);

    const isbn = req.params.isbn;
    const bookExist = this.store.isbnExists(isbn);

    setTimeout(() => {
      res.json(bookExist);
    }, ISBN_CHECK_DELAY);
  };

  create(req: Request, res: Response) {
    this.store.setSecure(res.locals.authorized);

    const bookJson = req.body;
    const isbn = bookJson.isbn;

    if (!isbn) {
      return res.status(HTTP.BAD_REQUEST).send('Invalid data: ISBN number is mandatory');
    }

    if (this.store.isbnExists(isbn)) {
      return res.status(HTTP.CONFLICT).send('Book does already exist');
    }

    if (this.store.isFull()) {
      return res.status(HTTP.BAD_REQUEST).send('Too many books: please reset the book list (DELETE /books)');
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
  };

  update(req: Request, res: Response) {
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
  };

  delete(req: Request, res: Response) {
    this.store.setSecure(res.locals.authorized);

    const isbn = req.params.isbn;
    this.store.delete(isbn);

    res.status(HTTP.OK).json({ success: true });
  };

  reset(req: Request, res: Response) {

    this.store.reset();

    res.status(HTTP.OK).json({ success: true });
  };
}
