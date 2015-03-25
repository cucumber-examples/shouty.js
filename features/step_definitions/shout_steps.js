var chai = require('chai');
var expect = chai.expect;

var Shouty = require('../../lib/shouty');
var Person = Shouty.Person;
var Network = Shouty.Network;

module.exports = function () {
  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance, callback) {
    this.network = new Network();
    this.sean = new Person(this.network);
    this.lucy = new Person(this.network);
    callback();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (message, callback) {
    this.sean.shout(message, callback);
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (message, callback) {
    expect(this.lucy.heardMessages).to.include(message);
    callback();
  });
};
