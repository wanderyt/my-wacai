import path from 'path';

const requireClient = (relativePath) => {
  const modulePath = path.join('../../src/scripts/', relativePath);
  console.log(modulePath);
  return require(modulePath) || {};
  // return import('' + modulePath) || {};
};

const requireModule = (relativePath) => {
  return (async (relativePath) => {
    const modulePath = path.resolve(__dirname, 'src/scripts/', relativePath);
    const importedModule = await import(modulePath);
    return importedModule;
  })(relativePath);
};

export {
  requireClient,
  requireModule,
};
