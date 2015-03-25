var Shouty = require('../../lib/shouty');
var Person = Shouty.Person;

module.exports = function () {
  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance, callback) {
    var sean = new Person();
    var lucy = new Person();
    callback();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });
};
