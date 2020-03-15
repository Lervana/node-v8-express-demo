const CODES = require('../enums/codes');
const { env } = require('../config');
const { log } = require('../logger');

module.exports = (error, res) => {
  // eslint-disable-next-line no-console
  if (env === 'development') console.log(error);

  let result = {
    status: CODES.INTERNAL_SERVER_ERROR,
    log: error && error.message ? error.message : error,
  };

  //Specific errors handlers should go here

  log.error(result.log);
  res.status(result.status);
  res.json(result.send);
};
