import { format } from 'date-fns';
import { Book } from './book';

export const PLACEHOLDER_IMG_URL = 'https://api5.angular-buch.com/images/placeholder_book.svg';

export class BookFactory {

  static empty(): Book {
    return {
      isbn: '',
      title: '',
      authors: [''],
      published: new Date().toISOString(),
      subtitle: '',
      rating: 3,
      thumbnailUrl: PLACEHOLDER_IMG_URL,
      description: ''
    };
  }

  static fromJson(json: any): Book {

    const book = BookFactory.empty();

    if (this.validString(json.isbn)) {
      book.isbn = BookFactory.normalizeIsbn(json.isbn);
    }

    if (this.validString(json.title)) {
      book.title = json.title.trim();
    }

    if (this.validArray(json.authors)) {
      let authors: string[] = [];
      for (let author of json.authors) {
        if (this.validString(author)) { authors.push(author.trim()); }
      }
      if (authors.length) { book.authors = authors; }
    }

    if (this.validString(json.published) &&
        this.validDate(json.published)) {
      book.published = BookFactory.normalizeDate(json.published);
    }

    if (this.validString(json.subtitle)) {
      book.subtitle = json.subtitle.trim();
    }

    if (this.validNumber(json.rating)) {
      book.rating = BookFactory.normalizeRating(json.rating);
    }

    if (this.validString(json.thumbnailUrl)) {
      book.thumbnailUrl = json.thumbnailUrl;
    }

    if (this.validString(json.description)) {
      book.description = json.description.trim();
    }

    return book;
  }

  public static normalizeIsbn(isbn: string): string {
    let i = isbn + '';
    return i.replace(/[^0-9]/g, '');
  }

  public static normalizeRating(rating: number): number {
    let r = +rating;
    return (r < 0) ? 0 : (r > 5) ? 5 : r;
  }

  public static normalizeDate(date: string): string {
    const d = new Date(date);
    return format(d, 'yyyy-MM-dd');
  }

  private static validString(str: string) {
    return str === '' || (str && typeof str == 'string');
  }

  private static validDate(date: string) {
    return (new Date(date)).toString() != 'Invalid Date';
  }

  private static validArray(arr: string) {
    return arr && Array.isArray(arr) && arr.length
  }

  private static validObject(obj) {
    return obj && typeof obj == 'object';
  }

  private static validNumber(no: string) {
    return no && typeof no == 'number';
  }
}


console.log(BookFactory.normalizeDate('2021-10-01'));
