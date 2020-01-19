const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getAllComments} = require('../../db/fin/get');

router.get('/getAllComment', (req, res) => {
  logger.info('api /getAllComment');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getAllCommentPromise = getAllComments(db, user);
  getAllCommentPromise
    .then((data) => {
      closeDB(db);
      if (data.err) {
        logger.error('api /getAllComment failed with error');
        logger.error(data.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: data.err
        });
      } else {
        logger.info('api /getAllComment success');
        res.statusCode = 200;
        res.send({
          status: true,
          data: data.rows
        });
      }
    })
});

module.exports = {
  router
};