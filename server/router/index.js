const getFinListRouter = require('./getFinList');
const getCategoriesRouter = require('./getCategories');
const createFinItemRouter = require('./createFinItem');
const updateFinItemRouter = require('./updateFinItem');
const deleteFinItemRouter = require('./deleteFinItem');

module.exports = {
  router: [
    getFinListRouter.router,
    getCategoriesRouter.router,
    createFinItemRouter.router,
    updateFinItemRouter.router,
    deleteFinItemRouter.router,
  ]
};
