const {USER_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess} = require('../util');

/**
 * Get user data
 * @param {Object} db DB connection object
 * @param {object} options query options
 * @param {string} options.username query username
 * @param {string} options.password query password
 * @param {function} callback
 */
const getUserInfo = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `SELECT USERID, USERNAME, PASSWORD FROM ${USER_TABLE_NAME} WHERE USERNAME=? AND PASSWORD=?;`;
    let searchParams = [options.username, options.password];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError('Select all user data in USER table', sql, err);
      } else {
        logDBSuccess('Select all user data in USER table', sql);
      }

      callback && callback({err, rows});

      resolve({err, rows});
    });
  });

  return promise;
};

module.exports = {
  getUserInfo,
};
