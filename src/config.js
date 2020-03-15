let logLevel = process.env.NODE_ENV === 'development' ? 'TRACE' : 'WARN';

module.exports = {
  env: process.env.NODE_ENV,
  name: 'node-express-demo',
  log_level: logLevel,
  defaultPort: 3456,
};
