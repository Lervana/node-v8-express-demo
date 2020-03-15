const FILES = require('../files/files');
const filesStorage = require('../files/files-storage');

exports.get = (req, res) => {
  const content = filesStorage.getFile(FILES.JSON.A);
  res.json(content && content.data);
};
