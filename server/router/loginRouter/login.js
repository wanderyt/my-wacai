const express = require('express');
const router = express.Router();
const {generateToken} = require('../../login-helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

router.post('/login', (req, res) => {
  logger.info('api /login');
  let {data} = req.body;
  logger.info('Login user details: ');
  logger.info(JSON.stringify(data));
  if (data.username === process.env.REACT_APP_USERNAME && data.password === process.env.REACT_APP_PASSWORD) {
    logger.info('api /login success');
    res.cookie(process.env.REACT_APP_COOKIE_NAME, generateToken(data.username, data.password));
    res.statusCode = 200;
    res.send({
      status: true
    });
  } else {
    logger.error('api /login failed');
    res.statusCode = 500;
    res.send({
      status: false
    });
  }
});

module.exports = {
  router
};