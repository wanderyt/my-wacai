const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {createMemo} = require('../../db/slack/create');
const {requestProxy} = require('../../modules/request');

router.post('/createMemo', (req, res) => {
  logger.info('api /createMemo');
  let {data} = req.body;
  logger.info('create memo data: ');
  logger.info(JSON.stringify(data));

  let db = createDBConnection();
  let createMemoPromise = createMemo(db, {...data});

  requestProxy(req, res, createMemoPromise)
    .then(() => {
      closeDB(db);
      logger.info('api /createMemo success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /createMemo failed with error');
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
