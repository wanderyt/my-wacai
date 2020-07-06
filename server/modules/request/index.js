/**
 * Customized request.
 *
 * There should be two kinds of request handlers.
 * - **requestProxy**: Accept a promise list, which contains a series of promises - predefined requests
 * - [TODO] Accept an option object to define customized request
 *
 * Custmized request handler could use existing `req.logger` to log request message.
 */
const path = require('path');
const packageJson = require(`${process.cwd()}${path.sep}package.json`);
const {name: appName, version: appVersion} = packageJson;
console.log(`name: ${appName}, version: ${appVersion}`);

const getCommonLogMeta = function (req) {
  return {
    dateStamp: new Date().toISOString(),
    name: appName,
    version: appVersion,
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'] || '',
    ip: req.ip
  };
};

const requestProxy = function (req, res, ...promises) {
  const logger = req.logger || console;
  const headers = req.headers || [];

  const commonLogMeta = {
    dateStamp: new Date().toISOString(),
    name: appName,
    version: appVersion,
    method: req.method,
    url: req.url,
    userAgent: headers['user-agent'] || '',
    ip: req.ip
  };

  if (promises.length > 0) {
    return Promise.all(promises)
      .then((responses) => {
        logger.info({
          ...commonLogMeta,
          status: 200
        });
        return responses;
      }, (error) => {
        logger.error({
          ...commonLogMeta,
          status: 500,
          error
        });
        return error;
      });
  }
  return new Promise((res, rej) => {
    logger.error({
      ...commonLogMeta,
      status: 500,
      error: 'No requests are set'
    });
    rej({
      error: 'No requests are set'
    });
  });
};

module.exports = {
  getCommonLogMeta,
  requestProxy,
};
