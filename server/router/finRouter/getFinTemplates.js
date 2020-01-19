const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getFinTemplates} = require('../../db/fin/get');

router.get('/getFinTemplates', (req, res) => {
  logger.info('api /getFinTemplates');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getFinTemplatesPromise = getFinTemplates(db, user);
  getFinTemplatesPromise
    .then((data) => {
      closeDB(db);
      if (data.err) {
        logger.error('api /getFinTemplates failed with error');
        logger.error(data.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: data.err
        });
      } else {
        logger.info('api /getFinTemplates success');
        res.statusCode = 200;
        res.send({
          status: true,
          data: data.rows
        });
      }
    });
});

module.exports = {
  router
};
