const testRoutes = require('./test');
const fileRoutes = require('./file');
const fileARoutes = require('./file-a');
const fileBRoutes = require('./file-b');
const jsonARoutes = require('./json-a');
const jsonBRoutes = require('./json-b');
const sizeRoutes = require('./size');

module.exports = [
  { method: 'GET', path: '/test', cbs: testRoutes.get },
  { method: 'GET', path: '/file', cbs: fileRoutes.get },
  { method: 'GET', path: '/file-a', cbs: fileARoutes.get },
  { method: 'GET', path: '/file-b', cbs: fileBRoutes.get },
  { method: 'GET', path: '/json-a', cbs: jsonARoutes.get },
  { method: 'GET', path: '/json-b', cbs: jsonBRoutes.get },
  { method: 'GET', path: '/size', cbs: sizeRoutes.get },
];
