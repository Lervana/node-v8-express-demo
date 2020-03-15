require('colors');

var fs = require('fs');
const _ = require('lodash');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const { env, defaultPort } = require('./config');
const { log } = require('./logger');

class Server {
  constructor() {
    log.info('Creating server instance');
    this.port = defaultPort;
    this.instance = express();
    this.instance.use(helmet());
    this.instance.use(cors());
    this.instance.use(bodyParser.json({ limit: '1mb' }));
    this.instance.disable('x-powered-by');
    this.configure();
  }

  configure() {
    try {
      let data = fs.readFileSync('./data/port.txt', 'utf8');
      data = data && data.trim();

      if (_.isNumber(data)) this.port = Number(data);
      else log.warn('Invalid value in /data/port.txt, using default port');
    } catch (e) {
      log.info('Port file config not found, using default port');
    }
  }

  start() {
    log.info(`Starting server on environment ${(env || 'production').yellow}`);
    log.info(`API port ${(this.port && this.port.toString()).yellow}`);
    log.info('Starting...');

    this.instance.listen(this.port, (err, result) => {
      if (err) log.error('Unable to start server:' + err);
      else if (!_.isNil(result)) log.trace(result);
      else log.info('UP'.green);

      // eslint-disable-next-line no-console
      if (env !== 'development') console.log(`Application is up on port ${this.port}`);
    });
  }
}

module.exports = Server;
