const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {createFinTemplate} = require('../../db/fin/create');
const {requestProxy} = require('../../modules/request');

router.post('/createFinTemplate', (req, res) => {
  logger.info('api /createFinTemplate');
  let {data} = req.body;
  logger.info('create fin template data: ');
  logger.info(JSON.stringify(data));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let createFinTemplatePromise = createFinTemplate(db, {...data, ...user});

  requestProxy(req, res, createFinTemplatePromise)
    .then(() => {
      closeDB(db);
      logger.info('api /createFinTemplate success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /createFinTemplate failed with error');
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
