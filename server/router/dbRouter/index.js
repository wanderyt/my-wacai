const scheduleBackupRouter = require('./scheduleBackup');

module.exports = {
  router: [
    scheduleBackupRouter.router
  ]
};
