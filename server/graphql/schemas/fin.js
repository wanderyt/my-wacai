const {makeExecutableSchema, PubSub} = require('apollo-server');
const {getFinTopList, getFinById, getRatingByFinId, getFinByScheduleIdAndBaseDatetime, getSumByYearMonth, getSumByWeek, getSumByDay} = require('../../db/fin/gql-get');
const {createFinItem, createScheduledFinItem, createRatingByFinId} = require('../../db/fin/gql-create');
const {updateFinItemById, updateScheduledFinItemByScheduleId, updateRatingByFinId} = require('../../db/fin/gql-update');
const {deleteFinItemById, deleteScheduledFinItemsByTime, deleteRatingByFinId} = require('../../db/fin/gql-delete');
const { uuid } = require('../../db/util');
const pubsub = new PubSub();

const mockUsers = [{
  id: 1,
  name: 'Scott',
  password: 'Tiger',
}];

const typeDefs = `
  input FinInput {
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
    tags: String
  }

  input RatingInput {
    rating: Int
    positiveComment: String
    negativeComment: String
  }

  type Rating {
    id: String
    rating: Int
    positiveComment: String
    negativeComment: String
    finId: String
    userId: Int
  }

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
    rating: Rating,
  }

  type Subscription {
    finQueried: [Fin]
  }

  type Query {
    finTopList(top: Int, userId: Int, year: Int, month: Int): [Fin!],
    fin(id: String): Fin,
    finByScheduleIdAndBaseDatetime(scheduleId: String, year: Int, month: Int, day: Int): [Fin!],
    sumByYearMonth(year: Int, month: Int): Float,
    sumByWeek(year: Int, month: Int, day: Int, dayOfWeek: Int): Float,
    sumByDay(year: Int, month: Int, day: Int): Float,
  }

  type Mutation {
    createFullFinItem(finInput: FinInput, ratingInput: RatingInput): Fin!
    createScheduledFullFinItem(finInput: FinInput, ratingInput: RatingInput): [ID]
    updateFullFinItem(finInput: FinInput, ratingInput: RatingInput): Fin!
    updateScheduledFullFinItem(finInput: FinInput): Boolean
    deleteFullFinItemById(finId: ID): Fin!
    deleteFullFinItemByScheduleId(scheduleId: ID, year: Int, month: Int, day: Int): [ID!]
  }
`;

const resolvers = {
  Mutation: {
    createFullFinItem: async (parent, {finInput, ratingInput}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      try {
        const {id: finId} = await createFinItem({...finInput, userId});
        const {id: ratingId} = await createRatingByFinId({...ratingInput, finId, userId});
        const result = {finId, ratingId};
        pubsub.publish('CREATE_FULL_FIN_ITEM_MUTATION', result);
        return {id: finId};
      } catch (e) {
        logger.error({error: e});
        return {id: ''};
      };
    },
    createScheduledFullFinItem: async (parent, {finInput, ratingInput}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      try {
        const {ids: finIds} = await createScheduledFinItem({...finInput, isScheduled: finInput.isScheduled || 4, scheduleId: uuid(), userId});
        if (finIds && finIds.length > 0) {
          finIds.map(async (finId) => {
            await createRatingByFinId({...ratingInput, finId, userId});
          });
        }
        const result = {finIds};
        pubsub.publish('CREATE_SCHEDULED_FULL_FIN_ITEM_MUTATION', result);
        return finIds;
      } catch (e) {
        logger.error({error: e});
        return [];
      };
    },
    updateFullFinItem: async (parent, {finInput, ratingInput}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      try {
        const {id: finId} = await updateFinItemById({...finInput, userId});
        console.log("finId: ", finId);
        await updateRatingByFinId({...ratingInput, finId, userId});
        const result = {finId};
        pubsub.publish('UPDATE_FULL_FIN_ITEM_MUTATION', result);
        return {id: finId};
      } catch (e) {
        logger.error({error: e});
        return {id: ''};
      };
    },
    updateScheduledFullFinItem: async (parent, {finInput}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      try {
        const {status} = await updateScheduledFinItemByScheduleId({...finInput, userId});
        // TODO - Support update rating for schedule items
        const result = {status};
        pubsub.publish('UPDATE_FULL_FIN_ITEM_MUTATION', result);
        return result;
      } catch (e) {
        logger.error({error: e});
        return {status: false};
      };
    },
    deleteFullFinItemById: async (parent, {finId}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      try {
        await deleteRatingByFinId({finId, userId});
        const {id} = await deleteFinItemById({id: finId, userId});
        const result = {finId: id};
        pubsub.publish('DELETE_FULL_FIN_ITEM_MUTATION', result);
        return {id};
      } catch (e) {
        logger.error({error: e});
        return {id: ''};
      };
    },
    deleteFullFinItemByScheduleId: async (parent, {scheduleId, year, month, day}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      console.log("deleteScheduledFinItemsByTime data - ", {scheduleId, year, month, day});
      try {
        const {rows: fins} = await getFinByScheduleIdAndBaseDatetime({scheduleId, userId, year, month, day});
        const finIds = fins.map((fin) => fin.id) || [];
        console.log("finIds: ", finIds);
        console.log("finIds length: ", finIds.length);
        if (finIds.length > 0) {
          finIds.forEach(async (id) => {
            await deleteRatingByFinId({finId: id, userId});
            await deleteFinItemById({id: id, userId});
          });
        }
        const result = {ids: finIds};
        pubsub.publish('DELETE_FULL_FIN_ITEM_MUTATION', result);
        return finIds;
      } catch (e) {
        logger.error({error: e});
        return [];
      };
    }
  },
  Query: {
    finTopList: async (parent, {top = 10, userId, year, month}, context) => {
      const {user: currentUser, logger} = context;
      const {userId: currentUserId} = currentUser || {};
      const now = new Date();
      const finListResp = await getFinTopList({top, userId: userId || currentUserId, month: month || now.getMonth() + 1, year: year || now.getFullYear()});
      if (!finListResp.err) {
        const finList = finListResp.rows || [];
        pubsub.publish('FIN_TOP_LIST_QUERIED', {finList});
        return finList;
      }
    },
    fin: async (parent, {id}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      logger.info({message: `currentUser: ${userId}`});
      const finResp = await getFinById({userId, id});
      if (!finResp.err) {
        const fin = (finResp.rows || [])[0];
        pubsub.publish('FIN_ITEM_QUERIED', {fin});
        return fin;
      }
    },
    finByScheduleIdAndBaseDatetime: async (parent, {scheduleId, year, month, day}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      const finResp = await getFinByScheduleIdAndBaseDatetime({scheduleId, userId, year, month, day});
      if (!finResp.err) {
        const fins = finResp.rows || [];
        pubsub.publish('FIN_ITEM_QUERIED', {fins});
        return fins;
      }
    },
    sumByYearMonth: async (parent, {year, month}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      const sumResponse = await getSumByYearMonth({month, year, userId});
      if (!sumResponse.err) {
        const sumResult = sumResponse.rows || [];
        pubsub.publish('SUM_BY_YEAR_MONTH', {sumResult});
        return sumResult.length > 0 ? sumResult[0].total : 0;
      }
    },
    sumByWeek: async (parent, {year, month, day, dayOfWeek}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      const sumResponse = await getSumByWeek({year, month, day, dayOfWeek, userId});
      if (!sumResponse.err) {
        const sumResult = sumResponse.rows || [];
        pubsub.publish('SUM_BY_WEEK', {sumResult});
        return sumResult.length > 0 ? sumResult[0].total : 0;
      }
    },
    sumByDay: async (parent, {year, month, day}, context) => {
      const {user: currentUser, logger} = context;
      logger.info({
        message: 'sumByDay gql query',
        params: {year, month, day}
      });
      const {userId} = currentUser || {};
      const sumResponse = await getSumByDay({year, month, day, userId});
      if (!sumResponse.err) {
        const sumResult = sumResponse.rows || [];
        pubsub.publish('SUM_BY_DAY', {sumResult});
        return sumResult.length > 0 ? sumResult[0].total : 0;
      }
    }
  },
  Fin: {
    id: (parent) => parent.id,
    category: (parent) => parent.category,
    subcategory: (parent) => parent.subcategory,
    comment: (parent) => parent.comment,
    date: (parent) => parent.date,
    amount: (parent) => parent.amount,
    isScheduled: (parent) => parent.isScheduled,
    scheduleId: (parent) => parent.scheduleId,
    place: (parent) => parent.place,
    city: (parent) => parent.city,
    userId: (parent) => parent.USERID,
    rating: async (parent) => {
      console.log("Fin - Rating => ", parent);
      const options = {
        userId: parent.USERID,
        finId: parent.id,
      };
      const ratingResp = await getRatingByFinId(options);
      if (!ratingResp.err) {
        const rating = ratingResp.rows || [];
        pubsub.publish('RATING_QUERIED', {rating: rating[0]});
        return rating[0];
      }
    },
  },
  Rating: {
    id: (parent) => parent.rating_id,
    rating: (parent) => parent.rating,
    positiveComment: (parent) => parent.positive_comment,
    negativeComment: (parent) => parent.negative_comment,
    finId: (parent) => parent.fin_id,
    userId: (parent) => parent.userid,
  },
  Subscription: {
    finQueried: {
      subscribe: () => {
        return pubsub.asyncIterator(["FIN_QUERIED"]);
      }
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
