const sqlite3 = require('sqlite3').verbose();
const {TEST_DB_FILE_PATH, DB_FILE_PATH, FIN_TABLE_NAME, CATEGORY_TABLE_NAME, TEMPLATE_TABLE_NAME} = require('./config');
const {logDBError, logDBSuccess, mapSearchParamsToDBSearch, uuid} = require('./util');
const {padZero} = require('../helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const createDBConnection = () => {
  console.log('process.env.DB_TEST: ', process.env.DB_TEST);
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  let dbFilePath = process.env.DB_TEST ? TEST_DB_FILE_PATH : DB_FILE_PATH;
  console.log('dbFilePath: ', dbFilePath);
  let db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      logger.error(`Failed to connect to the chinook database: ${dbFilePath}`);
      logger.error(err.message);
    }
    console.log('Connected to the chinook database.');
    logger.info(`Connected to the chinook database: ${dbFilePath}`);
  });

  return db;
};

const insertFinData = (db, data, callback) => {
  let sql = '', id = '';
  if (Array.isArray(data)) {
    data.map(({id, category, subcategory, money, amount, comment, date}) => {
      let tmpSql =
        `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount)
        values ("${id}", "${category}", "${subcategory}", "${date}", "${comment}", "${money || amount}");`;
      sql += tmpSql;
    });
  } else {
    id = data.id;
    sql =
      `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount)
      values ("${data.id}", "${data.category}", "${data.subcategory}", "${data.date}", "${data.comment}", "${data.money || data.amount}");`;
  }

  db.run(sql, (err) => {
    if (err) {
      logDBError('insert data with id: ' + id, sql, err);
    } else {
      logDBSuccess('insert data with id: ' + id, sql);
    }

    callback && callback(err);
  });
};

const deleteAllData = (db, callback) => {
  let sql = `delete from ${FIN_TABLE_NAME};`;
  db.run(sql, (err) => {
    if (err) {
      logDBError('Delete all data in FIN table', sql, err);
    } else {
      logDBSuccess('Delete all data in FIN table', sql);
    }

    callback && callback(err);
  });
}

/**
 * Get fin list data
 * @param {Object} db DB connection object
 * @param {object} options query options
 * @param {number} options.top query numbers
 * @param {number} options.month query ends with specific month, need to be formatted like MM
 * @param {number} options.year query ends with specific month, need to be formatted like YYYY
 * @param {function} callback
 */
const getFinList = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select * from ${FIN_TABLE_NAME}`;
    if (options) {
      if (options.month && options.year) {
        sql += ` where date <= '${options.year}-${padZero(options.month + 1)}-%'`;
      }
      sql += ' order by date desc';
      if (options.top) {
        sql += ' limit ' + options.top;
      }
    }

    db.all(sql, (err, rows) => {
      if (err) {
        logDBError('getFinList - Fetch data in FIN table', sql, err);
      } else {
        logDBSuccess('getFinList - Fetch data in FIN table', sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  })

  return promise;
};

/**
 * Get fin list by month
 * @param {Object} db DB connection object
 * @param {Object} options options for sql
 * @param {string} options.month query month details, need to be formatted as 'MM'
 * @param {string} options.year query year details, need to be formatted as 'YYYY'
 * @param {function} callback
 */
const getSumByYearMonth = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date like '${options.year}-${padZero(options.month)}-%');`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError('getFinListByMonth - Fetch data in FIN table', sql, err);
      } else {
        logDBSuccess('getFinListByMonth - Fetch data in FIN table', sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

/**
 * Get all category groups
 * @param {Object} db DB connection object
 * @param {Object} options options for sql
 * @param {function} callback
 */
const getCategoryGroup = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select category, subcategory, is_common from ${CATEGORY_TABLE_NAME};`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError('getCategoryGroup - Fetch data in CATEGORY table', sql, err);
      } else {
        logDBSuccess('getCategoryGroup - Fetch data in CATEGORY table', sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

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
 * @param {function} callback
 */
const createFinItem = (db, data, callback) => {
  let promise = new Promise((resolve) => {
    let sql =
      `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount)
      values ("${data.id}", "${data.category}", "${data.subcategory}", "${data.date}", "${data.comment || ''}", ${data.amount});`;
    db.all(sql, (err) => {
      if (err) {
        logDBError(`createFinItem - Create fin data in ${FIN_TABLE_NAME} table`, sql, err);
      } else {
        logDBSuccess(`createFinItem - Create fin data in ${FIN_TABLE_NAME} table`, sql);
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
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
 * @param {object} db
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {number} data.isScheduled target fin item schedule mode
 * @param {function} callback
 */
const createScheduledFinItem = (db, data, callback) => {
  let promise = new Promise((resolve) => {
    const SCHEDULE_NONE = 0;
    let scheduleMode = data.isScheduled || SCHEDULE_NONE;
    let insertHeaderSQL = `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount, isScheduled, scheduleId) `;
    let insertRowSQL = `select "{{id}}", "${data.category}", "${data.subcategory}", {{datetimeFn}}, "${data.comment || ''}", ${data.amount}, ${scheduleMode}, '{{scheduleId}}'`;
    let sqlList = formatSchedule(insertHeaderSQL + insertRowSQL + ';', data.date, scheduleMode);
    db.exec(sqlList.join(''), (err) => {
      if (err) {
        logDBError(`createScheduledFinItem - Create scheduled fin data in ${FIN_TABLE_NAME} table`, JSON.stringify(data), err);
      } else {
        logDBSuccess(`createScheduledFinItem - Create scheduled fin data in ${FIN_TABLE_NAME} table`, JSON.stringify(data));
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
}

/**
 * Update existing fin item
 * @param {object} db
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {function} callback
 */
const updateFinItem = (db, data, callback) => {
  let promise = new Promise((resolve) => {
    let updateOptions = '';
    for (const key in data) {
      const value = data[key];
      // Remove null object value, but need to allow empty string
      if (key !== 'id' && (value === '' || !!value)) {
        updateOptions += `${key}="${value}", `;
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where id = "${data.id}";`;
    db.run(sql, (err) => {
      if (err) {
        logDBError(`updateFinItem - Update fin data in ${FIN_TABLE_NAME} table`, sql, err);
      } else {
        logDBSuccess(`updateFinItem - Update fin data in ${FIN_TABLE_NAME} table`, sql);
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
}

/**
 * Update existing scheduled fin items
 * @param {object} db
 * @param {object} data target fin item
 * @param {string} data.id target fin item id
 * @param {string} data.category target fin item category
 * @param {string} data.subcategory target fin item subcategory
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {string} data.scheduleId target fin item schedule id
 * @param {number} data.amount target fin item amount
 * @param {number} options.year query specific year
 * @param {number} options.month query specific month
 * @param {number} options.day query specific day
 * @param {function} callback
 */
const updateScheduledFinItem = (db, data, options, callback) => {
  let promise = new Promise((resolve) => {
    let updateOptions = '';
    for (const key in data) {
      if (key !== 'id' && key !== 'date') {
        const value = data[key];
        updateOptions += `${key}="${value}", `;
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where scheduleId = ?`;
    let searchParams = [data.scheduleId];
    if (options.year && options.month && options.day && Number(options.year) && options.month < 13 && options.day < 35) {
      sql += ' and date >= date(?, "+1 day")';
      searchParams.push(`${options.year}-${padZero(options.month)}-${padZero(options.day)}`);
    }

    db.run(sql, searchParams, (err) => {
      if (err) {
        logDBError(`updateScheduledFinItem - Update fin data in ${FIN_TABLE_NAME} table`, `${sql} - ${searchParams}`, err);
      } else {
        logDBSuccess(`updateScheduledFinItem - Update fin data in ${FIN_TABLE_NAME} table`, `${sql} - ${searchParams}`);
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
}

/**
 * Delete specific fin item
 * @param {object} db
 * @param {string} id target fin item data id
 * @param {function} callback
 */
const deleteFinItem = (db, id, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `delete from ${FIN_TABLE_NAME} where id = ?;`;
    db.run(sql, [id], (err) => {
      if (err) {
        logDBError('Delete fin data in FIN table', sql + id, err);
      } else {
        logDBSuccess('Delete fin data in FIN table', sql + id);
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
 * @param {function} callback
 */
const deleteScheduledFinItem = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `delete from ${FIN_TABLE_NAME} where scheduleId = ?`;
    let params = [options.scheduleId];
    if (options.year && options.month && options.day && Number(options.year) && options.month < 13 && options.day < 35) {
      sql += ' and date >= date(?, "+1 day")';
      params.push(`${options.year}-${padZero(options.month)}-${padZero(options.day)}`);
    }
    db.run(sql, params, (err) => {
      if (err) {
        logDBError('Delete fin data in FIN table', sql, err);
      } else {
        logDBSuccess('Delete fin data in FIN table', sql);
      }

      callback && callback(err);

      resolve({err});
    });
  });

  return promise;
}

/**
 * Get all monthly total data.
 * @param {object} db
 * @param {object} options query options
 * @param {number} options.month query ends with specific month, need to be formatted like MM
 * @param {number} options.year query ends with specific month, need to be formatted like YYYY
 * @param {function} callback
 */
const getMonthlyTotal = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select sum(amount) as total, year_month from (select amount, substr(date, 1, 7) as year_month from ${FIN_TABLE_NAME} {{queries}}) group by year_month order by year_month desc;`;
    if (options.month && options.year) {
      sql = sql.replace("{{queries}}", `where date <= '${options.year}-${padZero(options.month + 1)}-%'`);
    }
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError('Fetch monthly total data in FIN table', sql, err);
      } else {
        logDBSuccess('Fetch monthly total data in FIN table', sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

/**
 * Get all daily total data.
 * @param {object} db
 * @param {object} options
 * @param {string} options.year target year, format 'YYYY'
 * @param {string} options.month target month, format 'MM'
 * @param {function} callback
 */
const getDailyTotal = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select sum(amount) as total, year_month_date from (select amount, substr(date, 1, 10) as year_month_date from ${FIN_TABLE_NAME} where date like '${options.year}-${options.month}%') group by year_month_date order by year_month_date desc;`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError('Fetch monthly total data in FIN table', sql, err);
      } else {
        logDBSuccess('Fetch monthly total data in FIN table', sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

/**
 * Get fin items by month
 * @param {object} db
 * @param {object} options
 * @param {string} options.year target year, format 'YYYY'
 * @param {string} options.month target month, format 'MM'
 * @param {function} callback
 */
const getFinItemsByMonth = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select * from ${FIN_TABLE_NAME} where date like '${options.year}-${options.month}%' order by date desc;`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(`Fetch month (${options.year}-${options.month}) details in FIN table`, sql, err);
      } else {
        logDBSuccess(`Fetch month (${options.year}-${options.month}) details in FIN table`, sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

/**
 * Get all fin templates
 * @param {object} db
 * @param {function} callback
 */
const getFinTemplates = (db, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select * from ${TEMPLATE_TABLE_NAME};`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(`Fetch fin templates in template table`, sql, err);
      } else {
        logDBSuccess(`Fetch fin templates in template table`, sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
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
 * @param {function} callback
 */
const createFinTemplate = (db, data, callback) => {
  let promise = new Promise((resolve) => {
    if (data) {
      let {category, subcategory, comment} = data;
      let querySQL = `select * from ${TEMPLATE_TABLE_NAME} where category = '${category}' and subcategory = '${subcategory}' and comment = '${comment}';`;
      db.all(querySQL, (err, rows) => {
        if (err) {
          logDBError(`Query if target template is already existed`, querySQL, err);
        } else {
          logDBSuccess(`Query if target template is already existed`, querySQL);
          if (rows.length > 0) {
            logDBError(`Target new template is already existed`, querySQL, err);
            resolve({err: 'Target new template is already existed'});
          } else {
            let insertSQL = `insert into ${TEMPLATE_TABLE_NAME}(category, subcategory, comment) values('${category}', '${subcategory}', '${comment}');`;
            db.run(insertSQL, (err) => {
              if (err) {
                logDBError(`Insert new template in template table`, insertSQL, err);
              } else {
                logDBSuccess(`Insert new template in template table`, insertSQL);
              }

              callback && callback(err);

              resolve({err});
            });
          }
        }
      })
    } else {
      let err = {
        err: 'Data is not set.'
      };
      callback && callback(err, []);
      resolve({err, rows: []});
    }
  });

  return promise;
}

/**
 * Get all valid comments
 * @param {object} db
 * @param {function} callback
 */
const getAllComments = (db, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select distinct comment from ${FIN_TABLE_NAME} where comment != '';`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(`Fetch all non empty comments in fin table`, sql, err);
      } else {
        logDBSuccess(`Fetch all non empty comments in fin table`, sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

/**
 * Search all fin items by specific search string
 * @param {object} db
 * @param {string} searchString
 * @param {function} callback
 */
const getFinItemsBySearchString = (db, searchString, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select * from ${FIN_TABLE_NAME} where category like '%${searchString}%' or subcategory like '%${searchString}%' or comment like '%${searchString}%' order date desc;`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(`Search all fin items in fin table with search string: ${searchString}`, sql, err);
      } else {
        logDBSuccess(`Search all fin items in fin table with search string: ${searchString}`, sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

/**
 * Search all fin items by search params
 * @param {object} db
 * @param {object} searchOptions
 * @param {function} callback
 */
const getFinItemsBySearchOptions = (db, searchOptions, callback) => {
  let searchString = '';
  try {
    searchString = mapSearchParamsToDBSearch(searchOptions);
  } catch (e) {
    return new Promise((res, rej) => {
      rej({
        err: e
      });
    });
  }

  let promise = new Promise((resolve) => {
    let sql = `select * from ${FIN_TABLE_NAME} where ${searchString};`;
    db.all(sql, (err, rows) => {
      if (err) {
        logDBError(`Search all fin items in fin table with search string: ${searchString}`, sql, err);
      } else {
        logDBSuccess(`Search all fin items in fin table with search string: ${searchString}`, sql);
      }

      callback && callback(err, rows);

      resolve({err, rows});
    });
  });

  return promise;
}

const closeDB = (db) => {
  db.close();
};

module.exports = {
  createDBConnection,
  insertFinData,
  deleteAllData,
  getFinList,
  getSumByYearMonth,
  getCategoryGroup,
  createFinItem,
  createScheduledFinItem,
  updateFinItem,
  updateScheduledFinItem,
  deleteFinItem,
  deleteScheduledFinItem,
  getMonthlyTotal,
  getDailyTotal,
  getFinItemsByMonth,
  getFinTemplates,
  createFinTemplate,
  getAllComments,
  getFinItemsBySearchString,
  getFinItemsBySearchOptions,
  closeDB,
};

