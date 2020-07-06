const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getFinList, getSumByYearMonth, getSumByWeek, getSumByDay} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/getFinList', (req, res) => {
  const {month, year, day, dayOfWeek, top = 10} = req.query;
  logger.info('api /getFinList');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getFinListPromise = getFinList(db, {month, year, top, ...user});
  let getSumByYearMonthPromise = getSumByYearMonth(db, {month, year, ...user});
  let getSumByWeekPromise = getSumByWeek(db, {month, year, day, dayOfWeek, ...user});
  let getSumByDayPromise = getSumByDay(db, {month, year, day, ...user});

  requestProxy(req, res, getFinListPromise, getSumByYearMonthPromise, getSumByWeekPromise, getSumByDayPromise)
    .then((data) => {
      closeDB(db);
      let [finListResponse, sumByMonthResponse, sumByWeekResponse, sumByDayResponse] = data;
      logger.info('api /getFinList success');
      res.statusCode = 200;
      res.send({
        status: true,
        data: finListResponse.rows,
        monthTotal: sumByMonthResponse.rows ? sumByMonthResponse.rows[0].total || 0 : 0,
        weekTotal: sumByWeekResponse.rows ? sumByWeekResponse.rows[0].total || 0 : 0,
        dayTotal: sumByDayResponse.rows ? sumByDayResponse.rows[0].total || 0 : 0,
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getFinList failed with error');
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
