var assert = require('assert');
var Shouty = require('../../lib/shouty');

module.exports = function () {
  this.World = function(callback) {
    callback();
    return new Shouty();
  };

  this.Given(/^"([^"]*)" is in "([^"]*)"$/, function (person, address, callback) {
    var location = {
      "Mobilvägen 1"        : [55.7143279,13.1888218],
      "Lund Centralstation" : [55.708,13.1869]
    }[address];
    this.personIsIn(person, location, callback);
  });

  this.When(/^"([^"]*)" shouts "([^"]*)"$/, function (person, message, callback) {
    this.personShouts(person, message, callback);
  });

  this.Then(/^Alice should not hear anything$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
