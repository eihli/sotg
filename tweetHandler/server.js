var express = require('express');

var app = express(),
  server, 
  PORT = 6000;  //default port

require('./config/middleware.js')(app, express);

module.exports = function(port) {
  console.log('Tweet Handler listening on port ', (port || PORT));
  server = app.listen(port || PORT); 
  return server;
};

module.exports();
