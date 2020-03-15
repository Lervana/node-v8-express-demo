const CODES = require('../enums/codes');
const handleError = require('../helpers/error-handler');

const wrapRoute = (cb, isJson = false) => {
  return async (req, res) => {
    try {
      const response = await cb(req, res);
      res.status(CODES.SUCCESS);
      res[isJson ? 'json' : 'send'](response);
    } catch (error) {
      handleError(error, res, isJson);
    }
  };
};

exports.wrapRoute = cb => wrapRoute(cb);
exports.wrapJsonRoute = cb => wrapRoute(cb, true);
