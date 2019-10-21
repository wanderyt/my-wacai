const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, getMonthlyTotal} = require('../../db/dao');

router.get('/getHistoryExpense', (req, res) => {
  const {month, year} = req.query;
  logger.info('api /getHistoryExpense');
  let db = createDBConnection();
  let getMonthlyTotalPromise = getMonthlyTotal(db, {month, year});
  getMonthlyTotalPromise
    .then((data) => {
      closeDB(db);
      if (data.err) {
        logger.error('api /getHistoryExpense failed with error');
        logger.error(data.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: data.err
        });
      } else {
        logger.info('api /getHistoryExpense success');
        res.statusCode = 200;
        res.send({
          status: true,
          data: formatHistoryExpense(data.rows)
        });
      }
    })
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
