const {createDBConnection, closeDB} = require('../dbops');
const {FIN_TABLE_NAME, CATEGORY_TABLE_NAME, TEMPLATE_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess, mapSearchParamsToDBSearch, uuid} = require('../util');
const {padZero} = require('../../helper');

/**
 * Get fin list data
 * @param {object} options query options
 * @param {number} options.top query numbers
 * @param {number} options.month query ends with specific month, need to be formatted like MM
 * @param {number} options.year query ends with specific month, need to be formatted like YYYY
 * @param {number} options.userId query user id
 */
const getFinTopList = (options) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ?`;
    if (options) {
      if (options.month && options.year) {
        sql += ` and date <= '${options.year}-${padZero(parseInt(options.month) + 1)}-%'`;
      }
      sql += ' order by date desc';
      if (options.top) {
        sql += ' limit ' + options.top;
      }
    }

    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`getFinTopList - Fetch data in FIN table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`getFinTopList - Fetch data in FIN table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({rows});
    });
  })

  return promise;
};

/**
 * Get fin item data
 * @param {object} data query data
 * @param {string} data.id query fin id
 * @param {number} data.userId query user id
 */
const getFinById = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ? and id = ?`;
    let searchParams = [data.userId, data.id];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`getFinById - Fetch data in FIN table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`getFinById - Fetch data in FIN table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({rows});
    });
  })

  return promise;
};

/**
 * Get fin items by schedule id and user id
 * @param {object} data
 * @param {string} data.scheduleId query schedule id
 * @param {number} data.userId query user id
 */
const getFinByScheduleId = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ? and scheduleId = ?`;
    let searchParams = [data.userId, data.scheduleId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`getFinByScheduleId - Fetch data in FIN table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`getFinByScheduleId - Fetch data in FIN table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({rows});
    });
  })

  return promise;
}

/**
 * Get fin items by schedule id and user id
 * @param {object} data
 * @param {string} data.scheduleId query schedule id
 * @param {number} data.userId query user id
 * @param {number} data.year query starting year
 * @param {number} data.month query starting month
 * @param {number} data.day query starting day
 */
const getFinByScheduleIdAndBaseDatetime = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ? and scheduleId = ?`;
    let searchParams = [data.userId, data.scheduleId];
    if (data.year && data.month && data.day && Number(data.year) && data.month < 13 && data.day < 35) {
      sql += ' and date >= date(?, "+1 day")';
      searchParams.push(`${data.year}-${padZero(data.month)}-${padZero(data.day)}`);
    }
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`getFinByScheduleIdAndBaseDatetime - Fetch data in FIN table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`getFinByScheduleIdAndBaseDatetime - Fetch data in FIN table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({rows});
    });
  })

  return promise;
}

/**
 * Get rating by fin id and user id
 * @param {object} data query data
 * @param {string} data.finId query fin id
 * @param {number} data.userId query user id
 */
const getRatingByFinId = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from RATING where fin_id = ? and userId = ?`;
    let searchParams = [data.finId, data.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`getRatingByFinId - Fetch rating data in RATING table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`getRatingByFinId - Fetch rating data in RATING table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({rows});
    });
  });

  return promise;
}

module.exports = {
  getFinTopList,
  getFinById,
  getRatingByFinId,
  getFinByScheduleId,
  getFinByScheduleIdAndBaseDatetime,
};
