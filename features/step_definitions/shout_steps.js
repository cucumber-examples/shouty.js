var assert = require('assert');
var Shouty = require('../../lib/shouty');

module.exports = function () {
  var locations = {
    "St John's College" : [51.756073,  -1.25904],
    "Balliol College"   : [51.7550014, -1.2580754],
    "Trafalgar Square"  : [51.508039,  -0.128069]
  };
  var theShout;

  if(process.env.WORLD === 'web') {
    this.World = require('./web_world').WebWorld;

    var server;
    this.Before(function (callback) {
      var shoutyApp = require('../../lib/shouty_app');
      server = shoutyApp().listen(3000, callback);
    });

    this.After(function (callback) {
      server.close(callback);
    });
  } else {
    this.World = function DomainWorld(callback) {
      callback();
      return new Shouty();
    };
  }

  this.Given(/^"([^"]*)" is at "([^"]*)"$/, function (personName, locationName, callback) {
    var location = locations[locationName];
    this.personIsAt(personName, location, callback);
  });

  this.When(/^"([^"]*)" shouts$/, function (personName, callback) {
    theShout = "Anyone there?";
    this.personShouts(personName, theShout, callback);
  });

  this.Then(/^"([^"]*)" hears the shout$/, function (personName, callback) {
    this.messagesHeardBy(personName, function (err, messages) {
      if(err) return callback(err);
      assert.deepEqual(messages, [theShout]);
      callback();
    });
  });

  this.Then(/^"([^"]*)" doesn't hear anything$/, function (personName, callback) {
    this.messagesHeardBy(personName, function (err, messages) {
      if(err) return callback(err);
      assert.deepEqual(messages, []);
      callback();
    });
  });

};
