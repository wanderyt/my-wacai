const {makeExecutableSchema} = require('apollo-server');
const {getUserInfo} = require('../../db/user/user');
const {finDBOperationWrapper} = require('../utils/db-helper');

const typeDefinitions = `
  type User {
    id: Int!
    name: String!
    password: String!
  }

  type Query {
    validateUser(name: String!, password: String!): User
  }
`;

// getUsers: [User]
// getUserById(id: ID!): User

const resolvers = {
  User: {
    name: (parent) => {
      return parent.USERNAME;
    },
    password: (parent) => {
      return parent.PASSWORD;
    },
    id: (parent) => {
      return parent.USERID;
    }
  },
  Query: {
    validateUser: async (parent, {name, password}, context = {}) => {
      const {currentUser, logger} = context;
      logger.info({message: `currentUser: ${currentUser}`});
      const user = await finDBOperationWrapper(getUserInfo, {username: name, password});
      if (user.rows && user.rows.length === 1) {
        return user.rows[0];
      }
    }
  }
}

module.exports = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers
});
