const scheduleBackupRouter = require('./scheduleBackup');
const pushBackupRouter = require('./pushBackup');
const cleanupBackupDataRouter = require('./cleanupBackupData');
const validDataOperationsRouter = require('./validDataOperations');
const listExistingDataFilesRouter = require('./listExistingDataFiles');

module.exports = {
  router: [
    scheduleBackupRouter.router,
    pushBackupRouter.router,
    cleanupBackupDataRouter.router,
    validDataOperationsRouter.router,
    listExistingDataFilesRouter.router,
  ]
};
