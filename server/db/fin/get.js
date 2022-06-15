const {
  FIN_TABLE_NAME,
  CATEGORY_TABLE_NAME,
  TEMPLATE_TABLE_NAME,
} = require("../config");
const {
  logDBError,
  logDBSuccess,
  mapSearchParamsToDBSearch,
} = require("../util");
const { padZero } = require("../../helper");

/**
 * Search all fin items by search params
 * [TODO]: change to use sql params
 * @param {object} db
 * @param {object} searchOptions
 * @param {function} callback
 */
const getFinItemsBySearchOptions = (db, searchOptions, callback) => {
  let searchString = "";
  try {
    searchString = mapSearchParamsToDBSearch(searchOptions);
  } catch (e) {
    return new Promise((res, rej) => {
      rej({
        err: e,
      });
    });
  }

  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where ${searchString} order by date desc;`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(
          `Search all fin items in fin table with search string: ${searchString}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Search all fin items in fin table with search string: ${searchString}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all valid cities
 * @param {object} db
 * @param {object} options target query data
 * @param {number} options.userId target query user id
 * @param {function} callback
 */
const getAllCities = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select distinct city from ${FIN_TABLE_NAME} where city != '' and userId = ? order by date desc;`;
    let searchParam = [options.userId];
    db.all(sql, searchParam, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch all non empty cities in fin table with params: ${searchParam}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch all non empty cities in fin table with params: ${searchParam}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all valid comments
 * @param {object} db
 * @param {object} options target query data
 * @param {number} options.userId target query user id
 * @param {function} callback
 */
const getAllComments = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    // let sql = `select distinct comment from (select distinct comment from ${FIN_TABLE_NAME} where comment != '' and userId = ? order by date desc) union select distinct comment from (select distinct place as comment from ${FIN_TABLE_NAME} where place != '' and userId = ? order by date desc);`;
    const userId = options.userId;
    let sql = `
      select
        comment,
        date
      from (
        select
          comment,
          date,
          (
            select count(*)
            from (select distinct * from (select distinct comment, date from ${FIN_TABLE_NAME} where comment != '' and userId = ${userId} and date <= date('now') union select distinct place as comment, date from ${FIN_TABLE_NAME} where place != '' and userId = ${userId} and date <= date('now') order by date desc)) as mainA
            where mainA.date > mainB.date and mainA.comment = mainB.comment
          ) as row_number
          from (select distinct * from (select distinct comment, date from ${FIN_TABLE_NAME} where comment != '' and userId = ${userId} and date <= date('now') union select distinct place as comment, date from ${FIN_TABLE_NAME} where place != '' and userId = ${userId} and date <= date('now') order by date desc)) as mainB
          order by comment
      ) as main
      where main.row_number = 0
      order by comment;
    `;
    let searchParams = [userId, userId];
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch all non empty comments in fin table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch all non empty comments in fin table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all valid details
 * @param {object} db
 * @param {object} options target query data
 * @param {number} options.userId target query user id
 * @param {function} callback
 */
const getAllDetails = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select distinct details from ${FIN_TABLE_NAME} where details != '' and userId = ? order by date desc;`;
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch all non empty details in fin table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch all non empty details in fin table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all valid comments with related info
 * @param {object} db
 * @param {object} options target query data
 * @param {number} options.userId target query user id
 * @param {function} callback
 */
const getCommentsOptions = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    // let sql = `select distinct comment, category, subcategory, place from ${FIN_TABLE_NAME} where comment != '' and userId = ? order by date desc;`;
    const userId = options.userId;
    let sql = `
      select
        distinct
        comment,
        details,
        category,
        subcategory,
        place
      from fin
      where comment <> '' and place <> '' and userId = ${userId}
      order by comment;
    `;
    let searchParams = [userId];
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch all non empty comments options in fin table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch all non empty comments options in fin table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all valid tags
 * @param {object} db
 * @param {object} options target query data
 * @param {number} options.userId target query user id
 * @param {function} callback
 */
const getAllTags = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select distinct tags from ${FIN_TABLE_NAME} where tags != '' and userId = ? order by date desc;`;
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch all non empty tags in fin table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch all non empty tags in fin table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all category groups
 * @param {Object} db DB connection object
 * @param {Object} options queries
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getCategoryGroup = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select category, subcategory, is_common from ${CATEGORY_TABLE_NAME} where userId = ?;`;
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getCategoryGroup - Fetch data in CATEGORY table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getCategoryGroup - Fetch data in CATEGORY table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all daily total data.
 * [TODO]: change to use sql params
 * @param {object} db
 * @param {object} options
 * @param {string} options.year target year, format 'YYYY'
 * @param {string} options.month target month, format 'MM'
 * @param {number} options.userId target user id
 * @param {function} callback
 */
const getDailyTotal = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select sum(amount) as total, year_month_date from (select amount, substr(date, 1, 10) as year_month_date from ${FIN_TABLE_NAME} where date like '${options.year}-${options.month}%' and userId = ?) group by year_month_date order by year_month_date desc;`;
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch monthly total data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch monthly total data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get fin items by month
 * @param {object} db
 * @param {object} options
 * @param {string} options.year target year, format 'YYYY'
 * @param {string} options.month target month, format 'MM'
 * @param {number} options.userId target user id
 * @param {function} callback
 */
const getFinItemsByMonth = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where date like '${options.year}-${options.month}%' and userId = ? order by date desc;`;
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch month (${options.year}-${options.month}) details in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch month (${options.year}-${options.month}) details in FIN table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get fin list data
 * @param {Object} db DB connection object
 * @param {object} options query options
 * @param {number} options.top query numbers
 * @param {number} options.month query ends with specific month, need to be formatted like MM
 * @param {number} options.year query ends with specific month, need to be formatted like YYYY
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getFinList = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where userId = ?`;
    if (options) {
      if (options.month && options.year) {
        sql += ` and date <= '${options.year}-${padZero(
          parseInt(options.month) + 1
        )}-%'`;
      }
      sql += " order by date desc";
      if (options.top) {
        sql += " limit " + options.top;
      }
    }

    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `getFinList - Fetch data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `getFinList - Fetch data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get sum expense of whole month in specific year month
 * @param {Object} db DB connection object
 * @param {Object} options options for sql
 * @param {string} options.month query month details, will be formatted as 'MM' inside function
 * @param {string} options.year query year details, need to be formatted as 'YYYY'
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getSumByYearMonth = (db, options, callback) => {
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

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get sum expense of whole current week in specific year month day, this will exclude those scheduled items.
 * @param {Object} db DB connection object
 * @param {Object} options options for sql
 * @param {string} options.month query month details, will be formatted as 'MM' inside function
 * @param {string} options.year query year details, need to be formatted as 'YYYY'
 * @param {string} options.day query day details, will be formatted as 'DD' inside function
 * @param {string} options.dayOfWeek query day of week details, Sunday as 0, Monday as 1, etc.
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getSumByWeek = (db, options, callback) => {
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
    // db.all(sql, searchParams, (err, rows) => {
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(
          "getSumByWeek - Fetch data in FIN table",
          sql + " with params: " + searchParams.join(", "),
          err
        );
      } else {
        logDBSuccess(
          "getSumByWeek - Fetch data in FIN table",
          sql + " with params: " + searchParams.join(", ")
        );
      }

      callback && callback(err, rows);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get sum expense of current day in specific year month day, this will exclude those scheduled items.
 * @param {Object} db DB connection object
 * @param {Object} options options for sql
 * @param {string} options.month query month details, will be formatted as 'MM' inside function
 * @param {string} options.year query year details, need to be formatted as 'YYYY'
 * @param {string} options.day query day details, will be formatted as 'DD' inside function
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getSumByDay = (db, options, callback) => {
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
          "getSumByDay - Fetch data in FIN table",
          sql + " with params: " + searchParams.join(", "),
          err
        );
      } else {
        logDBSuccess(
          "getSumByDay - Fetch data in FIN table",
          sql + " with params: " + searchParams.join(", ")
        );
      }

      callback && callback(err, rows);
      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all fin templates
 * @param {object} db
 * @param {object} options
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getFinTemplates = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${TEMPLATE_TABLE_NAME} where userId = ?;`;
    let searchParams = [options.userId];
    console.log("get fin template: ", options.userId);
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch fin templates in template table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch fin templates in template table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Get all monthly total data.
 * @param {object} db
 * @param {object} options query options
 * @param {number} options.month query ends with specific month, need to be formatted like MM
 * @param {number} options.year query ends with specific month, need to be formatted like YYYY
 * @param {number} options.userId query user id
 * @param {function} callback
 */
const getMonthlyTotal = (db, options, callback) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select sum(amount) as total, year_month from (select amount, substr(date, 1, 7) as year_month from ${FIN_TABLE_NAME} {{queries}}) group by year_month order by year_month desc;`;
    if (options.month && options.year) {
      sql = sql.replace(
        "{{queries}}",
        `where date <= '${options.year}-${padZero(
          parseInt(options.month) + 1
        )}-%' and userId = ?`
      );
    }
    let searchParams = [options.userId];
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Fetch monthly total data in FIN table with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Fetch monthly total data in FIN table with params: ${searchParams}`,
          sql
        );
      }

      callback && callback(err, rows);

      err ? reject({ err }) : resolve({ rows });
    });
  });

  return promise;
};

/**
 * Search all fin items by specific search string
 * @param {object} db
 * @param {string} searchString
 * @param {object} options
 * @param {string} options.year
 * @param {string} options.month
 * @param {number} options.userId
 * @param {function} callback
 */
const getFinItemsBySearchString = (
  db,
  searchString,
  options = {},
  callback
) => {
  let promise = new Promise((resolve, reject) => {
    let sql = `select * from ${FIN_TABLE_NAME} where (category like '%${searchString}%' or subcategory like '%${searchString}%' or comment like '%${searchString}%' or details like '%${searchString}%' or place like '%${searchString}%' or city like '%${searchString}%' or tags like '%${searchString}%') and userId = ? {{dateSearchString}} order by date desc;`;
    let dateSearchString = "";
    if (options.month && options.year) {
      dateSearchString = ` and date <= '${options.year}-${padZero(
        parseInt(options.month) + 1
      )}-%'`;
    }
    sql = sql.replace("{{dateSearchString}}", dateSearchString);

    let searchParams = [options.userId];
    console.log(sql);
    db.all(sql, searchParams, (err, rows) => {
      if (err) {
        logDBError(
          `Search all fin items in fin table with search string: ${searchString} with params: ${searchParams}`,
          sql,
          err
        );
      } else {
        logDBSuccess(
          `Search all fin items in fin table with search string: ${searchString} with params: ${searchParams}`,
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
  getFinItemsBySearchOptions,
  getAllCities,
  getAllComments,
  getAllDetails,
  getCommentsOptions,
  getAllTags,
  getCategoryGroup,
  getDailyTotal,
  getFinItemsByMonth,
  getFinList,
  getSumByYearMonth,
  getSumByWeek,
  getSumByDay,
  getFinTemplates,
  getMonthlyTotal,
  getFinItemsBySearchString,
};
