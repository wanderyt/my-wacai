const express = require('express');
const router = express.Router();
const {getUserAccount} = require('../../login-helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

router.get('/validateToken', (req, res) => {
  logger.info('api - /validateToken');
  const cookies = req.headers.cookie;
  const cookiesList = cookies.split(';');
  let tokenCookie = cookiesList.find((cookie) => cookie.indexOf(process.env.REACT_APP_COOKIE_NAME) > -1);
  logger.info('current cookie: ');
  logger.info(tokenCookie ? tokenCookie.trim() : '');
  if (!tokenCookie || tokenCookie.split('=').length < 2) {
    logger.error('token validation failed');
    res.statusCode = 401;
    res.send({
      login: false,
      error: 'Token is not found or valid'
    });
  } else {
    const token = tokenCookie.split('=')[1].trim();
    if (token) {
      let {username, password} = getUserAccount(token);
      if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        logger.info('api token validation success');
        res.statusCode = 200;
        res.send({
          status: true
        });
      } else {
        logger.error('api token validation failed');
        res.statusCode = 401;
        res.send({
          login: false,
          error: 'Token is not found or valid'
        });
      }
    } else {
      logger.error('api token validation failed');
      res.statusCode = 401;
      res.send({
        login: false,
        error: 'Token is not found or valid'
      });
    }
  }
});

module.exports = {
  router
};
