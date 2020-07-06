const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getMonthlyTotal} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/getHistoryExpense', (req, res) => {
  const {month, year} = req.query;
  logger.info('api /getHistoryExpense');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getMonthlyTotalPromise = getMonthlyTotal(db, {month, year, ...user});

  requestProxy(req, res, getMonthlyTotalPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /getHistoryExpense success');
      res.statusCode = 200;
      res.send({
        status: true,
        data: formatHistoryExpense(data.rows)
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getHistoryExpense failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
});

const formatHistoryExpense = (data = []) => {
  let highestMonthAmount = 0;
  let historyExpense = data.map((item) => {
    if (highestMonthAmount < item.total) {
      highestMonthAmount = item.total;
    }

    return {
      year: item.year_month.substr(0, 4),
      month: item.year_month.substr(5, 2),
      amount: item.total
    };
  });

  return {
    highestMonthAmount,
    items: historyExpense
  };
}

module.exports = {
  router
};
