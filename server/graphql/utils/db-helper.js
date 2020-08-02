const {createDBConnection, closeDB} = require('../../db/dbops');

/**
 * Provide DB connection object for related DB operation function.
 * @param {Function} operation - The db operation function about to be executed
 * @param {object} options - options operation needed
 * @param {Function} callback - default callback for db operation
 */
const finDBOperationWrapper = (operation = () => void 0, options, callback = () => void 0) => {
  const db = createDBConnection();
  return operation(db, options, callback).then((response) => {
    closeDB(db);

    // console.log("response: ", response);
    return response;
  }, (error) => {
    closeDB(db);

    // console.log("error: ", error);
    return error;
  });
};

module.exports = {
  finDBOperationWrapper
};
