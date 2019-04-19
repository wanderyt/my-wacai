const log4js = require('log4js');

const padZero = (day) => {
  if (day < 10) {
    return `0${day}`;
  } else {
    return `${day}`;
  }
};

const formatDate = (date = new Date()) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
};

const now = formatDate(new Date());
const LOG_PATH = './log/wacai/';
const logName = LOG_PATH + `${process.env.DB_TEST ? 'test-' : ''}server-debug-` + now + '.log';
console.log('logName: ', logName);

log4js.configure({
  "appenders": {
    "wacai": {
      "type": "file",
      "filename": logName
    }
  },
  "categories": {
    "default": {
      "appenders": ["wacai"],
      "level": "DEBUG"
    }
  }
});

// Get logger object
// const log4js = require('log4js');
// const logger = log4js.getLogger('wacai');