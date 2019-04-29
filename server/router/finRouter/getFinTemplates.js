const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, getFinTemplates} = require('../../db/dao');

router.get('/getFinTemplates', (req, res) => {
  logger.info('api /getFinTemplates');
  let db = createDBConnection();
  let getFinTemplatesPromise = getFinTemplates(db);
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
