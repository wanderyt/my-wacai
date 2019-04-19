const getFinListRouter = require('./getFinList');
const getCategoriesRouter = require('./getCategories');

module.exports = {
  router: [
    getFinListRouter.router,
    getCategoriesRouter.router
  ]
};
