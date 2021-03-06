const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getCategoryGroup} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/getCategoryGroup', (req, res) => {
  logger.info('api /getCategoryGroup');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getCategoryGroupPromise = getCategoryGroup(db, user);

  requestProxy(req, res, getCategoryGroupPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /getCategoryGroup success');
      res.statusCode = 200;
      let categoryGroups = formatCategoryGroups(data.rows);
      res.send({
        status: true,
        data: categoryGroups
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getCategoryGroup failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
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