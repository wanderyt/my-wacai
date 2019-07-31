const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, getFinItemsBySearchOptions} = require('../../db/dao');

router.get('/deepSearchFinItems', (req, res) => {
  logger.info('api /deepSearchFinItems');
  let query = req.query;
  logger.info(`deep search fin items by search params: ${query}`);

  let db = createDBConnection();
  let getFinItemsBySearchOptionsPromise = getFinItemsBySearchOptions(db, query);

  getFinItemsBySearchOptionsPromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /deepSearchFinItems failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /deepSearchFinItems success');
      res.statusCode = 200;
      res.send({
        status: true,
        data: data.rows
      });
    }
  })
});

module.exports = {
  router
};