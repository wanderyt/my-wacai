const { logDBError, logDBSuccess } = require("../util");

/**
 * Create memo record
 * @param {object} db
 * @param {object} data target memo item
 * @param {string} data.userId target memo user id
 * @param {string} data.memoId target memo id
 * @param {string} data.title target memo title
 * @param {string} data.url target memo url
 * @param {function} callback
 */
const createMemo = (db, data, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `insert into memo(userId, memoId, title, url)
      values (?, ?, ?, ?);`;
    let searchParams = [
      data.userId,
      data.memoId,
      data.title,
      data.url,
    ];
    db.all(sql, searchParams, (err) => {
      if (err) {
        logDBError(
          `createMemo - Create memo data in memo table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `createMemo - Create memo data in memo table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err);

      err ? reject({ err }) : resolve({ status: true });
    });
  });

  return promise;
};

module.exports = {
  createMemo,
};
