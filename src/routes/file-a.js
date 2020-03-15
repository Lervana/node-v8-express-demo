const FILES = require('../files/files');
const filesStorage = require('../files/files-storage');

exports.get = (req, res) => {
  res.type('text/plain');
  res.send(filesStorage.getFile(FILES.TXT.A));
};
