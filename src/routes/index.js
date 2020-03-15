const testRoutes = require('./test');
const fileARoutes = require('./file-a');

module.exports = [
  { method: 'GET', path: '/test', cbs: testRoutes.get },
  { method: 'GET', path: '/file-a', cbs: fileARoutes.get },
];
