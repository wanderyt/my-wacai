const {logDBError, logDBSuccess} = require('./util');

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

module.exports = {
  insertFinData,
  deleteAllData,
};

