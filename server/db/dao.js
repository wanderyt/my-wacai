const sqlite3 = require('sqlite3').verbose();
const {TEST_DB_FILE_PATH, DB_FILE_PATH, FIN_TABLE_NAME, CATEGORY_TABLE_NAME} = require('./config');
const {logDBError, logDBSuccess} = require('./util');
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
 * @param {function} callback
 */
const getFinList = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select * from ${FIN_TABLE_NAME} order by date desc`;
    if (options) {
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
 * @param {string} options.month query month details, format as 'YYYY-MM'
 * @param {function} callback
 */
const getSumByMonth = (db, options, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `select sum(amount) as total from (select * from ${FIN_TABLE_NAME} where date like '${options.month}-%');`;
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
 * @param {string} data.date target fin item date
 * @param {string} data.comment target fin item comment
 * @param {number} data.amount target fin item amount
 * @param {function} callback
 */
const createFinItem = (db, data, callback) => {
  let promise = new Promise((resolve) => {
    let sql =
      `insert into ${FIN_TABLE_NAME}(id, category, subcategory, date, comment, amount)
      values ("${data.id}", "${data.category}", "${data.subcategory}", "${data.date}", "${data.comment}", ${data.amount});`;
    db.all(sql, (err, rows) => {
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
      if (key !== 'id') {
        const value = data[key];
        updateOptions += `${key}="${value}", `;
      }
    }
    updateOptions = updateOptions.slice(0, updateOptions.length - 2);

    let sql = `update ${FIN_TABLE_NAME} set ${updateOptions} where id = "${data.id}";`;

    console.log('david sql: ', sql);
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
 * Delete specific fin item
 * @param {object} db
 * @param {string} id target fin item data id
 * @param {function} callback
 */
const deleteFinItem = (db, id, callback) => {
  let promise = new Promise((resolve) => {
    let sql = `delete from ${FIN_TABLE_NAME} where id = "${id}";`;
    db.run(sql, (err) => {
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

const closeDB = (db) => {
  db.close();
};

module.exports = {
  createDBConnection,
  insertFinData,
  deleteAllData,
  getFinList,
  getSumByMonth,
  getCategoryGroup,
  createFinItem,
  updateFinItem,
  deleteFinItem,
  closeDB,
};

