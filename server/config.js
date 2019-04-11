const dotenvFiles = [
  './.env',
  './.env.ins'
];

const serverWatchedFiles = [
  'server/**/*.js',
  ...dotenvFiles
];

module.exports = {
  dotenvFiles,
  serverWatchedFiles,
  TOKEN_PATH: './server/wacai/token.txt',
  LOG_PATH: './log/wacai/'
};
