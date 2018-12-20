import { BookFactory } from "../model/book-factory";

export const resolvers = {
  Query: {
    books: (source, args, context) => context.store.getAll(),
    authors: (source, args, context) => context.store.getAllAuthors().map(name => ({ name })),
    book: (source, args, context) => context.store.getByIsbn(args.isbn),
    isbnExists: (source, args, context) => context.store.isbnExists(args.isbn),
    bookSearch: (source, args, context) => context.store.getAllBySearch(args.searchTerm)
  },
  Book: {
    authors: (book) => book.authors.map(name => ({ name }))
  },
  Author: {
    books: (author, args, context) => context.store.findByAuthorName(author.name)
  },
  Mutation: {
    createBook: (source, args, context) => {
      const book = BookFactory.fromJson(args.book);
      context.store.create(book);
      return book;
    }
  }
}
