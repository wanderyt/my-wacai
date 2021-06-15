const {createDBConnection, closeDB} = require('../dbops');
const {FIN_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess, uuid} = require('../util');

/**
 *
 * @param {object} data
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date - 2019-04-20 19:20:00
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {number} data.userId target user id
 * @param {string} data.tags target fin item tags
 */
const createFinItem = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount, place, city, userid, tags)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let finId = uuid();
    let searchParams = [
      finId,
      data.category,
      data.subcategory,
      data.date,
      data.comment || '',
      data.amount,
      data.place || '',
      data.city || '',
      data.userId || 1,
      data.tags || '',
    ];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`createFinItem - Create fin data in ${FIN_TABLE_NAME} table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`createFinItem - Create fin data in ${FIN_TABLE_NAME} table with params: ${searchParams}`, sql);
      }

      closeDB(db);

      err ? reject({err}) : resolve({status: true, id: finId});
    });
  })

  return promise;
};

/**
 *
 * @param {object} data
 * @param {string} data.finId target fin item id
 * @param {number} data.rating rating
 * @param {string} data.positiveComment positive comment
 * @param {string} data.negativeComment negative comment
 * @param {number} data.userId user id
 */
const createRatingByFinId = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `insert into RATING(rating_id, rating, positive_comment, negative_comment, fin_id, userid)
      values (?, ?, ?, ?, ?, ?);`;
    let ratingId = uuid();
    let searchParams = [
      ratingId,
      data.rating,
      data.positiveComment || '',
      data.negativeComment || '',
      data.finId,
      data.userId || 1,
    ];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(`createRatingByFinId - Create rating data in ${FIN_TABLE_NAME} table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`createRatingByFinId - Create rating data in ${FIN_TABLE_NAME} table with params: ${searchParams}`, sql);
      }

      closeDB(db);

      err ? reject({err}) : resolve({status: true, id: ratingId});
    });
  })

  return promise;
};

/**
 * Config schedule sql settings
 * const SCHEDULE_DAY = 1;
 * const SCHEDULE_WEEK = 2;
 * const SCHEDULE_MONTH = 3;
 * const SCHEDULE_YEAR = 4;
 * @param {*} sqlTemplate
 * @param {*} scheduleMode
 * @returns {object} result
 * @returns {array} result.sqls - list of insert sql statement
 * @returns {array} result.ids - list of inserted fin item ids
 */
const formatSchedule = (sqlTemplate, datetime, scheduleMode) => {
  const scheduleModeMapping = {
    1: ['+{{number}} day', 100 * 365],
    2: ['+{{number}} week', 100 * 52],
    3: ['+{{number}} month', 100 * 12],
    4: ['+{{number}} year', 100]
  };
  let sqls = [];
  const currentScheduleId = uuid();
  const generatedIds = [];
  // Default setting will be added within 100 years
  const [datetimeTemplate, loopTimes] = scheduleModeMapping[scheduleMode];
  console.log('loopTimes: ', loopTimes);
  for (let index = 0; index <= loopTimes; index++) {
    let datetimeFn = datetimeTemplate.replace('{{number}}', index);
    let datetimeSql = `datetime('${datetime}','${datetimeFn}')`
    let id = uuid();
    sqls.push(sqlTemplate.replace('{{datetimeFn}}', datetimeSql).replace('{{id}}', id).replace('{{scheduleId}}', currentScheduleId));
    generatedIds.push(id);
  }

  return {
    sqls,
    generatedIds,
  };
}

/**
 * Create scheduled fin item record
 * [TODO]: change sql statement to params
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {number} data.isScheduled target fin item schedule mode
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {number} data.userId target user id
 * @param {string} data.tags target fin item tags
 */
const createScheduledFinItem = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    const SCHEDULE_NONE = 0;
    let scheduleMode = data.isScheduled || SCHEDULE_NONE;
    let insertHeaderSQL = `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount, isScheduled, scheduleId, place, city, userId, tags) `;
    let insertRowSQL = `select "{{id}}", "${data.category}", "${data.subcategory}", {{datetimeFn}}, "${data.comment || ''}", ${data.amount}, ${scheduleMode}, '{{scheduleId}}', "${data.place || ''}", "${data.city || ''}", ${data.userId || 1}, "${data.tags || ''}"`;
    let {sqls: sqlList, generatedIds} = formatSchedule(insertHeaderSQL + insertRowSQL + ';', data.date, scheduleMode);
    console.log('sqllist: ', sqlList.join(''));
    db.exec(sqlList.join(''), (err) => {
      if (err) {
        logDBError(`createScheduledFinItem - Create scheduled fin data in ${FIN_TABLE_NAME} table`, JSON.stringify(data), err);
      } else {
        logDBSuccess(`createScheduledFinItem - Create scheduled fin data in ${FIN_TABLE_NAME} table`, JSON.stringify(data));
      }

      closeDB(db);
      err ? reject({err}) : resolve({
        ids: generatedIds
      });
    });
  });

  return promise;
}

module.exports = {
  createFinItem,
  createScheduledFinItem,
  createRatingByFinId,
};
