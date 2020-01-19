const {FIN_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess} = require('../util');

/**
 * Delete specific fin item
 * @param {object} db
 * @param {object} options target fin item data
 * @param {string} options.id target fin item data id
 * @param {number} options.userId target fin item user id
 * @param {function} callback
 */
const deleteFinItem = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let {id, userId} = options;
    let sql = `delete from ${FIN_TABLE_NAME} where id = ? and userId = ?;`;
    let searchParams = [id, userId];
    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(`Delete fin data in FIN table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`Delete fin data in FIN table with params: ${searchParams}`, sql);
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
}

/**
 * Delete specific scheduled fin item(s)
 * @param {object} db
 * @param {object} options query options
 * @param {string} options.scheduleId query specific schedule id
 * @param {number} options.year query specific year
 * @param {number} options.month query specific month
 * @param {number} options.day query specific day
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const deleteScheduledFinItem = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `delete from ${FIN_TABLE_NAME} where scheduleId = ? and userId = ?`;
    let params = [options.scheduleId, options.userId];
    if (options.year && options.month && options.day && Number(options.year) && options.month < 13 && options.day < 35) {
      sql += ' and date >= date(?, "+1 day")';
      params.push(`${options.year}-${padZero(options.month)}-${padZero(options.day)}`);
    }
    db.run(sql, params, (err) => {
      if (err) {
        logDBError(`Delete fin data in FIN table with params: ${params}`, sql, err);
      } else {
        logDBSuccess(`Delete fin data in FIN table with params: ${params}`, sql);
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
}

module.exports = {
  deleteFinItem,
  deleteScheduledFinItem,
};
