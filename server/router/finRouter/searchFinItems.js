const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getFinItemsBySearchString} = require('../../db/fin/get');

router.get('/searchFinItems', (req, res) => {
  logger.info('api /searchFinItems');
  let {searchString, year, month} = req.query;
  logger.info(`search fin items by search string: ${searchString}`);

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getFinItemsBySearchStringPromise = getFinItemsBySearchString(db, searchString, {year, month, ...user});

  getFinItemsBySearchStringPromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /searchFinItems failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /searchFinItems success');
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
