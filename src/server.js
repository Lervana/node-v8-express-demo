require('colors');

const _ = require('lodash');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const { env, port } = require('./config');
const { log } = require('./logger');

class Server {
  constructor() {
    log.info('Creating server instance');
    this.instance = express();
    this.instance.use(helmet());
    this.instance.use(cors());
    this.instance.use(bodyParser.json({ limit: '1mb' }));
    this.instance.disable('x-powered-by');
  }

  start() {
    log.info(`Starting server on environment ${(env || 'production').yellow}`);
    log.info(`API port ${(port && port.toString()).yellow}`);
    log.info('Starting...');

    this.instance.listen(port, (err, result) => {
      if (err) log.error('Unable to start server:' + err);
      else if (!_.isNil(result)) log.trace(result);
      else log.info('UP'.green);

      // eslint-disable-next-line no-console
      console.log(`Application is up on port ${port}`);
    });
  }
}

module.exports = Server;
