const getFinListRouter = require('./getFinList');
const getCategoriesRouter = require('./getCategories');
const createFinItemRouter = require('./createFinItem');
const updateFinItemRouter = require('./updateFinItem');
const deleteFinItemRouter = require('./deleteFinItem');
const getHistoryExpenseRouter = require('./getHistoryExpense');
const getFinItemsByMonthRouter = require('./getFinItemsByMonth');
const getFinTemplatesRouter = require('./getFinTemplates');
const createFinTemplateRouter = require('./createFinTemplate');
const getAllCommentRouter = require('./getAllComment');
const getAllTagsRouter = require('./getAllTags');
const getAllCitiesRouter = require('./getAllCities');
const searchFinItemsRouter = require('./searchFinItems');
const deepSearchFinItemsRouter = require('./deepSearchFinItems');

module.exports = {
  router: [
    getFinListRouter.router,
    getCategoriesRouter.router,
    createFinItemRouter.router,
    updateFinItemRouter.router,
    deleteFinItemRouter.router,
    getHistoryExpenseRouter.router,
    getFinItemsByMonthRouter.router,
    getFinTemplatesRouter.router,
    createFinTemplateRouter.router,
    getAllCitiesRouter.router,
    getAllCommentRouter.router,
    getAllTagsRouter.router,
    searchFinItemsRouter.router,
    deepSearchFinItemsRouter.router,
  ]
};
