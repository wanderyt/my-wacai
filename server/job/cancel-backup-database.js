const {jobs} = require('./backup-database');

console.log(jobs);

console.log('I will cancel the job:');
jobs['my-first-job'].cancel();

process.abort();