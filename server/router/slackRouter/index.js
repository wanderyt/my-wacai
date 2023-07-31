const createMemoRouter = require('./createMemo');
const getMemoRouter = require('./getMemo');

module.exports = {
  router: [
    createMemoRouter.router,
    getMemoRouter.router
  ]
};
