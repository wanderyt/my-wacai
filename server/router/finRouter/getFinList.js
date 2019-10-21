const {createDBConnection, getFinList, getSumByYearMonth, closeDB} = require('../../db/dao');
const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

router.get('/getFinList', (req, res) => {
  const {month, year} = req.query;
  logger.info('api /getFinList');
  let db = createDBConnection();
  let getFinListPromise = getFinList(db, {month: month, year: year, top: 10});
  let getSumByYearMonthPromise = getSumByYearMonth(db, {month: month, year: year});

  Promise.all([getFinListPromise, getSumByYearMonthPromise])
    .then((data) => {
      closeDB(db);
      let [finListResponse, sumByMonthResponse] = data;
      if (finListResponse.err || sumByMonthResponse.err) {
        logger.error('api /getFinList failed with error');
        logger.error(finListResponse.err);
        logger.error(sumByMonthResponse.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: finListResponse.err || sumByMonthResponse.err
        });
      } else {
        logger.info('api /getFinList success');
        res.statusCode = 200;
        res.send({
          status: true,
          data: finListResponse.rows,
          total: sumByMonthResponse.rows[0].total
        });
      }
    });
});

module.exports = {
  router
};
