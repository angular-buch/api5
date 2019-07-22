import * as _ from 'lodash';

import { Book } from './model/book';
import { BookFactory } from './model/book-factory';
import { SomeBooks } from './model/some-books';

export class BooksStore {

  // will exist as long as the service runs
  private booksCache = SomeBooks.get();
  private isSecure = false;

  get books(): Book[] {
    return this.isSecure ? [...this.booksCache, SomeBooks.secureBook] : this.booksCache
  }

  setSecure(isSecure = false) {
    this.isSecure = isSecure;
  }

  getAll(): Book[] {
    return _(this.books)
      .sortBy(b => b.rating)
      .reverse()
      .value();
  };

  getAllBySearch(searchTerm: string): Book[] {

    searchTerm = searchTerm.toLowerCase();
    const containsSearchTerm = (checked) => ~checked.toLowerCase().indexOf(searchTerm);

    return _(this.books)
      .filter(b =>
          !!(
            containsSearchTerm(b.isbn) ||
            containsSearchTerm(b.title) ||
            _.some(b.authors, containsSearchTerm) ||
            containsSearchTerm(b.published.toISOString()) ||
            containsSearchTerm(b.subtitle) ||
            containsSearchTerm(b.description))
          )
      .sortBy(b => b.rating)
      .reverse()
      .value();
  };

  getByIsbn(isbn: string) {
    isbn = BookFactory.normalizeIsbn(isbn);
    return this.books.find(book => book.isbn === isbn)
  };

  findByAuthorName(author: string) {
    return this.books.filter(b => b.authors.includes(author));
  }

  getAllAuthors() {
    return _(this.books)
      .flatMap(b => b.authors)
      .uniq()
      .value()
  }

  isbnExists(isbn: string) {
    return !!this.getByIsbn(isbn);
  }

  create(book: Book) {
    if (book.isbn === SomeBooks.secureBook.isbn) {
      // do nothing if someone wants to manipulate the secure book
      return;
    }

    this.booksCache.push(book);
  };

  update(book: Book) {
    this.delete(book.isbn);
    this.create(book);
  };

  delete(isbn: string) {
    isbn = BookFactory.normalizeIsbn(isbn);

    // do nothing if someone wants to manipulate the secure book
    if (isbn !== SomeBooks.secureBook.isbn) {
      this.booksCache = this.booksCache.filter(book => book.isbn !== isbn);
    }
  };

  reset() {
    this.booksCache = SomeBooks.get();
  };
}
