const FILES = require('../files/files');
const filesStorage = require('../files/files-storage');

const fileAGet = (req, res) => {
  res.type('text/plain');
  res.send(filesStorage.getFile(FILES.TXT.A));
};

exports.get = fileAGet;
