const path = require('path');

const { wrapRoute } = require('../wrappers/route-wrapper');
const FILES = require('../enums/files');
const fm = require('../files/files-manager');

const filePath = path.join(path.resolve('data'), FILES.TXT.B);

exports.get = wrapRoute(async (req, res) => {
  res.type('text/plain');
  return await fm.readFile(filePath);
});
