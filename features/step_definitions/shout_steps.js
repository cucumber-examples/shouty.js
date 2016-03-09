var assert = require('assert');
var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance) {
    var network = new Network();
    this.lucy = new Person(network);
    this.sean = new Person(network);
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    this.sean.shout(shout);
  });

  this.Then(/^Lucy should receive "([^"]*)"$/, function (shout) {
    if (this.lucy.lastHeardMessage != shout)
      throw new Error("Lucy should have received " + shout + ", but she received: " + this.lucy.lastHeardMessage)
  });

  this.Then(/^Lucy should not receive "([^"]*)"$/, function (shout) {
    if (this.lucy.lastHeardMessage === shout)
      throw new Error("Lucy should not have received \"" + shout + "\"");
  });
};
