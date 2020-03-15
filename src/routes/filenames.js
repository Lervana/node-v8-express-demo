const path = require('path');

const fm = require('../files/files-manager');
const { wrapJsonRoute } = require('../wrappers/route-wrapper');

const dirPath = path.resolve('data/files');

exports.get = wrapJsonRoute(async () => {
  return (await fm.getFilesList(dirPath)).map(name => ({ name }));
});
