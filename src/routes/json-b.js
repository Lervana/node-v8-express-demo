const path = require('path');

const FILES = require('../enums/files');
const fm = require('../files/files-manager');
const { wrapJsonRoute } = require('../helpers/route-wrapper');

const filePath = path.join(path.resolve('data'), FILES.JSON.B);

exports.get = wrapJsonRoute(async () => {
  let content = await fm.readFile(filePath);
  content = JSON.parse(content);
  return content && content.data;
});
