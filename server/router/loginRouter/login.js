const express = require('express');
const router = express.Router();
const {generateToken, getUserList} = require('../../login-helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const COOKIE_MAX_AGE = 6 * 30 * 24 * 60 * 60 * 1000; // half year (milliseconds)

router.post('/login', async (req, res) => {
  logger.info('api /login');
  let {data} = req.body;
  logger.info('Login user details: ');
  logger.info(JSON.stringify(data));
  let {username, password} = data;
  let user = await getUserList(username, password);
  if (user) {
    logger.info('api /login success');
    res.cookie(process.env.REACT_APP_COOKIE_NAME, generateToken(data.username, data.password), {maxAge: COOKIE_MAX_AGE, httpOnly: true, sameSite: 'Strict'});
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