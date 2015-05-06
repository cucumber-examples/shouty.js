var assert = require('assert');
var Shouty = require('../../lib/shouty');

module.exports = function () {
  if(process.env.WORLD === 'selenium') {
    this.World = require('./selenium_world').SeleniumWorld;

    var server;
    this.Before(function (callback) {
      var shoutyApp = require('../../lib/shouty_app');
      server = shoutyApp().listen(3000, callback);
    });

    this.After(function (callback) {
      this.closeAll();
      console.log('Closing server...');
      server.close(function () {
        console.log('Closed server!!');
        callback();
      });
    });
  } else {
    this.World = function (callback) {
      callback();
      return new Shouty();
    };
  }

  this.Given(/^"([^"]*)" is at "([^"]*)"$/, function (personName, address, callback) {
    var geoLocation = {
      "Mobilvägen 1"        : [55.7179667,13.226618],
      "Mobilvägen 9"        : [55.7168453,13.225636],
      "Lund Centralstation" : [55.708098,13.1869]
    }[address];
    this.personIsAt(personName, geoLocation, callback);
  });

  this.When(/^"([^"]*)" shouts "([^"]*)"$/, function (personName, message, callback) {
    this.personShouts(personName, message, callback);
  });

  this.Then(/^"([^"]*)" should not hear anything$/, function (personName, callback) {
    this.messagesHeardBy(personName, function (err, actualMessagesHeard) {
      if(err) return callback(err);
      assert.deepEqual(actualMessagesHeard, []);
      callback();
    });
  });

  this.Then(/^"([^"]*)" should hear "([^"]*)"$/, function (personName, expectedMessage, callback) {
    this.messagesHeardBy(personName, function (err, actualMessagesHeard) {
      if(err) return callback(err);
      assert.deepEqual(actualMessagesHeard, [expectedMessage]);
      callback();
    });
  });
};
