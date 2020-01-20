const loginRouter = require('./login');
const logoutRouter = require('./logout');
const validateTokenRouter = require('./validateToken');

module.exports = {
  router: [
    loginRouter.router,
    logoutRouter.router,
    validateTokenRouter.router,
  ]
};
