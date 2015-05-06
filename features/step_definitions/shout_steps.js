var assert = require('assert');
var Shouty = require('../../lib/shouty');

module.exports = function () {
  this.World = function(callback) {
    callback();
    return new Shouty();
  };

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
