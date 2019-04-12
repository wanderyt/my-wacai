const {getWacaiData} = require('../tools/finProcessor');
const {getSessionToken} = require('../middlewares/index');
const {createDBConnection, insertFinData, closeDB} = require('../db/dao');
const chalk = require('chalk');
const fs = require('fs');
const {TOKEN_PATH} = require('../config');

const writeToken = (token) => {
  fs.writeFileSync(TOKEN_PATH, token);
};

const writeData = (data = [], {logger}) => {
  let writeDataPromise = new Promise((resolve) => {
    let failedRecords = [];
    logger.info('Starting to write data with ', data.length, ' records.');
    const db = createDBConnection();
    data.forEach((item, idx) => {
      insertFinData(db, item, (err) => {
        if (logger) {
          if (err) {
            logger.error('Insert data error');
            logger.error('Related data: ', `${item.id} | ${item.comment} | ${item.category} | ${item.subcategory} | ${item.date} | ${item.money}`);
            logger.error('Error: ', err);
            failedRecords.push(item);
          }
        }

        // Complete writing
        if (idx === data.length - 1) {
          closeDB(db);

          resolve({
            failedRecords,
          });
        }
      });
    });
  });

  return writeDataPromise;
};

const syncData = async ({
  token,
  fromDate,
  toDate,
  beforeSync = () => {},
  afterSync = () => {},
}, {
  logger
}) => {
  logger && logger.info('Start sync data: ', new Date().toDateString());
  if (!token) {
    token = await getSessionToken();
    if (!token) {
      return null;
    }
  }

  console.log('token', token);
  logger && logger.info('current token is: ', token);
  writeToken(token);

  beforeSync();

  console.log(chalk.green('Start to sync data'));
  console.log(chalk.green('From date: ', fromDate));
  console.log(chalk.green('To date: ', toDate));

  logger && logger.info('Start to sync data');
  logger && logger.info('From date: ', fromDate);
  logger && logger.info('To date: ', toDate);

  getWacaiData({
    fromDate,
    toDate,
    cookies: token,
    writeToFile: false
  }, async ({statusCode, data}) => {
    if (statusCode >= 300) {
      console.log(chalk.red('Token might expired, ask for new token'));
      logger && logger.error('Token might expired, ask for new token');
      token = await getSessionToken();
      logger && logger.info('new token is: ', token);
      writeToken(token);

      getWacaiData({
        fromDate,
        toDate,
        cookies: token,
        writeToFile: false
      }, ({statusCode, data}) => {
        if (statusCode === 200) {
          const finData = data.data;
          console.log(chalk.green('Data retrieved with ', finData.length, ' records.'));
          logger && logger.info('Data retrieved with ', finData.length, ' records.');
          let writeDataPromise = writeData(finData, {logger});
          writeDataPromise.then(writeDataCallback);

          afterSync();
        }
      });
    } else {
      const finData = data.data;
      console.log(chalk.green('Data retrieved with ', finData.length, ' records.'));
      logger && logger.info('Data retrieved with ', finData.length, ' records.');
      let writeDataPromise = writeData(finData, {logger});
      writeDataPromise.then(writeDataCallback);

      afterSync();
    }
  });

  const writeDataCallback = ({failedRecords = [], counter}) => {
    if (failedRecords.length > 0) {
      logger.error('Failed to write ', failedRecords.length, ' records.');
      failedRecords.forEach((item) => {
        logger.error('Failed record: ', `${item.id} | ${item.comment} | ${item.category} | ${item.subcategory} | ${item.date} | ${item.amount}`);
      });
    }

    logger && logger.info('Sync done.');
  };
};

// syncOneDayJob('wctk=eO2k48oOZvtVpPYLKsjDF6QIbwt4acc7_cA');

module.exports = {
  syncData
};
