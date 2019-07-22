import { Thumbnail } from './thumbnail';
import { Book } from './book';

export const PLACEHOLDER_IMG = {
  url: 'https://api3.angular-buch.com/images/placeholder_book.svg',
  title: 'Kein Vorschaubild verfügbar'
}

export class BookFactory {

  static empty(): Book {
    const defaultThumbnail = new Thumbnail(PLACEHOLDER_IMG.url, PLACEHOLDER_IMG.title);

    return new Book('', '', [''], new Date(), '', 3, [defaultThumbnail], '');
  }

  static fromJson(json: any): Book {

    let book = BookFactory.empty();

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
      book.published = new Date(json.published);
    }

    if (this.validString(json.subtitle)) {
      book.subtitle = json.subtitle.trim();
    }

    if (this.validNumber(json.rating)) {
      book.rating = BookFactory.normalizeRating(json.rating);
    }

    if (this.validArray(json.thumbnails)) {
      let thumbnails: Thumbnail[] = [];
      for (let thumbnail of json.thumbnails) {

        if (this.validObject(thumbnail) &&
            this.validString(thumbnail.url) &&
            this.validString(thumbnail.title)) {
          thumbnails.push(new Thumbnail(thumbnail.url.trim(), thumbnail.title.trim()));
        }
      }
      if (thumbnails.length) { book.thumbnails = thumbnails; }
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
