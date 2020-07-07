const {mergeSchemas} = require('apollo-server');
// const typeDefinitions = `
//   type User {
//     id: Int!
//     name: String!
//     password: String!
//   }

//   type Category {
//     category: String!
//     subCategory: String!
//     isCommon: Int
//     user: User
//   }

//   type FinTemplate {
//     category: String!
//     subcategory: String!
//     comment: String!
//     place: String!
//     user: User
//   }

//   type Fin {
//     id: ID!,
//     category: String!
//     subcategory: String!
//     comment: String!
//     date: String
//     amount: Float
//     isScheduled: Int
//     scheduleId: String
//     place: String
//     city: String
//     user: User
//   }

//   type Query {
//     finItems: [Fin]
//   }
// `;

const userSchemas = require('./user');
const defaultSchemas = require('./default');
const finSchemas = require('./fin');

module.exports = mergeSchemas({
  schemas: [
    userSchemas,
    defaultSchemas,
    finSchemas,
  ]
});
