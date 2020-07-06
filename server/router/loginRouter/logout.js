const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');
const {getCommonLogMeta} = require('../../modules/request');

router.post('/logout', (req, res) => {
  logger.info('api /logout');

  const serverLogger = req.logger || console;
  const logMeta = getCommonLogMeta(req);
  serverLogger.info({
    status: 301,
    ...logMeta
  });

  res.cookie(process.env.REACT_APP_COOKIE_NAME, '', {maxAge: new Date(0)});
  res.redirect(301, '/');
});

module.exports = {
  router
};