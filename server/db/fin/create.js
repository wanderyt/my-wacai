const {FIN_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess, uuid} = require('../util');

/**
 * Create fin item record
 * @param {object} db
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date - 2019-04-20 19:20:00
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {string} data.place target fin item place
 * @param {string} data.city target fin item city
 * @param {number} data.userId target user id
 * @param {string} data.tags target fin item tags
 * @param {function} callback
 */
const createFinItem = (db, data, callback) => {
  let finPromise = new Promise((resolve, reject) => {
    let finSql = `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount, place, city, userid, tags)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let finSearchParams = [
      data.id,
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
    db.all(finSql, finSearchParams, (err) => {
      if (err) {
        logDBError(`createFinItem - Create fin data in ${FIN_TABLE_NAME} table with params: ${finSearchParams}`, finSql, err);
      } else {
        logDBSuccess(`createFinItem - Create fin data in ${FIN_TABLE_NAME} table with params: ${finSearchParams}`, finSql);
      }

      callback && callback(err);

      err ? reject({err}) : resolve({status: true});
    });
  });

  let ratingPromise = new Promise((resolve, reject) => {
    let ratingSql = `insert into RATING(rating_id, rating, positive_comment, negative_comment, fin_id, userid)
      values (?, ?, ?, ?, ?, ?);`;
    let ratingSearchParams = [
      data.ratingId,
      data.rating,
      data.positiveComment || '',
      data.negativeComment || '',
      data.id,
      data.userId || 1,
    ];
    db.all(ratingSql, ratingSearchParams, (err) => {
      if (err) {
        logDBError(`createFinItemRating - Create fin rating data in RATING table with params: ${ratingSearchParams}`, ratingSql, err);
      } else {
        logDBSuccess(`createFinItemRating - Create fin rating data in RATING table with params: ${ratingSearchParams}`, ratingSql);
      }

      callback && callback(err);

      err ? reject({err}) : resolve({status: true});
    });
  });

  return Promise.all([finPromise, ratingPromise]);
}

/**
 * Config schedule sql settings
 * const SCHEDULE_DAY = 1;
 * const SCHEDULE_WEEK = 2;
 * const SCHEDULE_MONTH = 3;
 * const SCHEDULE_YEAR = 4;
 * @param {*} sqlTemplate
 * @param {*} scheduleMode
 * @returns {*} list of insert sql statement
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
  // Default setting will be added within 100 years
  const [datetimeTemplate, loopTimes] = scheduleModeMapping[scheduleMode];
  for (let index = 0; index <= loopTimes; index++) {
    let datetimeFn = datetimeTemplate.replace('{{number}}', index);
    let datetimeSql = `datetime('${datetime}','${datetimeFn}')`
    let id = uuid();
    sqls.push(sqlTemplate.replace('{{datetimeFn}}', datetimeSql).replace('{{id}}', id).replace('{{scheduleId}}', currentScheduleId));
  }

  return sqls;
}

/**
 * Create scheduled fin item record
 * [TODO]: change sql statement to params
 * @param {object} db
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
 * @param {function} callback
 */
const createScheduledFinItem = (db, data, callback) => {
  let promise = new Promise((resolve, reject) => {
    const SCHEDULE_NONE = 0;
    let scheduleMode = data.isScheduled || SCHEDULE_NONE;
    let insertHeaderSQL = `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount, isScheduled, scheduleId, place, city, userId, tags) `;
    let insertRowSQL = `select "{{id}}", "${data.category}", "${data.subcategory}", {{datetimeFn}}, "${data.comment || ''}", ${data.amount}, ${scheduleMode}, '{{scheduleId}}', "${data.place || ''}", "${data.city || ''}", ${data.userId || 1}, "${data.tags || ''}"`;
    let sqlList = formatSchedule(insertHeaderSQL + insertRowSQL + ';', data.date, scheduleMode);
    db.exec(sqlList.join(''), (err) => {
      if (err) {
        logDBError(`createScheduledFinItem - Create scheduled fin data in ${FIN_TABLE_NAME} table`, JSON.stringify(data), err);
      } else {
        logDBSuccess(`createScheduledFinItem - Create scheduled fin data in ${FIN_TABLE_NAME} table`, JSON.stringify(data));
      }

      callback && callback(err);

      err ? reject({err}) : resolve({status: true});
    });
  });

  return promise;
}

/**
 * Add new fin template
 * @param {object} db
 * @param {object} data Target new template data.
 * @param {string} data.category Target new template category data.
 * @param {string} data.subcategory Target new template subcategory data.
 * @param {string} data.comment Target new template comment data.
 * @param {string} data.place Target new template place data.
 * @param {number} data.userId Target user id.
 * @param {function} callback
 */
const createFinTemplate = (db, data, callback) => {
  let promise = new Promise((resolve, reject) => {
    if (data) {
      let {category, subcategory, comment, place, userId} = data;
      let querySQL = `select * from ${TEMPLATE_TABLE_NAME} where category = ? and subcategory = ? and comment = ? and place = ? and userId = ?;`;
      let searchParams = [category, subcategory, comment, place, userId];
      db.all(querySQL, searchParams, (err, rows) => {
        if (err) {
          logDBError(`Query if target template is already existed`, querySQL, err);
        } else {
          logDBSuccess(`Query if target template is already existed`, querySQL);
          if (rows.length > 0) {
            logDBError(`Target new template is already existed`, querySQL, err);
            resolve({err: 'Target new template is already existed'});
          } else {
            let insertSQL = `insert into ${TEMPLATE_TABLE_NAME}(category, subcategory, comment, place, userId) values(?, ?, ?, ?, ?);`;
            db.run(insertSQL, searchParams, (err) => {
              if (err) {
                logDBError(`Insert new template in template table`, insertSQL, err);
              } else {
                logDBSuccess(`Insert new template in template table`, insertSQL);
              }

              callback && callback(err);

              err ? reject({err}) : resolve({status: true});
            });
          }
        }
      })
    } else {
      let err = {
        err: 'Data is not set.'
      };
      callback && callback(err, []);
      reject({err});
    }
  });

  return promise;
}

module.exports = {
  createFinItem,
  createScheduledFinItem,
  createFinTemplate,
};
