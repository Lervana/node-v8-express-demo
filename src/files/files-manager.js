const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const { log } = require('../logger');
const FILES = require('../enums/files');

class FilesManager {
  constructor(customFs = fs) {
    this.fs = customFs;
  }

  async readFileSync(path) {
    try {
      return await fs.readFileSync(path);
    } catch (err) {
      log.error(err && err.message);
      throw err;
    }
  }

  async readFile(path) {
    return await fs.readFileAsync(path);
  }

  async getFileInfo(path) {
    return await fs.statAsync(path);
  }

  async getFileSize(path) {
    return (await this.getFileInfo(path)).size;
  }

  async getFilesList(path) {
    return await fs.readdirAsync(path);
  }

  readPortFileSync() {
    let port = this.readFileSync(path.join(path.resolve('data'), FILES.CONFIG.PORT));
    port = port && port.split('\n');
    port = port && port[0];
    port = Number(port);

    return port;
  }
}

const fm = new FilesManager();

exports.readFile = fm.readFile;
exports.getFileInfo = fm.getFileInfo;
exports.getFileSize = fm.getFileSize;
exports.getFilesList = fm.getFilesList;
exports.readFileSync = fm.readFileSync;
exports.readPortFileSync = fm.readPortFileSync;
