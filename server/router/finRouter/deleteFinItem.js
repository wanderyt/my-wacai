const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {deleteFinItem, deleteScheduledFinItem} = require('../../db/fin/delete');
const {requestProxy} = require('../../modules/request');

router.delete('/deleteFinItem', (req, res) => {
  logger.info('api /deleteFinItem');
  let {id} = req.query;
  logger.info(`delete fin item data: ${id}`);

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let deleteFinItemPromise = deleteFinItem(db, {id, ...user});

  requestProxy(req, res, deleteFinItemPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /deleteFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /deleteFinItem failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
});

router.delete('/deleteScheduledFinItem', (req, res) => {
  logger.info('api /deleteScheduledFinItem');
  let {scheduleId, year, month, day} = req.query;
  logger.info(`delete scheduled fin item data: scheduleId - ${scheduleId}, from ${year}-${month}-${day}`);

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let deleteScheduledFinItemPromise = deleteScheduledFinItem(db, {scheduleId, year, month, day, ...user});

  requestProxy(req, res, deleteScheduledFinItemPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /deleteScheduledFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /deleteScheduledFinItem failed with error');
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
