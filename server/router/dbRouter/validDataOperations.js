const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

router.get('/validDataOperations', (req, res) => {
  logger.info('api /validDataOperations');
  res.statusCode = 200;
  res.send({
    status: true,
    validEndpoints: [
      'cleanupBackupData?start=2019-10-25&end=2019-10-25',
      'pushBackupData',
      'createScheduleBackup',
      'cancelScheduleBackup',
      'listDataFiles',
      'validDataOperations'
    ]
  });
});

module.exports = {
  router
};
