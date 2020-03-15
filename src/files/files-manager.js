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
      return fs.readFileSync(path);
    } catch (err) {
      log.error(err && err.message);
      throw err;
    }
  }

  readFile(path) {
    return fs.readFileAsync(path);
  }

  getFileInfo(path) {
    return fs.statAsync(path);
  }

  async getFileSize(path) {
    return (await this.getFileInfo(path)).size;
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
exports.readFileSync = fm.readFileSync;
exports.readPortFileSync = fm.readPortFileSync;
