const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getFinItemsBySearchOptions} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/deepSearchFinItems', (req, res) => {
  logger.info('api /deepSearchFinItems');
  let query = req.query;
  logger.info(`deep search fin items by search params: ${query}`);

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getFinItemsBySearchOptionsPromise = getFinItemsBySearchOptions(db, {...query, ...user});

  requestProxy(req, res, getFinItemsBySearchOptionsPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /deepSearchFinItems success');
      res.statusCode = 200;
      res.send({
        status: true,
        data: data.rows
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /deepSearchFinItems failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
});

module.exports = {
  router
};
