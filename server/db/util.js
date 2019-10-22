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
        let dateRange = JSON.parse(searchOptions[key]);
        if (dateRange.minDate && dateRange.maxDate) {
          let dateRangeSearch = `date >= '${dateRange.minDate}' and date <= '${dateRange.maxDate}'`;
          searchQuery.push(dateRangeSearch);
        }
        break;
      case 'amountRanges':
        let amountRanges = JSON.parse(searchOptions[key]);
        if (amountRanges.length > 0) {
          let amountQueries = [];
          amountQueries = amountRanges.map(({minAmount, maxAmount}) => {
            if (+maxAmount === 0) {
              return `(amount >= '${minAmount}')`;
            } else {
              return `(amount >= '${minAmount}' and amount <= '${maxAmount}')`;
            }
          });
          searchQuery.push(amountQueries.join(' or '));
        }
        break;
      case 'category':
        let category = searchOptions[key];
        if (category !== '全部') {
          let categorySearch = `category = '${category}'`;
          searchQuery.push(categorySearch);
        }
        break;
      case 'subcategory':
        let subcategory = searchOptions[key];
        if (subcategory !== '全部') {
          let subcategorySearch = `subcategory = '${subcategory}'`;
          searchQuery.push(subcategorySearch);
        }
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
  return searchQuery.join(' and ') + ' order by date asc';
}

/**
 * uuid
 */
const uuid = () => {
  let s = [];
  let hexDigits = "0123456789ABCDEF";
  for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid;
}

module.exports = {
  logDBSuccess,
  logDBError,
  mapSearchParamsToDBSearch,
  uuid,
}
