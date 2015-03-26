var Shouty = require("../../lib/shouty");
var Person = Shouty.Person;

module.exports = function () {

  this.Given(/^Lucy and Sean have accounts$/, function (callback) {
    this.lucy = new Person();
    this.sean = new Person();
    callback();
  });

  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance, callback) {
    callback();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (message, callback) {
    this.sean.shout(message, callback);
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });

};
