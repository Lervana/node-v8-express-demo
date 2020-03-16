const path = require('path');

const FILES = require('../enums/files');
const fm = require('../files/files-manager');
const { wrapJsonRoute } = require('../wrappers/route-wrapper');

const dirPath = path.resolve(FILES.FILES_DIR);

exports.get = wrapJsonRoute(async () => {
  const fileNames = [];
  const files = await fm.getFilesList(dirPath);
  files.forEach(name => name.endsWith('.txt') && fileNames.push({ name }));
  return fileNames;
});
