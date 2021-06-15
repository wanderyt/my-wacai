const sqlite3 = require('sqlite3').verbose();
const {TEST_DB_FILE_PATH, DB_FILE_PATH} = require('./config');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const createDBConnection = () => {
  let dbFilePath = process.env.DB_TEST ? TEST_DB_FILE_PATH : DB_FILE_PATH;
  let db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      logger.error(`Failed to connect to the chinook database: ${dbFilePath}`);
      logger.error(err.message);
    }
    logger.info(`Connected to the chinook database: ${dbFilePath}`);
  });

  return db;
};

const closeDB = (db) => {
  db.close();
};

module.exports = {
  createDBConnection,
  closeDB,
};
