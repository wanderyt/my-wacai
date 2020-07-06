const {getUserAccount, getUserList} = require('../login-helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

/**
 * Token validation middleware
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const validateTokenMiddleware = async (req, res, next) => {
  logger.info('middleware - validate token');
  const cookies = req.headers.cookie;
  console.log('cookies: ', cookies);
  console.log('typeof cookies: ', typeof cookies);
  if (!cookies) {
    logger.error('token validation failed');
    res.statusCode = 401;
    res.send({
      login: false,
      error: 'Token is not found or valid'
    });

    return;
  } else {
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
        // Get user info
        let user = await getUserList(username, password);

        if (user) {
          logger.info('token validation success');
          // _userInfo marked userid / username / password
          req._userInfo = {
            userId: user.USERID,
            userName: user.USERNAME,
          };

          next();
        } else {
          logger.error('token validation failed');
          res.statusCode = 401;
          res.send({
            login: false,
            error: 'Token is not found or valid'
          });
        }
      } else {
        logger.error('token validation failed');
        res.statusCode = 401;
        res.send({
          login: false,
          error: 'Token is not found or valid'
        });
      }
    }
  }
};

module.exports = {
  validateTokenMiddleware
};
