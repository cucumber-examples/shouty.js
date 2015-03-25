var Shouty = require('../../lib/shouty');
var Person = Shouty.Person;

module.exports = function () {
  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance, callback) {
    this.sean = new Person();
    this.lucy = new Person();
    callback();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (message, callback) {
    this.sean.shout(message, callback);
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });
};
