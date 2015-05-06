var shoutyApp = require('./lib/shouty_app');
var port = 3000;
var server = shoutyApp().listen(port, function (err) {
  if(err) throw(err);
  console.log('Shouty listening at http://localhost:%s', port);
});
