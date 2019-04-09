const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const {serverWatchedFiles} = require('./server/config');

const watch = () => {
  return gulp.watch(serverWatchedFiles, startServer);
};

const startServer = () => {
  return nodemon({
    script: 'server/server.js',
    // Use watch instead of ignore: ignore: ['src/*']
    // Only watch server side code change
    // .env could also be watched via this option
    // https://github.com/JacksonGariety/gulp-nodemon/issues/24#issuecomment-42739389
    watch: serverWatchedFiles
  });
};

const watchAndStart = gulp.parallel(watch, startServer);

module.exports = {
  watchAndStart,
  startServer
};
