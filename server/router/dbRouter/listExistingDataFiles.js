const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const fs = require('fs');

router.get('/listDataFiles', (req, res) => {
  logger.info('api /listDataFiles');
  try {
    let dataFiles = fs.readdirSync('./backupData');
    let dateRegex = /^test-(.*).db$/;
    let validDataFiles = dataFiles.filter((fileName) => dateRegex.test(fileName));

    logger.info(`List all data files success!`);

    res.statusCode = 200;
    res.send({
      status: true,
      files: validDataFiles
    });
  } catch (e) {
    logger.error(`List all data files failed.`);
    logger.error(e);

    res.statusCode = 500;
    res.send({
      status: true,
      error: e
    });
  }
});

module.exports = {
  router
};
