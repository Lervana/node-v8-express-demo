const FILES = require('../enums/files');
const { wrapJsonRoute } = require('../wrappers/route-wrapper');
const { filesStorage } = require('../files/files-storage');

exports.get = wrapJsonRoute(() => {
  const result = filesStorage.getFileSync(FILES.JSON.A);
  return result && result.data;
});
