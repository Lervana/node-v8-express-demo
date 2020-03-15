const path = require('path');

const { readFileSync } = require('./files-manager');
const filesStorage = require('./files-storage');
const FILES = require('./files');

const filesPath = path.resolve('data');

filesStorage.addFile(FILES.TXT.A, readFileSync(path.join(filesPath, FILES.TXT.A)));
filesStorage.addFile(FILES.JSON.A, require(path.join(filesPath, FILES.JSON.A)));
