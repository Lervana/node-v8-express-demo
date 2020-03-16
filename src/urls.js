const config = require('./config');

exports.URLS = Object.freeze({
  FILENAMES: '/filenames',
  SIZE: '/size',
});

exports.getApiUrl = path => {
  const { host, port } = config;
  return `http://${host}:${port}${path}`;
};
