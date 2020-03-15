const fs = require('fs');
const path = require('path');

const { log } = require('../logger');
const FILES = require('./files');

const readFile = path => {
  try {
    return fs.readFileSync(path);
  } catch (err) {
    log.error(err && err.message);
    throw err;
  }
};

const readPortFile = () => {
  let port = readFile(path.join(path.resolve('data'), FILES.CONFIG.PORT));
  port = port && port.split('\n');
  port = port && port[0];
  port = Number(port);

  return port;
};

exports.readFile = readFile;
exports.readPortFile = readPortFile;
