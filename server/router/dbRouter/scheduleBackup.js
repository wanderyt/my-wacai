const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
let jobs = {};

const backupDataFolder = 'backupData';

router.get('/createScheduleBackup', (req, res) => {
  logger.info('api /createScheduleBackup');
  const schedule = require('node-schedule');
  const fs = require('fs');
  const {padZero} = require('../../helper');
  const dbFileName = process.env.DB_TEST ? 'test' : 'wacai';

  let rule = new schedule.RecurrenceRule();
  rule.hour = 1;
  rule.minute = 30;

  try {
    const dailyJob = schedule.scheduleJob('my-daily-job', rule, function () {
      const now = new Date();
      const newFileNameSuffix = `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())}T${padZero(now.getHours())}-${padZero(now.getMinutes())}-${padZero(now.getSeconds())}`;
      fs.copyFileSync(`./${dbFileName}.db`, `./${backupDataFolder}/${dbFileName}-${newFileNameSuffix}.db`);
    });

    logger.info('Created backup database job!');

    jobs = schedule.scheduledJobs;
  } catch (e) {
    logger.error('Backup database job creating failed!');
    logger.error(e);
  }

  res.statusCode = 200;
  res.send({
    status: true
  });
});

router.get('/cancelScheduleBackup', (req, res) => {
  logger.info('api /cancelScheduleBackup');
  try {
    let job = jobs['my-daily-job'];
    job.cancel();

    logger.info('my-daily-job job has been canceled!');
  } catch (e) {
    logger.error('Backup database job canceling failed!');
    logger.error(e);
  }

  res.statusCode = 200;
  res.send({
    status: true
  });
});

module.exports = {
  router
};
