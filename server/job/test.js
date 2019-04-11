const schedule = require('node-schedule');

const {createDBConnection, closeDB} = require('../db/dao');

// let j = schedule.scheduleJob('testjob', '*/10 * * * * *', function(){
//   let db = createDBConnection();
//   let name = 'david' + new Date().getMilliseconds();
//   db.run(`insert into TESTNAME values ('${name}');`);
//   console.log('INSERT data ', name);
//   closeDB(db);
// });

let j = schedule.scheduledJobs['testjob'];
j.cancel();