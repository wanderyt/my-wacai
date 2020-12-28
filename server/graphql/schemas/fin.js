const {makeExecutableSchema, PubSub} = require('apollo-server');
const {finDBOperationWrapper} = require('../utils/db-helper');
const {getFinList, getSumByDay, getSumByWeek, getSumByYearMonth} = require('../../db/fin/get');
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
    finTopList(top: Int, userId: Int, year: Int, month: Int): [Fin!],
    sumByMonth(userId: Int, year: Int, month: Int): Float!,
    sumByWeek(userId: Int, year: Int, month: Int, day: Int, dayOfWeek: Int): Float!,
    sumByDay(userId: Int, year: Int, month: Int, day: Int): Float!,
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
    },
    sumByMonth: async (parent, {userId, year, month}, context) => {
      const {user: currentUser, logger} = context;
      const {userId: currentUserId} = currentUser || {};
      const sumByMonthResp = await finDBOperationWrapper(getSumByYearMonth, {userId: userId || currentUserId, month: month || now.getMonth() + 1, year: year || now.getFullYear()});
      if (sumByMonthResp.rows && sumByMonthResp.rows.length > 0) {
        const sumByMonth = sumByMonthResp.rows[0].total || 0;
        return toFixed(sumByMonth);
      } else {
        logger.error({error: sumByMonthResp.err});
      }
    },
    sumByWeek: async (parent, {userId, year, month, day, dayOfWeek}, context) => {
      const {user: currentUser, logger} = context;
      const {userId: currentUserId} = currentUser || {};
      const data = {
        userId: userId || currentUserId,
        month: month || now.getMonth() + 1,
        year: year || now.getFullYear(),
        day: day || now.getDate(),
        dayOfWeek: dayOfWeek || now.getDay()
      };
      const sumByWeekResp = await finDBOperationWrapper(getSumByWeek, data);
      if (sumByWeekResp.rows && sumByWeekResp.rows.length > 0) {
        const sumByWeek = sumByWeekResp.rows[0].total || 0;
        return toFixed(sumByWeek);
      } else {
        logger.error({error: sumByWeekResp.err});
      }
    },
    sumByDay: async (parent, {userId, year, month, day}, context) => {
      const {user: currentUser, logger} = context;
      const {userId: currentUserId} = currentUser || {};
      const data = {
        userId: userId || currentUserId,
        month: month || now.getMonth() + 1,
        year: year || now.getFullYear(),
        day: day || now.getDate()
      };
      const sumByDayResp = await finDBOperationWrapper(getSumByDay, data);
      if (sumByDayResp.rows && sumByDayResp.rows.length > 0) {
        const sumByDay = sumByDayResp.rows[0].total || 0;
        return toFixed(sumByDay);
      } else {
        logger.error({error: sumByDayResp.err});
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

const toFixed = (value = 0, fractionDigits = 2) => {
  return Number(parseFloat(value).toFixed(2));
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
