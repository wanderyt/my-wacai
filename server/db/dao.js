const sqlite3 = require('sqlite3').verbose();
const {DB_FILE_PATH, TABLE_NAME} = require('./config');
const {logDBError, logDBSuccess} = require('./util');

const createDBConnection = () => {
  let db = new sqlite3.Database(DB_FILE_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

  return db;
};

const insertFinData = (db, data, callback) => {
  let sql = '', id = '';
  if (Array.isArray(data)) {
    data.map(({id, category, subcategory, money, amount, comment, date}) => {
      let tmpSql =
        `insert into ${TABLE_NAME}(id, category, subcategory, date, comment, amount)
        values ("${id}", "${category}", "${subcategory}", "${date}", "${comment}", "${money || amount}");`;
      sql += tmpSql;
    });
  } else {
    id = data.id;
    sql =
      `insert into ${TABLE_NAME}(id, category, subcategory, date, comment, amount)
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
  let sql = `delete from ${TABLE_NAME};`;
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
    let sql = `select * from ${TABLE_NAME} order by date desc`;
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
    let sql = `select sum(amount) as total from (select * from ${TABLE_NAME} where date like '${options.month}-%');`;
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

const closeDB = (db) => {
  db.close();
};

module.exports = {
  createDBConnection,
  insertFinData,
  deleteAllData,
  getFinList,
  getSumByMonth,
  closeDB,
};

