const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getAllComments} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/getAllComment', (req, res) => {
  logger.info('api /getAllComment');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getAllCommentPromise = getAllComments(db, user);

  requestProxy(req, res, getAllCommentPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /getAllComment success');
      res.statusCode = 200;
      res.send({
        status: true,
        data: data.rows
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getAllComment failed with error');
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