const getFinListRouter = require('./getFinList');
const getCategoriesRouter = require('./getCategories');
const createFinItemRouter = require('./createFinItem');
const updateFinItemRouter = require('./updateFinItem');
const deleteFinItemRouter = require('./deleteFinItem');
const getHistoryExpenseRouter = require('./getHistoryExpense');
const getFinItemsByMonthRouter = require('./getFinItemsByMonth');

module.exports = {
  router: [
    getFinListRouter.router,
    getCategoriesRouter.router,
    createFinItemRouter.router,
    updateFinItemRouter.router,
    deleteFinItemRouter.router,
    getHistoryExpenseRouter.router,
    getFinItemsByMonthRouter.router,
  ]
};
