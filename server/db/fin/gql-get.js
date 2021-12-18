const { createDBConnection, closeDB } = require('../dbops');
const { FIN_TABLE_NAME } = require('../config');
const { logDBError, logDBSuccess } = require('../util');
const { padZero } = require('../../helper');

/**
 * Get fin list data
 * @param {object} options query options
 * @param {number} options.top query numbers
 * @param {number} options.month query ends with specific month, need to be formatted like MM
 * @param {number} options.year query ends with specific month, need to be formatted like YYYY
 * @param {number} options.userId query user id
 */
const getFinTopList = options => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ?`;
    if (options) {
      if (options.month && options.year) {
        sql += ` and date <= '${options.year}-${padZero(
          parseInt(options.month) + 1
        )}-%'`;
      }
      sql += ' order by date desc';
      if (options.top) {
        sql += ' limit ' + options.top;
      }
    }

    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getFinTopList - Fetch data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getFinTopList - Fetch data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      closeDB(db);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get fin item data
 * @param {object} data query data
 * @param {string} data.id query fin id
 * @param {number} data.userId query user id
 */
const getFinById = data => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ? and id = ?`;
    let searchParams = [data.userId, data.id];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getFinById - Fetch data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getFinById - Fetch data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      closeDB(db);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get fin items by schedule id and user id
 * @param {object} data
 * @param {string} data.scheduleId query schedule id
 * @param {number} data.userId query user id
 */
const getFinByScheduleId = data => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ? and scheduleId = ?`;
    let searchParams = [data.userId, data.scheduleId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getFinByScheduleId - Fetch data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getFinByScheduleId - Fetch data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      closeDB(db);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get fin items by schedule id and user id
 * @param {object} data
 * @param {string} data.scheduleId query schedule id
 * @param {number} data.userId query user id
 * @param {number} data.year query starting year
 * @param {number} data.month query starting month
 * @param {number} data.day query starting day
 */
const getFinByScheduleIdAndBaseDatetime = data => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ? and scheduleId = ?`;
    let searchParams = [data.userId, data.scheduleId];
    if (
      data.year &&
      data.month &&
      data.day &&
      Number(data.year) &&
      data.month < 13 &&
      data.day < 35
    ) {
      sql += ' and date >= date(?, "+1 day")';
      searchParams.push(
        `${data.year}-${padZero(data.month)}-${padZero(data.day)}`
      );
    }
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getFinByScheduleIdAndBaseDatetime - Fetch data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getFinByScheduleIdAndBaseDatetime - Fetch data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      closeDB(db);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get rating by fin id and user id
 * @param {object} data query data
 * @param {string} data.finId query fin id
 * @param {number} data.userId query user id
 */
const getRatingByFinId = data => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from RATING where fin_id = ? and userId = ?`;
    let searchParams = [data.finId, data.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getRatingByFinId - Fetch rating data in RATING table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getRatingByFinId - Fetch rating data in RATING table with params: ${searchParams}`,
          sql
        );
      }

      closeDB(db);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get sum expense of whole month in specific year month
 * @param {Object} data query data
 * @param {string} data.month query month details, will be formatted as 'MM' inside function
 * @param {string} data.year query year details, need to be formatted as 'YYYY'
 * @param {number} data.userId query user id
 */
const getSumByYearMonth = (options) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date like '${
      options.year
    }-${padZero(options.month)}-%' and userId = ?);`;
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getFinListByMonth - Fetch data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getFinListByMonth - Fetch data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get sum expense of whole current week in specific year month day, this will exclude those scheduled items.
 * @param {Object} data query data
 * @param {string} data.month query month details, will be formatted as 'MM' inside function
 * @param {string} data.year query year details, need to be formatted as 'YYYY'
 * @param {string} data.day query day details, will be formatted as 'DD' inside function
 * @param {string} data.dayOfWeek query day of week details, Sunday as 0, Monday as 1, etc.
 * @param {number} data.userId query user id
 */
const getSumByWeek = options => {
  const db = createDBConnection();
  const { month, year, day, dayOfWeek, userId } = options;

  let promise = new Promise((resolve, reject) => {
    let startDay = 0,
      endDay = 0;
    // Start day logic and End day logic
    if (dayOfWeek === 0) {
      startDay = 7;
      endDay = 0;
    } else {
      startDay = dayOfWeek - 1;
      endDay = 7 - dayOfWeek;
    }

    const currentDay = `${year}-${padZero(month)}-${padZero(day)}`;
    // let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date >= date(?, "${startDay >= 0 ? '-' + startDay : startDay} days") and date <= date(?, "+${endDay} days") and (isScheduled = 0 or isScheduled is null) and userId = ?);`;
    let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date >= date('${currentDay}', "-${startDay} days") and date <= date('${currentDay}', "+${endDay} days") and (isScheduled = 0 or isScheduled is null) and userId = '${userId}');`;
    let searchParams = [currentDay, currentDay, userId];
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(
          'getSumByWeek - Fetch data in FIN table',
          sql + ' with params: ' + searchParams.join(', '),
          err
        );
      } else {
        logDBSuccess(
          'getSumByWeek - Fetch data in FIN table',
          sql + ' with params: ' + searchParams.join(', ')
        );
      }

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get sum expense of current day in specific year month day, this will exclude those scheduled items.
 * @param {Object} options options for sql
 * @param {string} options.month query month details, will be formatted as 'MM' inside function
 * @param {string} options.year query year details, need to be formatted as 'YYYY'
 * @param {string} options.day query day details, will be formatted as 'DD' inside function
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getSumByDay = options => {
  const db = createDBConnection();
  const { month, year, day, userId } = options;
  let promise = new Promise((resolve, reject) => {
    const currentDay = `${year}-${padZero(month)}-${padZero(day)}`;
    // let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date >= date('?') and date < date('?', "+1 day") and (isScheduled = 0 or isScheduled is null) and userId = ?);`;
    let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date >= date('${currentDay}') and date < date('${currentDay}', "+1 day") and (isScheduled = 0 or isScheduled is null) and userId = '${userId}');`;
    let searchParams = [currentDay, currentDay, userId];
    // db.all(sql, searchParams, (err, rows) => {
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(
          'getSumByDay - Fetch data in FIN table',
          sql + ' with params: ' + searchParams.join(', '),
          err
        );
      } else {
        logDBSuccess(
          'getSumByDay - Fetch data in FIN table',
          sql + ' with params: ' + searchParams.join(', ')
        );
      }

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

module.exports = {
  getFinTopList,
  getFinById,
  getRatingByFinId,
  getFinByScheduleId,
  getFinByScheduleIdAndBaseDatetime,
  getSumByYearMonth,
  getSumByWeek,
  getSumByDay,
};
