const defaultPort = 3456;

let logLevel;

switch (process.env.NODE_ENV) {
  case 'development':
    logLevel = 'TRACE';
    break;
  case 'test':
    logLevel = 'FATAL';
    break;
  default:
    logLevel = 'WARN';
    break;
}

module.exports = {
  env: process.env.NODE_ENV,
  name: 'node-express-demo',
  log_level: logLevel,
  host: 'localhost',
  default_port: defaultPort,
  port: defaultPort,
};
