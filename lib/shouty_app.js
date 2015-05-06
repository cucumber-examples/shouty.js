var express = require('express');
var bodyParser = require('body-parser');
var Shouty = require('./shouty');

module.exports = function() {
  var shouty = new Shouty();

  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('view engine', 'jade');

  app.get('/people/:personName', function (req, res) {
    var personName = req.params.personName;
    var lat = req.query.lat;
    var lon = req.query.lon;
    if(lat && lon) {
      var location = [parseFloat(lat), parseFloat(lon)];
      // TODO: Use waterfall here - and capture the error
      shouty.personIsAt(personName, location, function() {});
    }

    shouty.messagesHeardBy(req.params.personName, function (err, messages) {
      if(err) console.error(err.stack); // TODO: 500??
      res.render('index', {
        personName: personName,
        messages: messages
      });
    });
  });

  app.post('/messages', function (req, res) {
    shouty.personShouts(req.body.personName, req.body.message, function (err) {
      if(err) console.error(err.stack); // TODO: 500??
      res.redirect(req.get('Referer'));
    });
  });

  return app;
};
