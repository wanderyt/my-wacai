const {createDBConnection, closeDB} = require('../dbops');
const {FIN_TABLE_NAME} = require('../config');
const {logDBError, logDBSuccess} = require('../util');
const {padZero} = require('../../helper');

/**
 * Delete specific fin item based on fin item id
 * @param {object} data target fin item data
 * @param {array | string} data.id target fin item data id or list
 * @param {number} data.userId target fin item user id
 */
const deleteFinItemById = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let {id: finIdList, userId} = data;
    if (!Array.isArray(finIdList)) {
      finIdList = [finIdList];
    }
    let sqlTemplate = `delete from ${FIN_TABLE_NAME} where id = ? and userId = ?;`;
    let sql = "", searchParams = [];
    finIdList.forEach((id) => {
      sql += sqlTemplate;
      searchParams.push(id, userId);
    });
    db.all(sql, searchParams, (err) => {
      if (err) {
        logDBError(`Delete fin data in FIN table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`Delete fin data in FIN table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({id: data.id});
    });
  });

  return promise;
}

/**
 * Delete specific fin item based on fin item id
 * @param {object} data target fin item data
 * @param {string} data.scheduleId query specific schedule id
 * @param {number} data.year query specific year
 * @param {number} data.month query specific month
 * @param {number} data.day query specific day
 * @param {number} data.userId query user id
 */
const deleteScheduledFinItemsByTime = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    let sql = `delete from ${FIN_TABLE_NAME} where scheduleId = ? and userId = ?`;
    let params = [data.scheduleId, data.userId];
    if (data.year && data.month && data.day && Number(data.year) && data.month < 13 && data.day < 35) {
      sql += ' and date >= date(?, "+1 day")';
      params.push(`${data.year}-${padZero(data.month)}-${padZero(data.day)}`);
    }
    db.run(sql, params, (err) => {
      if (err) {
        logDBError(`Delete fin data in FIN table with params: ${params}`, sql, err);
      } else {
        logDBSuccess(`Delete fin data in FIN table with params: ${params}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({scheduleId: data.scheduleId});
    });
  });

  return promise;
}

/**
 * Delete rating record by fin id and user id
 * @param {object} data query data
 * @param {array | string} data.finId query fin id or list
 * @param {number} data.userId query user id
 */
const deleteRatingByFinId = (data) => {
  const db = createDBConnection();
  let promise = new Promise((resolve, reject) => {
    console.log("deleteRatingByFinId - data: ", data);
    let {finId: finIdList, userId} = data;
    if (!Array.isArray(finIdList)) {
      finIdList = [finIdList];
    }
    let sqlTemplate = `delete from RATING where fin_id = ? and userId = ?;`;
    let sql = "", searchParams = [];
    finIdList.forEach((id) => {
      sql += sqlTemplate;
      searchParams.push(id, userId);
    });
    console.log("deleteRatingByFinId - sql: ", sql);
    console.log("deleteRatingByFinId - searchParams: ", searchParams);
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        console.log("deleteRatingByFinId - err: ", err);
        logDBError(`deleteRatingByFinId - Delete rating data in RATING table with params: ${searchParams}`, sql, err);
      } else {
        logDBSuccess(`deleteRatingByFinId - Delete rating data in RATING table with params: ${searchParams}`, sql);
      }

      closeDB(db);
      err ? reject({err}) : resolve({status: true});
    });
  });

  return promise;
}

module.exports = {
  deleteFinItemById,
  deleteScheduledFinItemsByTime,
  deleteRatingByFinId,
  // deleteRatingByScheduleId,
};
