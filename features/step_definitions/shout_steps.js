var assert = require('assert');
var Shouty = require('../../lib/shouty');

module.exports = function () {
  this.World = function(callback) {
    callback();
    return new Shouty();
  };

  this.Given(/^Joanne is (\d+) km away from Fred$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^Fred shouts$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^Joanne does not hear Fred's message$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

};
