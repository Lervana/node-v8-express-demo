const path = require('path');

const fm = require('../files/files-manager');
const CODE = require('../enums/codes');
const { wrapRoute } = require('../helpers/route-wrapper');
const { errorResponse } = require('../helpers/response');

exports.get = wrapRoute(async (req, res) => {
  const { name } = req.query;
  const filePath = path.join(path.resolve('data/files'), name + '.txt');

  res.type('text/plain');

  try {
    return await fm.readFile(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw errorResponse(CODE.NOT_FOUND, [{ code: CODE.NOT_FOUND_FILE, msg: 'File not found' }]);
    } else throw err;
  }
});
