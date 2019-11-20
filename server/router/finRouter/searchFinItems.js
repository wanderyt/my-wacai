const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, getFinItemsBySearchString} = require('../../db/dao');

router.get('/searchFinItems', (req, res) => {
  logger.info('api /searchFinItems');
  let {searchString, year, month} = req.query;
  logger.info(`search fin items by search string: ${searchString}`);

  let db = createDBConnection();
  let getFinItemsBySearchStringPromise = getFinItemsBySearchString(db, searchString, {year, month});

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
