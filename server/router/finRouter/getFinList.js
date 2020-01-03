const {createDBConnection, getFinList, getSumByYearMonth, getSumByWeek, getSumByDay, closeDB} = require('../../db/dao');
const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

router.get('/getFinList', (req, res) => {
  const {month, year, day, dayOfWeek, top = 10} = req.query;
  logger.info('api /getFinList');
  let db = createDBConnection();
  let getFinListPromise = getFinList(db, {month, year, top});
  let getSumByYearMonthPromise = getSumByYearMonth(db, {month, year});
  let getSumByWeekPromise = getSumByWeek(db, {month, year, day, dayOfWeek});
  let getSumByDayPromise = getSumByDay(db, {month, year, day});

  Promise.all([getFinListPromise, getSumByYearMonthPromise, getSumByWeekPromise, getSumByDayPromise])
    .then((data) => {
      closeDB(db);
      let [finListResponse, sumByMonthResponse, sumByWeekResponse, sumByDayResponse] = data;
      if (finListResponse.err || sumByMonthResponse.err || sumByWeekResponse.err || sumByDayResponse.err) {
        logger.error('api /getFinList failed with error');
        logger.error(finListResponse.err);
        logger.error(sumByMonthResponse.err);
        logger.error(sumByWeekResponse.err);
        logger.error(sumByDayResponse.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: finListResponse.err || sumByMonthResponse.err || sumByWeekResponse.err || sumByDayResponse.err
        });
      } else {
        logger.info('api /getFinList success');
        res.statusCode = 200;
        res.send({
          status: true,
          data: finListResponse.rows,
          monthTotal: sumByMonthResponse.rows ? sumByMonthResponse.rows[0].total || 0 : 0,
          weekTotal: sumByWeekResponse.rows ? sumByWeekResponse.rows[0].total || 0 : 0,
          dayTotal: sumByDayResponse.rows ? sumByDayResponse.rows[0].total || 0 : 0,
        });
      }
    });
});

module.exports = {
  router
};
