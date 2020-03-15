const CODES = require('../enums/codes');
const { env } = require('../config');
const { log } = require('../logger');
const { errorResponse } = require('./response');

const handleCustomError = error => ({
  status: error.code,
  log: error.log,
  send: errorResponse(error.code, error.errors),
  type: 'CustomError',
});

module.exports = (error, res, isJson) => {
  // eslint-disable-next-line no-console
  if (env === 'development') console.log(error);

  let result = {
    status: CODES.INTERNAL_SERVER_ERROR,
    log: error && error.message ? error.message : error,
  };

  //Specific errors handlers should go here
  if (error && error.code) result = handleCustomError(error);

  log.error(result.log);
  res.status(result.status);
  res[isJson ? 'json' : 'send'](result.send);
};
