const testRoutes = require('./test');
const fileARoutes = require('./file-a');
const fileBRoutes = require('./file-b');
const jsonARoutes = require('./json-a');
const jsonBRoutes = require('./json-b');

module.exports = [
  { method: 'GET', path: '/test', cbs: testRoutes.get },
  { method: 'GET', path: '/file-a', cbs: fileARoutes.get },
  { method: 'GET', path: '/file-b', cbs: fileBRoutes.get },
  { method: 'GET', path: '/json-a', cbs: jsonARoutes.get },
  { method: 'GET', path: '/json-b', cbs: jsonBRoutes.get },
];
