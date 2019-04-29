const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, createFinTemplate} = require('../db/dao');

router.post('/createFinTemplate', (req, res) => {
  logger.info('api /createFinTemplate');
  let {data} = req.body;
  logger.info('create fin template data: ');
  logger.info(JSON.stringify(data));

  let db = createDBConnection();
  let createFinTemplatePromise = createFinTemplate(db, data);

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
