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

// define test request path
// const testRouters = require('./router/testRouter/index');
// app.use('/api/test', testRouters.router);

// Add wacai login middleware
// const wacaiMiddleware = require('./wacai/middlewares/index');
// app.use('/api/proxy/wacai', [wacaiMiddleware.wacaiLoginMiddleware, ...wacaiRouters.router]);

app.listen(port, () => console.log(`Listening on port ${port}`));
