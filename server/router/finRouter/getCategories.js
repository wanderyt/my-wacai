const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB, getCategoryGroup} = require('../../db/dao');

router.get('/getCategoryGroup', (req, res) => {
  logger.info('api /getCategoryGroup');
  let db = createDBConnection();
  let getCategoryGroupPromise = getCategoryGroup(db);
  getCategoryGroupPromise
    .then((data) => {
      closeDB(db);
      if (data.err) {
        logger.error('api /getCategoryGroup failed with error');
        logger.error(data.err);
        res.statusCode = 500;
        res.send({
          status: false,
          error: data.err
        });
      } else {
        logger.info('api /getCategoryGroup success');
        res.statusCode = 200;
        let categoryGroups = formatCategoryGroups(data.rows);
        res.send({
          status: true,
          data: categoryGroups
        });
      }
    })
});

const formatCategoryGroups = (rows = []) => {
  if (rows.length < 0) {
    return {};
  }

  let categoryList = {};

  rows.forEach((item) => {
    if (categoryList[item.category]) {
      categoryList[item.category].push({
        subcategory: item.subcategory,
        isCommon: item.is_common
      });
    } else {
      categoryList[item.category] = [{
        subcategory: item.subcategory,
        isCommon: item.is_common
      }];
    }
  });

  return categoryList;
};

module.exports = {
  router
};