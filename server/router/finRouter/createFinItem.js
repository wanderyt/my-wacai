const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {createFinItem, createScheduledFinItem} = require('../../db/fin/create');
const {requestProxy} = require('../../modules/request');

router.post('/createFinItem', (req, res) => {
  logger.info('api /createFinItem');
  let {data} = req.body;
  logger.info('create fin item data: ');
  logger.info(JSON.stringify(data));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let createFinItemPromise = createFinItem(db, {...data, ...user});

  requestProxy(req, res, createFinItemPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /createFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /createFinItem failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
});

router.post('/createScheduledFinItem', (req, res) => {
  logger.info('api /createScheduledFinItem');
  let {data} = req.body;
  logger.info('create scheduled fin item data: ');
  logger.info(JSON.stringify(data));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let createScheduledFinItemPromise = createScheduledFinItem(db, {...data, ...user});

  requestProxy(req, res, createScheduledFinItemPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /createScheduledFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /createScheduledFinItem failed with error');
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
