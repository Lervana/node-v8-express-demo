const path = require('path');

const fm = require('../files/files-manager');
const FILES = require('../enums/files');
const { wrapRoute } = require('../wrappers/route-wrapper');

const dirPath = path.resolve(FILES.FILES_DIR);

exports.get = wrapRoute(async (req, res) => {
  res.type('text/plain');

  const fileNames = [];
  (await fm.getFilesList(FILES.FILES_DIR)).forEach(name => name.endsWith('.txt') && fileNames.push(name));

  const promises = [];
  fileNames.forEach(name => promises.push(fm.readFile(path.join(dirPath, name))));
  return (await Promise.all(promises)).join('');
});
