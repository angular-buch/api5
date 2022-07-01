import * as _ from 'lodash';

import { Book } from './model/book';
import { BookFactory } from './model/book-factory';
import { SomeBooks, BookWithSecureInfo } from './model/some-books';

export class BooksStore {

  // will exist as long as the service runs
  private booksCache: BookWithSecureInfo[] = [];
  private isSecure = false;

  private securePrefix = '[SECURE] ';

  constructor() {
    this.populateCache();
  }

  get books(): Book[] {
    let books = this.onlyPublicBooks(this.booksCache);
    if (this.isSecure) {
      books = [...this.onlySecureBooks(this.booksCache), ...books];
    }

    return this.removeSecureInfo(books);
  }

  private sortBooks<T extends Book>(books: T[]): T[] {
    return _(books).sortBy(b => b.title).value()
  }

  private addSecureTitle(books: BookWithSecureInfo[]): BookWithSecureInfo[] {
    return books.map(book => {
      const title = book.secure ? this.securePrefix + book.title : book.title;
      return { ...book, title };
    });
  }

  private removeSecureInfo(books: BookWithSecureInfo[]): Book[] {
    return books.map(book => {
      const { secure, ...rest } = book;
      return rest;
    })
  }

  private onlyPublicBooks(books: BookWithSecureInfo[]): BookWithSecureInfo[] {
    return this.sortBooks(books.filter(book => !book.secure));
  }

  private onlySecureBooks(books: BookWithSecureInfo[]): BookWithSecureInfo[] {
    return this.addSecureTitle(this.sortBooks(books.filter(book => book.secure)));
  }

  setSecure(isSecure = false) {
    this.isSecure = isSecure;
  }

  getAll(): Book[] {
    return this.books;
  };

  getAllBySearch(searchTerm: string): Book[] {
    searchTerm = searchTerm.toLowerCase();
    const containsSearchTerm = (checked) => ~checked.toLowerCase().indexOf(searchTerm);

    return this.books
      .filter(b =>
        !!(
          containsSearchTerm(b.isbn) ||
          containsSearchTerm(b.title) ||
          _.some(b.authors, containsSearchTerm) ||
          containsSearchTerm(b.published) ||
          containsSearchTerm(b.subtitle) ||
          containsSearchTerm(b.description))
        )
  };

  getByIsbn(isbn: string): Book | undefined {
    const cleanIsbn = BookFactory.normalizeIsbn(isbn);
    return this.books.find(book => book.isbn === cleanIsbn);
  };

  findByAuthorName(author: string): Book[] {
    return this.books.filter(b => b.authors.includes(author));
  }

  getAllAuthors(): string[] {
    return _(this.books)
      .flatMap(b => b.authors)
      .uniq()
      .value()
  }

  isbnExists(isbn: string): boolean {
    // search in full cache so that secure books are checked, too
    const book = this.booksCache.find(book => book.isbn === isbn);
    return !!book;
  }

  create(book: Book) {
    const newBook: BookWithSecureInfo = {
      ...book,
      title: this.stripSecurePrefix(book.title),
      secure: this.isSecure
    };
    this.booksCache = [...this.booksCache, newBook];
  };

  update(book: Book) {
    const oldBook = this.booksCache.find(b => b.isbn === book.isbn);
    if (!oldBook) { return; }
    const newBook: BookWithSecureInfo = {
      ...book,
      title: this.stripSecurePrefix(book.title),
      secure: oldBook.secure
    };

    this.booksCache = this.booksCache.map(b => (b.isbn === book.isbn) ? newBook : b);
  };

  delete(isbn: string) {
    isbn = BookFactory.normalizeIsbn(isbn);
    this.booksCache = this.booksCache.filter(book => book.isbn !== isbn);
  };

  private populateCache() {
    this.booksCache = SomeBooks.getAll();
  }

  private stripSecurePrefix(title: string): string {
    if (title.startsWith(this.securePrefix)) {
      return title.substr(this.securePrefix.length);
    } else {
      return title;
    }
  }

  reset() {
    this.populateCache();
  };
}
