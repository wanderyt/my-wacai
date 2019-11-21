const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const fs = require('fs');

const path = require('path');
const dataFileGitPath = path.join(process.cwd(), 'backupData');
const git = require('simple-git');

router.get('/cleanupBackupData', (req, res) => {
  logger.info('api /cleanupBackupData');

  let {start = '2019-10-22', end} = req.query;
  if (!end) {
    res.statusCode = 500;
    res.send({
      status: false,
      error: 'Range end is not set!'
    });
  } else {
    // Check all data files
    let dataFiles = fs.readdirSync('./backupData');
    let dateRegex = /^test-(.*).db$/;
    let startDate = new Date(start), endDate = new Date(end);
    dataFiles
      .filter((fileName) => dateRegex.test(fileName))
      .filter((fileName) => {
        let dateMark = dateRegex.exec(fileName)[1];
        let currDate = new Date(dateMark);
        if (currDate > startDate && currDate < endDate) {
          fs.unlinkSync('./backupData/' + fileName);
        }
      });

    git(dataFileGitPath)
      .add('./*')
      .commit(`clean up @${new Date()}`)
      .push(['-u', 'origin', 'master'], (err, data) => {
        if (err) {
          logger.error(`Clean up backup data files failed! @${new Date()}`);
          logger.error(err);
        } else {
          logger.info(`Clean up backup data files success! @${new Date()}`);
          logger.info(`Clean up date range: ${start} - ${end}`);
          logger.info(data);
        }

        res.statusCode = err ? 500 : 200;
        res.send({
          status: !Boolean(err)
        });
      });
  }
});

module.exports = {
  router
};
