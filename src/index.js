require('./files');

const Server = require('./server');
const routes = require('./routes');

const server = new Server();
server.addRoutesSync(routes);
server.start();
