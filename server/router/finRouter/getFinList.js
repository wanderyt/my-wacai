const {createDBConnection, getFinList, getSumByMonth, closeDB} = require('../../db/dao');
const express = require('express');
const router = express.Router();
const {formatMonth} = require('../../helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

router.get('/getFinList', (req, res) => {
  const {month = formatMonth()} = req.query;
  console.log('getFinList endpoint...');
  logger.info('api /getFinList');
  let db = createDBConnection();
  let getFinListPromise = getFinList(db, {top: 10});
  let getSumByMonthPromise = getSumByMonth(db, {month: month});

  Promise.all([getFinListPromise, getSumByMonthPromise])
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
