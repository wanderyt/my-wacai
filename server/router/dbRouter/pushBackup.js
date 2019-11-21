const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const path = require('path');
const dataFileGitPath = path.join(process.cwd(), 'backupData');
const git = require('simple-git');

router.get('/pushBackupData', (req, res) => {
  logger.info('api /pushBackupData');
  git(dataFileGitPath)
    .add('./*')
    .commit(`update @${new Date()}`)
    .push(['-u', 'origin', 'master'], (err, data) => {
      if (err) {
        logger.error(`Push backup data files failed! @${new Date()}`);
        logger.error(err);
      } else {
        logger.info(`Push backup data files success! @${new Date()}`);
        logger.info(data);
      }

      res.statusCode = err ? 500 : 200;
      res.send({
        status: !Boolean(err)
      });
    });
});

module.exports = {
  router
};
