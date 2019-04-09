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
  serverWatchedFiles
};
