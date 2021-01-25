const path = require('path');
const backupDataFolder = 'backupData';
const dataFileGitPath = path.join(process.cwd(), backupDataFolder);
const git = require('simple-git');

const fs = require('fs');

console.info('Start to sync production data to local:');
console.info('Git pull:');
const dbFileName = process.env.DB_TEST ? 'test' : 'wacai';
git(dataFileGitPath)
  .pull()
  .then(() => {
    console.info('Copy file to local...');
    console.log(process.cwd());
    fs.copyFileSync(`./${backupDataFolder}/${dbFileName}.db`, `./${dbFileName}.db`);
    console.info('Copy file to local done.');
  });