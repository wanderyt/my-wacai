const {createDBConnection, getFinList, getFinListByMonth, closeDB} = require('../db/dao');
const express = require('express');
const router = express.Router();
const {formatMonth} = require('../helper');

router.get('/getFinList', (req, res) => {
  const {month = formatMonth()} = req.query;
  console.log('getFinList endpoint...');
  let db = createDBConnection();
  let getFinListPromise = getFinList(db, {top: 10});
  let getFinListByMonthPromise = getFinListByMonth(db, {month: month});

  Promise.all([getFinListPromise, getFinListByMonthPromise])
    .then((data) => {
      let [finListResponse, finListByMonthResponse] = data;
      if (finListResponse.err || finListByMonthResponse.err) {
        res.statusCode = 500;
        res.send({
          status: false,
          error: finListResponse.err || finListByMonthResponse.err
        });
      } else {
        let total = 0;
        finListByMonthResponse.rows.forEach((item) => {
          total += item.amount;
        });
        res.statusCode = 200;
        res.send({
          status: true,
          data: finListResponse.rows,
          total
        });
      }
    });
});

module.exports = {
  router
};
