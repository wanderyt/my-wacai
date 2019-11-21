const scheduleBackupRouter = require('./scheduleBackup');
const pushBackupRouter = require('./pushBackup');
const cleanupBackupDataRouter = require('./cleanupBackupData');

module.exports = {
  router: [
    scheduleBackupRouter.router,
    cleanupBackupDataRouter.router
  ]
};
