var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var enableDestroy = require('server-destroy');

var Shouty = require('../shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

function ShoutyServer() {

  var app = express();
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.use(bodyParser.urlencoded({ extended: false }));

  var network = new Network({ shoutLengthLimit: 256, range: 1000 });
  var people = {};

  function getPerson(name, position) {
    if (!people[name]) {
      people[name] = new Person(network, position);
    }
    return people[name];
  }

  app.get('/', function (req, res) {
    var name = req.query.name;
    var position = req.query.position;
    var person = getPerson(name, position);
    res.render(
      'index',
      { name: name, position: position, lastShout: person.lastHeardShout }
    );
  });

  app.post('/shout', function (req, res) {
    var name = req.body.name;
    var position = req.body.position;
    var person = getPerson(name, position);
    person.shout(req.body.message);
    res.redirect('/?name=' + name + '&position=' + position);
  });

  this.start = function (callback) {
    var server = app.listen(1337, function () {
      var address = server.address();
      callback(null, {host: address.address, port: address.port});
    });
    enableDestroy(server);
    this.server = server;
  };

  this.stop = function (callback) {
    this.server.destroy(callback);
  }
}

module.exports = ShoutyServer;
