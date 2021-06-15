const {createDBConnection, closeDB} = require('../dbops');
const {FIN_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess, uuid} = require('../util');

const UPDATE_FIN_COLUMN_NAME_MAPPING_LIST = {
  'category': 'category',
  'subcategory': 'subcategory',
  'comment': 'comment',
  'amount': 'amount',
  'place': 'place',
  // 'date', date should be handled separately
  'city': 'city',
  'tags': 'tags'
};

const UPDATE_RATING_COLUMN_NAME_MAPPING_LIST = {
  'rating': 'rating',
  'positiveComment': 'positive_comment',
  'negativeComment': 'negative_comment'
};

const ALLOW_EMPTY_VALUE_FIELD = [
  'tags'
];

/**
 * Update existing fin item
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {number} data.userId target user id
 * @param {string} data.tags target fin item tags
 */
const updateFinItemById = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let updateOptions = '', searchParams = [];
    console.log('updateFinItemById - data: ', data);
    for (const key in data) {
      const value = data[key];
      // Remove null object value, but need to allow empty string
      if (UPDATE_FIN_COLUMN_NAME_MAPPING_LIST[key] && value) {
        updateOptions += `${UPDATE_FIN_COLUMN_NAME_MAPPING_LIST[key]} = ?, `;
        searchParams.push(value);
      }
      // Allow empty string
      if (value === '' && ALLOW_EMPTY_VALUE_FIELD.indexOf(key.toLowerCase()) > -1) {
        updateOptions += `${key} = ?, `;
        searchParams.push(value);
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where id = ? and userId = ?;`;
    searchParams = [...searchParams, data.id, data.userId];
    console.log('updateFinItemById - searchParams: ', searchParams);
    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(`updateFinItem - Update fin data in ${FIN_TABLE_NAME} table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`updateFinItem - Update fin data in ${FIN_TABLE_NAME} table with params: ${searchParams}`, sql);
      }

      closeDB(db);

      err ? reject({err}) : resolve({id: data.id});
    });
  });

  return promise;
};

/**
 * Update existing scheduled fin items
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {string} data.scheduleId target fin item schedule id
 * @param {number} data.amount target fin item amount
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {string} data.tags target fin item tags
 * @param {number} options.year query specific year
 * @param {number} options.month query specific month
 * @param {number} options.day query specific day
 * @param {number} options.userId query user id
 */
const updateScheduledFinItemByScheduleId = (data, options) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let updateOptions = '';
    for (const key in data) {
      const value = data[key];
      if (UPDATE_FIN_COLUMN_NAME_MAPPING_LIST[key] && value) {
        updateOptions += `${UPDATE_FIN_COLUMN_NAME_MAPPING_LIST[key]} = ?, `;
        searchParams.push(value);
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where scheduleId = ? and userId = ?`;
    let searchParams = [data.scheduleId, data.userId];
    if (options.year && options.month && options.day && Number(options.year) && options.month < 13 && options.day < 35) {
      sql += ' and date >= date(?, "+1 day")';
      searchParams.push(`${options.year}-${padZero(options.month)}-${padZero(options.day)}`);
    }

    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(`updateScheduledFinItemByScheduleId - Update fin data in ${FIN_TABLE_NAME} table`, `${sql} - ${searchParams}`, err);
      } else {
        logDBSuccess(`updateScheduledFinItemByScheduleId - Update fin data in ${FIN_TABLE_NAME} table`, `${sql} - ${searchParams}`);
      }

      closeDB(db);
      err ? reject({err}) : resolve({status: true});
    });
  });

  return promise;
}

/**
 * Update rating item based on fin id
 * @param {object} data target fin item
 * @param {string} data.finId target fin item id
 * @param {number} data.rating rating
 * @param {string} data.positiveComment
 * @param {string} data.negativeComment
 */
const updateRatingByFinId = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    console.log('updateRatingByFinId - data: ', data);
    let updateOptions = '', searchParams = [];
    for (const key in data) {
      const value = data[key];
      // Remove null object value, but need to allow empty string
      if (UPDATE_RATING_COLUMN_NAME_MAPPING_LIST[key]) {
        updateOptions += `${UPDATE_RATING_COLUMN_NAME_MAPPING_LIST[key]} = ?, `;
        searchParams.push(value);
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update RATING set ${updateOptions} where fin_id = ? and userId = ?;`;
    searchParams = [...searchParams, data.finId, data.userId];
    console.log('updateRatingByFinId - searchParams: ', searchParams);
    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(`updateRatingByFinId - Update rating data in rating table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`updateRatingByFinId - Update rating data in rating table with params: ${searchParams}`, sql);
      }

      closeDB(db);

      err ? reject({err}) : resolve({finId: data.finId});
    });
  });

  return promise;
};

module.exports = {
  updateFinItemById,
  updateScheduledFinItemByScheduleId,
  updateRatingByFinId,
};
