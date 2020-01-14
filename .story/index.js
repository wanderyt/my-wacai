const crossSpawn = require('react-dev-utils/crossSpawn');
const path = require('path');
const chalk = require('chalk');

console.log(`${chalk.green('Storybook configuration folder: ')}${path.join(__dirname)}`);

const result = crossSpawn.sync(
  'start-storybook',
  [
    '-p',
    '6006',
    '-c',
    `${__dirname}`
  ],
  {stdio: 'inherit'}
);
