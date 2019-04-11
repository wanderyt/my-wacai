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
    data.map(({id, category, subcategory, money, comment, date}) => {
      let tmpSql =
        `insert into ${TABLE_NAME}(id, category, subcategory, date, comment, money)
        values ("${id}", "${category}", "${subcategory}", "${date}", "${comment}", "${money}");`;
      sql += tmpSql;
    });
  } else {
    id = data.id;
    sql =
      `insert into ${TABLE_NAME}(id, category, subcategory, date, comment, money)
      values ("${data.id}", "${data.category}", "${data.subcategory}", "${data.date}", "${data.comment}", "${data.money}");`;
  }

  db.run(sql, (err) => {
    if (err) {
      logDBError('insert data with id: ' + id, err);
    } else {
      logDBSuccess('insert data with id: ' + id);
    }

    callback && callback(err);
  });
};

const deleteAllData = (db, callback) => {
  let sql = `delete from ${TABLE_NAME};`;
  db.run(sql, (err) => {
    if (err) {
      logDBError('Delete all data in FIN table', err);
    } else {
      logDBSuccess('Delete all data in FIN table');
    }

    callback && callback(err);
  });
}

const getFinList = (db, options, callback) => {
  let sql = `select * from ${TABLE_NAME} order by date desc`;
  if (options) {
    if (options.top) {
      sql += ' limit ' + options.top;
    }
  }

  db.all(sql, (err, rows) => {
    if (err) {
      logDBError('Fetch data in FIN table', err);
    } else {
      logDBSuccess('Fetch data in FIN table');
    }

    callback && callback(err, rows);
  });
}

const closeDB = (db) => {
  db.close();
};

module.exports = {
  createDBConnection,
  insertFinData,
  deleteAllData,
  getFinList,
  closeDB,
};

