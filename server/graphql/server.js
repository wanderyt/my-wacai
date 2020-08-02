const {ApolloServer, AuthenticationError} = require('apollo-server-express');
const {parse, print, getIntrospectionQuery} = require('graphql');
const {validateToken} = require('../middlewares/validateToken');
const gqlSchemas = require('./schemas');

/**
 * Check whether current request is introspection query
 * @param {object} req
 */
const isIntrospectionQuery = (query) => {
  const introspectionQuery = print(parse(getIntrospectionQuery()));
  return introspectionQuery === query;
};

/**
 * Check whether current request is from graphql tool
 * @param {object} req
 */
const isQueryFromGraphqlTool = (query) => {
  return query.indexOf('debugMessage') > -1;
};

const addGraphQLMiddleware = (app, logger) => {
  // Customized plugins
  const myPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
      const {logger, request} = requestContext;
      if (!isIntrospectionQuery(request.query)) {
        const message = 'Request started! Query: ' + request.query;
        logger.info({message});
      }
    },
    willSendResponse(requestContext) {
      const {logger, response} = requestContext;
      if (response && response.errors) {
        logger.error({error: response.errors});
      }
    }
  };

  const server = new ApolloServer({
    schema: gqlSchemas,
    logger,
    context: async ({req}) => {
      if (isIntrospectionQuery(req.body.query) || isQueryFromGraphqlTool(req.body.query)) {
        return {
          logger,
          user: {
            userId: 1,
            userName: 'wanderyt'
          }
        };
      } else {
        const validatedUser = await validateToken(req, logger);
        if (validatedUser) {
          return {
            logger,
            user: validatedUser
          };
        } else {
          throw new AuthenticationError('Token validated failed gql!');
        }
      }
    },
    plugins: [
      myPlugin
    ]
  });
  const path = process.env.GRAPHQL_PATH || '/api/graphql';

  server.applyMiddleware({app, path});
};

module.exports = {
  addGraphQLMiddleware
};
