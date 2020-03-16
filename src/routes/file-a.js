const FILES = require('../enums/files');
const { wrapRoute } = require('../wrappers/route-wrapper');
const { filesStorage } = require('../files/files-storage');

exports.get = wrapRoute((req, res) => {
  res.type('text/plain');
  return filesStorage.getFileSync(FILES.TXT.A);
});
