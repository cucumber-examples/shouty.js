var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;
var ShoutyWorld = require('../support/world').ShoutyWorld;

module.exports = function () {
  this.World = ShoutyWorld;

  this.Given(/^Lucy is (\d+)ft away from Sean$/, function (distance, callback) {
    var lucyPosition = parseInt(distance);
    this.network = new Network();
    this.sean = new Person(this.network, 0);
    this.lucy = new Person(this.network, lucyPosition);
    callback();
  });

  this.When(/^Sean shouts a message$/, function (callback) {
    this.message = "blah blah";
    this.sean.shout(this.message);
    callback();
  });

  this.When(/^Sean shouts a (\d+)\-character message$/, function (length, callback) {
    length = parseInt(length) + 1;
    this.message = new Array(length).join('X');
    this.sean.shout(this.message);
    callback();
  });

  this.Then(/^Lucy should hear that message$/, function (callback) {
    this.assertLucyHeardMessage(this.message, callback);
  });

  this.Then(/^Lucy should not hear that message$/, function (callback) {
    this.assertLucyDidNotHearMessage(this.message, callback);
  });
};
