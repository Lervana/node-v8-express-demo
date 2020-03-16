const path = require('path');

const fm = require('../files/files-manager');
const { wrapRoute } = require('../wrappers/route-wrapper');

exports.get = wrapRoute(async (req, res) => {
  const { name } = req.query;
  const filePath = path.join(path.resolve('data/files'), name + '.txt');

  res.type('text/plain');
  return await fm.readFile(filePath);
});
