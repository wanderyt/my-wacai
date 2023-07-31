const { logDBError, logDBSuccess } = require("../util");

/**
 * Get all memos
 * @param {object} db
 * @param {object} options target query data
 * @param {number} options.userId target query user id
 * @param {function} callback
 */
const getMemosByUser = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from memo where userId = ?;`;
    let searchParam = [options.userId];
    db.all(sql, searchParam, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch all memos in memo table with params: ${searchParam}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch all memos in memo table with params: ${searchParam}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

module.exports = {
  getMemosByUser,
};
