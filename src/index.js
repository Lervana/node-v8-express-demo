const Server = require('./server');
const routes = require('./routes');

const server = new Server();
server.addRoutes(routes);
server.start();
