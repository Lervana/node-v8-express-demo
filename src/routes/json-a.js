const FILES = require('../files/files');
const filesStorage = require('../files/files-storage');

const fileAGet = (req, res) => {
  const content = filesStorage.getFile(FILES.JSON.A);
  res.json(content && content.data);
};

exports.get = fileAGet;
