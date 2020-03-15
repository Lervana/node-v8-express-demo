const defaultPort = 3456;

module.exports = {
  env: process.env.NODE_ENV,
  name: 'node-express-demo',
  log_level: process.env.NODE_ENV === 'development' ? 'TRACE' : 'WARN',
  host: 'localhost',
  defaultPort: defaultPort,
  port: defaultPort,
};
