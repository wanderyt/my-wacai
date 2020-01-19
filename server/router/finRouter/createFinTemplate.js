const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {createFinTemplate} = require('../../db/fin/create');

router.post('/createFinTemplate', (req, res) => {
  logger.info('api /createFinTemplate');
  let {data} = req.body;
  logger.info('create fin template data: ');
  logger.info(JSON.stringify(data));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let createFinTemplatePromise = createFinTemplate(db, {...data, ...user});

  createFinTemplatePromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /createFinTemplate failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /createFinTemplate success');
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
