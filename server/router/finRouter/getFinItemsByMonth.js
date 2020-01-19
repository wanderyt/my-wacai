const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getDailyTotal, getFinItemsByMonth} = require('../../db/fin/get');

router.get('/getFinItemsByMonth', (req, res) => {
  logger.info('api /getFinItemsByMonth');
  const {month, year} = req.query;

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getDailyTotalPromise = getDailyTotal(db, {month, year, ...user});
  let getFinItemsByMonthPromise = getFinItemsByMonth(db, {month, year, ...user});

  Promise.all([getDailyTotalPromise, getFinItemsByMonthPromise])
    .then((data) => {
      closeDB(db);
      let [dailyTotalData, finItemsByMonthData] = data;
      if (dailyTotalData.err || finItemsByMonthData.err) {
        logger.error('api /getFinItemsByMonth failed with error');
        logger.error(dailyTotalData.err);
        logger.error(finItemsByMonthData.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: dailyTotalData.err || finItemsByMonthData.err
        });
      } else {
        logger.info('api /getFinItemsByMonth success');
        res.statusCode = 200;
        res.send({
          status: true,
          data: formatFinItems(dailyTotalData.rows, finItemsByMonthData.rows)
        });
      }
    });
});

const formatFinItems = (dailyTotal = [], finItems = []) => {
  let dailyData = dailyTotal.map((totalItem) => {
    let dailyItems = [];
    finItems.forEach((finItem, index) => {
      if (finItem.date.indexOf(totalItem.year_month_date) > -1) {
        dailyItems.push(finItem);
        delete finItems[index];
      }
    });
    return {
      date: totalItem.year_month_date,
      amount: totalItem.total,
      items: dailyItems
    };
  });
  return dailyData || [];
}

module.exports = {
  router
};
