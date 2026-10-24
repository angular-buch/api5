import type { Book } from './model/book.ts';
import { BookFactory } from './model/book-factory.ts';
import { SomeBooks } from './model/some-books.ts';
import type { BookWithSecureInfo } from './model/some-books.ts';

// "Angular 4. Auflage" should always be on top, all other books are sorted by title
function sortKey(book: Book): string {
  return book.isbn === '9783864909467' ? '00000000' : book.title;
}

// Upper bound for the in-memory store, so that nobody can fill up the server's memory.
export const MAX_BOOKS = 1000;

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
    return [...books].sort((a, b) => {
      const keyA = sortKey(a);
      const keyB = sortKey(b);
      return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
    });
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
    const containsSearchTerm = (checked?: string) => !!checked && ~checked.toLowerCase().indexOf(searchTerm);

    return this.books
      .filter(b =>
        !!(
          containsSearchTerm(b.isbn) ||
          containsSearchTerm(b.title) ||
          b.authors.some(containsSearchTerm) ||
          containsSearchTerm(b.published) ||
          containsSearchTerm(b.subtitle) ||
          containsSearchTerm(b.description))
        )
  };

  getByIsbn(isbn: string): Book | undefined {
    const cleanIsbn = BookFactory.normalizeIsbn(isbn);
    return this.books.find(book => book.isbn === cleanIsbn);
  };

  isbnExists(isbn: string): boolean {
    isbn = BookFactory.normalizeIsbn(isbn);

    // search in full cache so that secure books are checked, too
    const book = this.booksCache.find(book => book.isbn === isbn);
    return !!book;
  }

  isFull() {
    return this.booksCache.length >= MAX_BOOKS;
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
      return title.slice(this.securePrefix.length);
    } else {
      return title;
    }
  }

  reset() {
    this.populateCache();
  };
}
