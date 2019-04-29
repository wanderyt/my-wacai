const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, deleteFinItem} = require('../../db/dao');

router.delete('/deleteFinItem', (req, res) => {
  logger.info('api /deleteFinItem');
  let {id} = req.query;
  logger.info(`delete fin item data: ${id}`);

  let db = createDBConnection();
  let deleteFinItemPromise = deleteFinItem(db, id);

  deleteFinItemPromise.then((data) => {
    closeDB(db);
    if (data.err) {
      logger.error('api /deleteFinItem failed with error');
      logger.error(data.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: data.err
      });
    } else {
      logger.info('api /deleteFinItem success');
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
