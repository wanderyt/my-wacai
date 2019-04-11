const chalk = require('chalk');
const log4js = require('log4js');
const logger = log4js.getLogger('wacai');

const logDBError = (operation, sql, error) => {
  console.log(chalk.red(`Database operation: ${operation}`));
  console.log(chalk.red(`Error: ${error}`));

  if (logger) {
    logger.error(`Database operation: ${operation}`);
    logger.error(`Related SQL: ${sql}`);
    logger.error(`Error: ${error}`);
  }
};

const logDBSuccess = (operation, sql) => {
  console.log(chalk.green(`Database operation: ${operation}`));

  if (logger) {
    logger.info(`Database operation: ${operation}`);
    logger.info(`Related SQL: ${sql}`);
  }
};

module.exports = {
  logDBSuccess,
  logDBError,
}
