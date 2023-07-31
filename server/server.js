const express = require('express');

// Logger configuration
require('./logger');

// Dotenv configuration
const dotenv = require('dotenv');
const {dotenvFiles} = require('./config');
dotenvFiles.map((dotenvFile) => {
  dotenv.config({
    path: dotenvFile
  });
});

const app = express();
const port = process.env.API_PORT || 2001;

/**
 * Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
 * This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
 *
 * A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body),
 * or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
 */
app.use(express.json());

// handling keep-live connection during gracefully shutting down
app.use(function (req, res, next) {
  if (global.gracefullyClosing) {
    res.status(503).end();
  } else {
    next();
  }
});

/**
 * Logging system
 */
const {getLogger, getLoggerMiddleware} = require('./modules/logging');
const packageJson = require('../package.json');
const {name: appName, version: appVersion} = packageJson;
const loggerMiddleware = getLoggerMiddleware({appName, appVersion});
app.use(loggerMiddleware);

// Add graphql configuration based on env variable
const {isEnvVarTrue} = require('./helper');
console.log('process.env.IS_GRAPHQL_ENABLED: ', process.env.IS_GRAPHQL_ENABLED);
const isGraphqlEnabled = isEnvVarTrue(process.env.IS_GRAPHQL_ENABLED) || false;
if (isGraphqlEnabled) {
  const {addGraphQLMiddleware} = require('./graphql/server');
  const gqlLogger = getLogger({appName, appVersion}, 'info');
  addGraphQLMiddleware(app, gqlLogger);
}

// define fin operation request path
const {validateTokenMiddleware} = require('./middlewares');
const finRouters = require('./router/finRouter/index');
app.use('/api/wacai/', [validateTokenMiddleware, ...finRouters.router]);

// define user request path
const loginRouters = require('./router/loginRouter/index');
app.use('/api/user', loginRouters.router);

// define file operation request path
const fileRouters = require('./router/fileRouter/index');
app.use('/api/file', fileRouters.router);

// define database operation request path
const dbRouters = require('./router/dbRouter/index');
app.use('/api/db', [validateTokenMiddleware, ...dbRouters.router]);

// define slack operation request path
const slackRouters = require('./router/slackRouter/index');
app.use('/api/slack/', [validateTokenMiddleware, ...slackRouters.router]);

// define my owner testing routers
const workRouters = require('./router/workRouter/index');
app.use('/api/work', workRouters.router);

// define test request path
// const testRouters = require('./router/testRouter/index');
// app.use('/api/test', testRouters.router);

// Add wacai login middleware
// const wacaiMiddleware = require('./wacai/middlewares/index');
// app.use('/api/proxy/wacai', [wacaiMiddleware.wacaiLoginMiddleware, ...wacaiRouters.router]);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

function gracefulShutdown() {
  gracefullyClosing = true;

  const logger = console; // || loggingModule && loggingModule.logger;

  logger.info('Received kill signal, shutting down gracefully');
  server.close(function () {
    logger.info('All connection are closed, server is shutdown');
    process.exit(0);
  });
  setTimeout(function () {
    logger.info('Could not close connection in time, force the shutdown now');
    process.exit(1);
  }, (process.env.GRACEFUL_PERIOD || 10) * 1000);
}

process.on('SIGINT', gracefulShutdown);
