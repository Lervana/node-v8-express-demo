const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const { log } = require('../logger');
const FILES = require('../enums/files');

class FilesManager {
  constructor(customFs = fs) {
    this.fs = customFs;
  }

  readFileSync(path) {
    try {
      return this.fs.readFileSync(path);
    } catch (err) {
      log.error(err && err.message);
      throw err;
    }
  }

  async readFile(path) {
    return await this.fs.readFileAsync(path);
  }

  async getFileInfo(path) {
    return await this.fs.statAsync(path);
  }

  async getFileSize(path) {
    return (await this.getFileInfo(path)).size;
  }

  async getFilesList(path) {
    return await this.fs.readdirAsync(path);
  }

  readPortFileSync() {
    const portConfigFilePath = path.join(path.resolve('data'), FILES.CONFIG.PORT);
    let port = fs.readFileSync(portConfigFilePath, 'utf8');
    port = port && port.split('\n');
    port = port && port[0];
    port = Number(port);

    return port;
  }
}

const fm = new FilesManager();
module.exports = fm;
