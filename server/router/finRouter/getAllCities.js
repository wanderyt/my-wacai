const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, getAllCities} = require('../../db/dao');

router.get('/getAllCities', (req, res) => {
  logger.info('api /getAllCities');
  let db = createDBConnection();
  let getAllCitiesPromise = getAllCities(db);
  getAllCitiesPromise
    .then((data) => {
      closeDB(db);
      if (data.err) {
        logger.error('api /getAllCities failed with error');
        logger.error(data.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: data.err
        });
      } else {
        logger.info('api /getAllCities success');
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