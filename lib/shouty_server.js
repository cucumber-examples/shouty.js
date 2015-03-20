var path = require('path');
var enableDestroy = require('server-destroy');
var express = require('express');
var bodyParser = require('body-parser')
var Shouty = require('./shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

function ShoutyServer() {
  var server;
  var network = new Network();
  var people = {};

  var app = express();
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.use(bodyParser.urlencoded({ extended: false }));

  function getPerson(name, position) {
    if (!position) position = 0;
    if (!people[name]) {
      people[name] = new Person(network, position);
    }
    return people[name];
  }

  app.get('/', function (req, res) {
    var person = getPerson(req.query.name, req.query.position);
    res.render('index', { name: req.query.name, position: person.position, messages: person.heardMessages });
  });

  app.post('/shout', function (req, res) {
    var name = req.body.name;
    var position = req.body.position;
    var person = getPerson(name, position);
    person.shout(req.body.message);
    res.redirect('/?name=' + name + '&position=' + position);
  });

  this.start = function (callback) {
    server = app.listen(1337, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Shouty listening at http://%s:%s', host, port);
      callback();
    });
    enableDestroy(server);
  };

  this.stop = function (callback) {
    server.destroy(callback);
  }
}

module.exports = ShoutyServer;
