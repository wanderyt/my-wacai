/**
 * Logger middleware
 *
 * Default exports should include logger object and a middleware to add logger to global request object.
 *
 * Options to build logger object contain:
 * - winston - https://github.com/winstonjs/winston
 * - morgan - https://github.com/expressjs/morgan
 *
 */
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const onFinished = require('on-finished');
const util = require('util');
const os = require('os');

function metaToObj(obj) {
  const result = {};
  if (util.isError(obj)) {
    result.error = `${obj.message}${os.EOL}${obj.stack}`;
  } else if (util.isObject(obj)) {
    for (const k in obj) {
      let v = obj[k];
      if (v) {
        if (util.isObject(v)) {
          v = util.inspect(v, {depth: null});
        }
        result[k] = v;
      }
    }
  }
  return result;
}

function getLogger(loggerMeta, level) {
  const dailyTransport = new DailyRotateFile({
    filename: 'server-%DATE%.log',
    // set pattern as monthly format so a new log file will be generated each month
    datePattern: 'YYYY-MM',
    zippedArchive: true,
    auditFile: './log/wacai/winston-audit.json',
    dirname: './log/wacai/',
    maxSize: '40m',
    maxFiles: '30d'
  }).on('rotate', (oldFileName, newFileName) => {
    console.log('Winston logger is rotating...');
    console.log('oldFileName: ', oldFileName);
    console.log('newFileName: ', newFileName);
  });

  const options = {
    transports: [
      new winston.transports.Console({
        level,
        exitOnError: false,
        json: false,
        formatter: (logEntry) => {
          const {meta, message, level} = logEntry;
          const messageObj = message ? {message} : {};
          const time = new Date().toISOString();
          return JSON.stringify({
            time,
            priority: level.toUpperCase(),
            ...messageObj,
            ...metaToObj(loggerMeta),
            ...metaToObj(meta)
          });
        }
      }),
      dailyTransport
    ]
  };

  return winston.createLogger(options);
}

function getLoggerMiddleware (loggerMeta = {}) {
  return function loggerMiddleware (req, res, next) {
    let logger = getLogger(loggerMeta, 'info');
    req.logger = logger;

    onFinished(res, () => {
      logger.close();
      logger = undefined;
      req.logger = undefined;
    });

    next();
  };
}

module.exports = {
  getLogger,
  getLoggerMiddleware
};
