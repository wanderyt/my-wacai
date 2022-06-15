const { FIN_TABLE_NAME } = require("../config");
const { logDBError, logDBSuccess } = require("../util");
const { padZero } = require("../../helper");

const UPDATE_COLUMN_NAME_LIST = [
  "category",
  "subcategory",
  "comment",
  "details",
  "amount",
  "place",
  // 'date', date should be handled separately
  "city",
  "tags",
];

const ALLOW_EMPTY_VALUE_FIELD = ["tags"];

/**
 * Update existing fin item
 * @param {object} db
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {string} data.details target fin item details
 * @param {number} data.amount target fin item amount
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {number} data.userId target user id
 * @param {string} data.tags target fin item tags
 * @param {function} callback
 */
const updateFinItem = (db, data, callback) => {
  let promise = new Promise((resolve, reject) => {
    let updateOptions = "";
    for (const key in data) {
      const value = data[key];
      // Remove null object value, but need to allow empty string
      if (UPDATE_COLUMN_NAME_LIST.indexOf(key.toLowerCase()) > -1 && value) {
        updateOptions += `${key}="${value}", `;
      }
      // Allow empty string
      if (
        value === "" &&
        ALLOW_EMPTY_VALUE_FIELD.indexOf(key.toLowerCase()) > -1
      ) {
        updateOptions += `${key}="${value}", `;
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where id = ? and userId = ?;`;
    let searchParams = [data.id, data.userId];
    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(
          `updateFinItem - Update fin data in ${FIN_TABLE_NAME} table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `updateFinItem - Update fin data in ${FIN_TABLE_NAME} table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err);

      err ? reject({ err }) : resolve({ status: true });
    });
  });

  return promise;
};

/**
 * Update existing scheduled fin items
 * @param {object} db
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {string} data.details target fin item details
 * @param {string} data.scheduleId target fin item schedule id
 * @param {number} data.amount target fin item amount
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {number} options.year query specific year
 * @param {number} options.month query specific month
 * @param {number} options.day query specific day
 * @param {number} options.userId query user id
 * @param {string} data.tags target fin item tags
 * @param {function} callback
 */
const updateScheduledFinItem = (db, data, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let updateOptions = "";
    for (const key in data) {
      if (UPDATE_COLUMN_NAME_LIST.indexOf(key.toLowerCase()) > -1) {
        const value = data[key];
        if (value) {
          updateOptions += `${key}="${value}", `;
        }
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where scheduleId = ? and userId = ?`;
    let searchParams = [data.scheduleId, data.userId];
    if (
      options.year &&
      options.month &&
      options.day &&
      Number(options.year) &&
      options.month < 13 &&
      options.day < 35
    ) {
      sql += ' and date >= date(?, "+1 day")';
      searchParams.push(
        `${options.year}-${padZero(options.month)}-${padZero(options.day)}`
      );
    }

    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(
          `updateScheduledFinItem - Update fin data in ${FIN_TABLE_NAME} table`,
          `${sql} - ${searchParams}`,
          err
        );
      } else {
        logDBSuccess(
          `updateScheduledFinItem - Update fin data in ${FIN_TABLE_NAME} table`,
          `${sql} - ${searchParams}`
        );
      }

      callback && callback(err);

      err ? reject({ err }) : resolve({ status: true });
    });
  });

  return promise;
};

module.exports = {
  updateFinItem,
  updateScheduledFinItem,
};
