const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {updateFinItem, updateScheduledFinItem} = require('../../db/fin/update');

router.post('/updateFinItem', (req, res) => {
  logger.info('api /updateFinItem');
  let {data} = req.body;
  logger.info('update fin item data: ');
  logger.info(JSON.stringify(data));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let updateFinItemPromise = updateFinItem(db, {...data, ...user});

  updateFinItemPromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /updateFinItem failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /updateFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }
  })
});

router.post('/updateScheduledFinItem', (req, res) => {
  logger.info('api /updateScheduledFinItem');
  let {data, options} = req.body;
  logger.info('update scheduled fin item data: ');
  logger.info(JSON.stringify(data));
  logger.info('with following options: ');
  logger.info(JSON.stringify(options));

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let updateScheduledFinItemPromise = updateScheduledFinItem(db, {...data, ...user}, options);

  updateScheduledFinItemPromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /updateScheduledFinItem failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /updateScheduledFinItem success');
      res.statusCode = 200;
      res.send({
        status: true
      });
    }
  })
});

module.exports = {
  router
};
