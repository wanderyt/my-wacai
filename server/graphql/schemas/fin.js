const {makeExecutableSchema, PubSub} = require('apollo-server');
const {finDBOperationWrapper} = require('../utils/db-helper');
const {getFinList} = require('../../db/fin/get');
const pubsub = new PubSub();

const mockUsers = [{
  id: 1,
  name: 'Scott',
  password: 'Tiger',
}];

const FIN_QUERIED = 'FIN_QUERIED';

const typeDefs = `
  type Fin {
    "fin item id"
    id: ID!,
    category: String!
    subcategory: String!
    comment: String!
    date: String
    amount: Float
    "whether this fin item is set as scheduled, using [0, 1, 2, 3, 4]"
    isScheduled: Int
    scheduleId: String
    place: String
    "city where this fin item happened, default as 'Shanghai'"
    city: String
    userId: Int
  }

  type Subscription {
    finQueried: [Fin]
  }

  type Query {
    finTopList(top: Int, userId: Int, year: Int, month: Int): [Fin!]
  }
`;

const resolvers = {
  Query: {
    finTopList: async (parent, {top = 10, userId, year, month}, context) => {
      const {user: currentUser, logger} = context;
      const {userId: currentUserId} = currentUser || {};
      const now = new Date();
      console.log('currentUser: ', currentUser);
      console.log('userId || currentUserId: ', userId || currentUserId);
      const finListResp = await finDBOperationWrapper(getFinList, {top, userId: userId || currentUserId, month: month || now.getMonth() + 1, year: year || now.getFullYear()});
      if (!finListResp.err) {
        const finList = finListResp.rows || [];
        pubsub.publish(FIN_QUERIED, {finList});
        return finList;
      }
    }
  },
  Fin: {
    // id: (parent) => parent.id,
    // category: (parent) => parent.category,
    // subcategory: (parent) => parent.subcategory,
    // comment: (parent) => parent.comment,
    // date: (parent) => parent.date,
    // amount: (parent) => parent.amount,
    // isScheduled: (parent) => parent.isScheduled,
    // scheduleId: (parent) => parent.scheduleId,
    // place: (parent) => parent.place,
    // city: (parent) => parent.city,
    userId: (parent) => parent.USERID,
  },
  Subscription: {
    finQueried: {
      subscribe: () => {
        console.log('Subscription -> finQueried -> subscribe');
        return pubsub.asyncIterator([FIN_QUERIED]);
      }
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
