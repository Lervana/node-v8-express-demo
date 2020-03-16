require('colors');

const _ = require('lodash');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const fm = require('./files/files-manager');
const { log } = require('./logger');

const { env, defaultPort } = config;

class Server {
  constructor() {
    log.info('Creating server instance');
    this.port = defaultPort;
    this.instance = express();
    this.instance.use(helmet());
    this.instance.use(cors());
    this.instance.use(bodyParser.json({ limit: '1mb' }));
    this.instance.disable('x-powered-by');
    this.configureSync();
  }

  configureSync() {
    try {
      const port = fm.readPortFileSync();
      if (!_.isNaN(port)) {
        this.port = port;
        config.port = port;
      } else log.warn('Invalid value in /data/port.txt, using default port');
    } catch (err) {
      log.warn(`Port file config not found, using default port (${err})`);
    }
  }

  addRoutesSync(routes) {
    routes.forEach(({ method, path, cbs }) => {
      log.info(`Adding route: ${`[${method}] ${path}`.yellow}`);
      if (method && path && cbs) this.instance[method.toLowerCase()](path, cbs);
      else throw new Error('Route need to have defined method, path and callbacks');
    });
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
