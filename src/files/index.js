const path = require('path');

const fm = require('./files-manager');
const FILES = require('../enums/files');
const { filesStorage } = require('./files-storage');

const filesPath = path.resolve(FILES.DATA_DIR);

filesStorage.addFileSync(FILES.TXT.A, fm.readFileSync(path.join(filesPath, FILES.TXT.A)));
filesStorage.addFileSync(FILES.JSON.A, require(path.join(filesPath, FILES.JSON.A)));
