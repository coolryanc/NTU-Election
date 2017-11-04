const jsonServer  = require('json-server');

const server      = jsonServer.create();
const router      = jsonServer.router(require('./route.js')());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(5000, function () {
  console.log('JSON Server is running: localhost:5000');
  console.log('API: http://localhost:5000/candidates')
});
