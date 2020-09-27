const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {createDBConnection, closeDB} = require('../../db/dbops');
const {getAllTags} = require('../../db/fin/get');
const {requestProxy} = require('../../modules/request');

router.get('/getAllTags', (req, res) => {
  logger.info('api /getAllTags');

  // Get user info
  let user = req._userInfo;

  let db = createDBConnection();
  let getAllTagsPromise = getAllTags(db, user);

  requestProxy(req, res, getAllTagsPromise)
    .then((data) => {
      closeDB(db);
      logger.info('api /getAllTags success');
      res.statusCode = 200;
      const tags = analyzeTags(data.rows);
      res.send({
        status: true,
        data: tags
      });
    }, (err) => {
      closeDB(db);
      logger.error('api /getAllTags failed with error');
      logger.error(err.err);
      res.statusCode = 500;
      res.send({
        status: false,
        error: err.err
      });
    });
});

const analyzeTags = (rows = []) => {
  let tags = [];
  rows.map((row) => {
    let currTags = (row.tags || '').split(',');
    for (const key in currTags) {
      const tag = currTags[key];
      tags.indexOf(tag) < 0 && tags.push(tag);
    }
  });
  return tags;
};

module.exports = {
  router
};