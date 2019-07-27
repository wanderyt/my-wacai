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

/**
 * Build sql query string based on search options
 * Search options: dateRange, amountRange, category, subcategory, keyword
 * @param {object} searchOptions - Search Option Values
 * @returns {string} search query in sql
 */
const mapSearchParamsToDBSearch = (searchOptions) => {
  let searchQuery = [];
  Object.keys(searchOptions).map((key) => {
    switch (key) {
      case 'dateRange':
        let dateRange = searchOptions[key];
        let dateRangeSearch = `date >= '${dateRange.minDate}' and date <= '${dateRange.maxDate}'`;
        searchQuery.push(dateRangeSearch);
        break;
      case 'amountRange':
        let amountRange = searchOptions[key];
        let amountRangeSearch = `amount >= '${amountRange.minAmount}' and amount <= '${amountRange.maxAmount}'`;
        searchQuery.push(amountRangeSearch);
        break;
      case 'category':
        let category = searchOptions[key];
        let categorySearch = `category = '${category}'`;
        searchQuery.push(categorySearch);
        break;
      case 'subcategory':
        let subcategory = searchOptions[key];
        let subcategorySearch = `subcategory = '${subcategory}'`;
        searchQuery.push(subcategorySearch);
        break;
      case 'keyword':
        let keyword = searchOptions[key];
        let keywordSearch = `(category like '%${keyword}%' or subcategory like '%${keyword}%' or comment like '%${keyword}%')`;
        searchQuery.push(keywordSearch);
        break;
      default:
        break;
    }
  })
  return searchQuery.join(' and ');
}

module.exports = {
  logDBSuccess,
  logDBError,
  mapSearchParamsToDBSearch,
}
