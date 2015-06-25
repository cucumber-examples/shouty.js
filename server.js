var ShoutyServer = require('./lib/shouty/server');

var server = new ShoutyServer();
server.start(function (err, address) {
  console.log('Shouty listening at http://%s:%s', address.host, address.port);
});
