const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000; // take the port from environmental var or assign 5000

const server = http.createServer(app);

server.listen(port);
