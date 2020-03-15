const path = require('path');

const fm = require('../files/files-manager');
const { wrapJsonRoute } = require('../wrappers/route-wrapper');

exports.get = wrapJsonRoute(async req => {
  const { name } = req.query;
  const filePath = path.join(path.resolve('data/files'), name.endsWith('.txt') ? name : name + '.txt');
  return { size: await fm.getFileSize(filePath) };
});
