const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getAllCities} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/getAllCities', (req, res) => {
  logger.info('api /getAllCities');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getAllCitiesPromise = getAllCities(db, user);

  requestProxy(req, res, getAllCitiesPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /getAllCities success');
      res.statusCode = 200;
      res.send({
        status: true,
        data: data.rows
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getAllCities failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    })
});

module.exports = {
  router
};