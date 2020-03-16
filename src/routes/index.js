const testRoutes = require('./test');
const fileRoutes = require('./file');
const fileARoutes = require('./file-a');
const fileBRoutes = require('./file-b');
const filenamesRoutes = require('./filenames');
const jsonARoutes = require('./json-a');
const jsonBRoutes = require('./json-b');
const sizeRoutes = require('./size');
const sizesRoutes = require('./sizes');
const txtRoutes = require('./txt');
const stringsRoutes = require('./strings');

module.exports = [
  { method: 'GET', path: '/test', cbs: testRoutes.get },
  { method: 'GET', path: '/file', cbs: fileRoutes.get },
  { method: 'GET', path: '/file-a', cbs: fileARoutes.get },
  { method: 'GET', path: '/file-b', cbs: fileBRoutes.get },
  { method: 'GET', path: '/filenames', cbs: filenamesRoutes.get },
  { method: 'GET', path: '/json-a', cbs: jsonARoutes.get },
  { method: 'GET', path: '/json-b', cbs: jsonBRoutes.get },
  { method: 'GET', path: '/size', cbs: sizeRoutes.get },
  { method: 'GET', path: '/sizes', cbs: sizesRoutes.get },
  { method: 'GET', path: '/txt', cbs: txtRoutes.get },
  { method: 'GET', path: '/strings', cbs: stringsRoutes.get },
];
