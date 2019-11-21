const scheduleBackupRouter = require('./scheduleBackup');
const pushBackupRouter = require('./pushBackup');

module.exports = {
  router: [
    scheduleBackupRouter.router,
    pushBackupRouter.router
  ]
};
