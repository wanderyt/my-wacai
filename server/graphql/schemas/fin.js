const {makeExecutableSchema, PubSub} = require('apollo-server');
const {getFinTopList, getFinById, getRatingByFinId} = require('../../db/fin/gql-get');
const {createFinItem, createScheduledFinItem, createRatingByFinId} = require('../../db/fin/gql-create');
const {updateFinItemById, updateScheduledFinItemByScheduleId, updateRatingByFinId} = require('../../db/fin/gql-update');
const {deleteFinItemById, deleteRatingByFinId} = require('../../db/fin/gql-delete');
const pubsub = new PubSub();

const mockUsers = [{
  id: 1,
  name: 'Scott',
  password: 'Tiger',
}];

const typeDefs = `
  input FinInput {
    id: ID
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
    id: ID
    rating: Int
    positiveComment: String
    negativeComment: String
    finId: ID
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
  }

  type Mutation {
    createFullFinItem(finInput: FinInput, ratingInput: RatingInput): Fin!
    createScheduledFullFinItem(finInput: FinInput, ratingInput: RatingInput): [ID]
    updateFullFinItem(finInput: FinInput, ratingInput: RatingInput): Fin!
    updateScheduledFullFinItem(finInput: FinInput): Boolean
    deleteFullFinItemById(finId: ID): Fin!
    deleteFullFinItemByScheduleId(scheduleId: ID): [ID]
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
        const {ids: finIds} = await createScheduledFinItem({...finInput, userId});
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
    deleteFullFinItemByScheduleId: async (parent, {scheduleId}, context) => {
      const {user: currentUser, logger} = context;
      const {userId} = currentUser || {};
      try {
        await deleteRatingByScheduleId({scheduleId, userId});
        const {id} = await deleteFinItemById({id: finId, userId});
        const result = {finId: id};
        pubsub.publish('DELETE_FULL_FIN_ITEM_MUTATION', result);
        return {id};
      } catch (e) {
        logger.error({error: e});
        return {id: ''};
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
