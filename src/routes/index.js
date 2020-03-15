const testRoutes = require('./test');

module.exports = [{ method: 'GET', path: '/test', cbs: testRoutes.get }];
