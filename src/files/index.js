const path = require('path');

const { readFile } = require('./files-manager');
const filesStorage = require('./files-storage');
const FILES = require('./files');

const filesPath = path.resolve('data');

filesStorage.addFile(FILES.TXT.A, readFile(path.join(filesPath, FILES.TXT.A)));
