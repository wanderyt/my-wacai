const loginRouter = require('./login');
const validateTokenRouter = require('./validateToken');

module.exports = {
  router: [
    loginRouter.router,
    validateTokenRouter.router,
  ]
};
