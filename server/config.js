const dotenvFiles = [
  './.env',
  './.env.ins'
];

if (process.env.DB_TEST) {
  dotenvFiles.push('./.env.test');
}

const serverWatchedFiles = [
  'server/**/*.js',
  ...dotenvFiles
];

module.exports = {
  dotenvFiles,
  serverWatchedFiles,
  TOKEN_PATH: './server/token.txt',
  LOG_PATH: './log/wacai/'
};
