const {createDBConnection, getFinList, closeDB} = require('../db/dao');
const express = require('express');
const router = express.Router();

router.get('/getFinList', (req, res) => {
  console.log('getFinList endpoint...');
  let db = createDBConnection();
  getFinList(db, {top: 10}, (err, rows) => {
    closeDB(db);
    if (err) {
      res.statusCode = 500;
      res.send({
        status: false,
        error: err
      });
    } else {
      console.log(rows);
      res.statusCode = 200;
      res.send({
        status: true,
        data: rows
      });
    }
  });
});

module.exports = {
  router
};
