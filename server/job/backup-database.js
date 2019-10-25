const schedule = require('node-schedule');
const fs = require('fs');
const {padZero} = require('../helper');
const dbFileName = process.env.DB_TEST ? 'test' : 'wacai';

/**
 * ```
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    │
 * │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 * │    │    │    │    └───── month (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, OPTIONAL)
 * ```
 */

let rule = new schedule.RecurrenceRule();
rule.second = 20;

let jobs = {};

try {
  const seconds20Job = schedule.scheduleJob('my-first-job', rule, function () {
    const now = new Date();
    const newFileNameSuffix = `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())}T${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
    fs.copyFileSync(`./${dbFileName}.db`, `./${dbFileName}-${newFileNameSuffix}.db`);
  });

  console.log(`Created backup database job!`);

  jobs = schedule.scheduledJobs;
} catch (e) {
  console.log(e);
}

module.exports = {
  jobs
};
