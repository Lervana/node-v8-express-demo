const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const { name, log_level } = require('./config');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

class Logger {
  constructor(createLogger = bunyan.createLogger) {
    this.client = createLogger({
      name,
      streams: [
        {
          level: log_level,
          type: 'raw',
          stream: prettyStdOut,
        },
      ],
    });
  }

  log(level, message) {
    this.client[level](message);
  }

  trace(msg) {
    this.log('trace', msg);
  }

  debug(msg) {
    this.log('debug', msg);
  }

  info(msg) {
    this.log('info', msg);
  }

  warn(msg) {
    this.log('warn', msg);
  }

  error(msg) {
    this.log('error', msg);
  }

  fatal(msg) {
    this.log('fatal', msg);
  }
}

const logger = new Logger();

exports.log = logger;
exports.Logger = Logger;
