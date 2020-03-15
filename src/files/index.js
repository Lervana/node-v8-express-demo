const path = require('path');

const fm = require('./files-manager');
const filesStorage = require('./files-storage');
const FILES = require('../enums/files');

const filesPath = path.resolve('data');

filesStorage.addFileSync(FILES.TXT.A, fm.readFileSync(path.join(filesPath, FILES.TXT.A)));
filesStorage.addFileSync(FILES.JSON.A, require(path.join(filesPath, FILES.JSON.A)));
