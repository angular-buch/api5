import * as graphqlHTTP from 'express-graphql';
import { NextFunction, Request, Response, Router } from 'express';
import { BooksStore } from '../books-store';
import { executableSchema } from './schema';

export class GraphQLRoute {

  public static create(router: Router, bookStore: BooksStore) {
    router.use(graphqlHTTP({
      schema: executableSchema,
      graphiql: true,
      context: {
        store: bookStore
      }
    }));
  }
}
