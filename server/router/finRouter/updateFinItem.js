const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {updateFinItem, updateScheduledFinItem} = require('../../db/fin/update');
const {requestProxy} = require('../../modules/request');

router.post('/updateFinItem', (req, res) => {
  logger.info('api /updateFinItem');
  let {data} = req.body;
  logger.info('update fin item data: ');
  logger.info(JSON.stringify(data));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let updateFinItemPromise = updateFinItem(db, {...data, ...user});

  requestProxy(req, res, updateFinItemPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /updateFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /updateFinItem failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
});

router.post('/updateScheduledFinItem', (req, res) => {
  logger.info('api /updateScheduledFinItem');
  let {data, options} = req.body;
  logger.info('update scheduled fin item data: ');
  logger.info(JSON.stringify(data));
  logger.info('with following options: ');
  logger.info(JSON.stringify(options));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let updateScheduledFinItemPromise = updateScheduledFinItem(db, {...data, ...user}, options);

  requestProxy(req, res, updateScheduledFinItemPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /updateScheduledFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /updateScheduledFinItem failed with error');
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
