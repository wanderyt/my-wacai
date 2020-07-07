const {getUserAccount, getUserList} = require('../login-helper');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

/**
 * Validate user token based on request object cookies
 * @param {object} req
 */
const validateToken = async (req = {}, loggerObj) => {
  const logger = loggerObj || req.logger || console;
  logger.info({message: 'middleware - validate token'});
  const cookies = req.headers.cookie;
  if (!cookies) {
    logger.error({error: 'token validation failed'});
    return false;
  } else {
    const cookiesList = cookies.split(';');
    let tokenCookie = cookiesList.find((cookie) => cookie.indexOf(process.env.REACT_APP_COOKIE_NAME) > -1);
    logger.info({message: 'current cookie: ' + tokenCookie ? tokenCookie.trim() : ''});
    if (!tokenCookie || tokenCookie.split('=').length < 2) {
      logger.error({error: 'token validation failed'});
      return false;
    } else {
      const token = tokenCookie.split('=')[1].trim();
      if (token) {
        let {username, password} = getUserAccount(token);
        // Get user info
        let user = await getUserList(username, password);

        if (user) {
          logger.info({message: 'token validation success'});
          // _userInfo marked userid / username / password
          return {
            userId: user.USERID,
            userName: user.USERNAME,
          };
        } else {
          logger.error({error: 'token validation failed'});
          return false;
        }
      } else {
        logger.error({error: 'token validation failed'});
        return false;
      }
    }
  }
}

/**
 * Token validation middleware
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const validateTokenMiddleware = async (req, res, next) => {
  const validatedUser = await validateToken(req, logger);

  if (!validatedUser) {
    res.statusCode = 401;
    res.send({
      login: false,
      error: 'Token is not found or valid'
    });

    return;
  } else {
    // _userInfo marked userid / username / password
    req._userInfo = validatedUser;

    next();
  }
};

module.exports = {
  validateToken,
  validateTokenMiddleware
};
