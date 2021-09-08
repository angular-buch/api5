export const typeDefs = `
  type Query {
    authors: [Author]
    books: [Book]
    book(isbn: ID!): Book
    isbnExists(isbn: ID!): Boolean
    bookSearch(searchTerm: String): [Book]
  }

  type Mutation {
    createBook(book: BookInput!): Book
  }

  type Book {
    isbn: ID!
    title: String
    subtitle: String
    rating: Int
    description: String
    thumbnailUrl: String
    authors: [Author]
  }

  type Author {
    name: String,
    books: [Book]
  }

  input BookInput {
    isbn: String
    title: String
    subtitle: String
    rating: Int
    description: String
    thumbnailUrl: String
  }
`
