const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getMemosByUser} = require('../../db/slack/get');
const {requestProxy} = require('../../modules/request');

router.get('/getMemos', (req, res) => {
  logger.info('api /getMemos');
  const {userId} = req.query;
  let db = createDBConnection();
  let getMemosByUserPromise = getMemosByUser(db, {userId});

  requestProxy(req, res, getMemosByUserPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /getMemos success');
      res.statusCode = 200;
      res.send({
        status: true,
        data
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getMemos failed with error');
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
