const {makeExecutableSchema} = require('apollo-server');

const typeDefs = `
  type Query {
    debugMessage: String!
  }
  type Mutation {
    debugMessage: String!
  }
`;

const resolvers = {
  Query: {
    debugMessage: () => 'Debug from graphql introspection'
  },
  Mutation: {
    debugMessage: () => 'Debug from graphql introspection'
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
