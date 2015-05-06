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
      shouty.personIsAt(personName, location);
    }

    res.render('index', {
      personName: personName,
      messages: shouty.messagesHeardBy(req.params.personName)
    });
  });

  app.post('/messages', function (req, res) {
    shouty.personShouts(req.body.personName, req.body.message);
    res.redirect(req.get('Referer'));
  });

  return app;
};
