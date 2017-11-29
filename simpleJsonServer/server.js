const jsonServer  = require('json-server');
const https       = require('https');
const fs          = require('fs');

const server      = jsonServer.create();
const router      = jsonServer.router(require('./route.js')());
const middlewares = jsonServer.defaults();

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

server.use(middlewares);
server.use(router);

https.createServer(options, server).listen(5000, function() {
  console.log("json-server started on port " + 5000);
});
