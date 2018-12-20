import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { typeDefs } from './types';

export const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

