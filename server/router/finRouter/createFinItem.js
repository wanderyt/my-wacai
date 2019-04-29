const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, createFinItem} = require('../../db/dao');

router.post('/createFinItem', (req, res) => {
  logger.info('api /createFinItem');
  let {data} = req.body;
  logger.info('create fin item data: ');
  logger.info(JSON.stringify(data));

  let db = createDBConnection();
  let createFinItemPromise = createFinItem(db, data);

  createFinItemPromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /createFinItem failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /createFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }
  })
});

module.exports = {
  router
};
