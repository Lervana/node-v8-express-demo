let logLevel = process.env.NODE_ENV === 'development' ? 'TRACE' : 'ERROR';

module.exports = {
  env: process.env.NODE_ENV,
  name: 'node-express-demo',
  log_level: logLevel,
  port: 3456,
};
