var chai = require('chai');
var expect = chai.expect;

var Shouty = require('../../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = {
  DomainWorld: function DomainWorld(callback) {
    this.messages = [];

    this.network = new Network();

    this.registerPerson = function (name, position, callback) {
      this[name] = new Person(this.network, 0);
      callback();
    };

    this.makeSeanShout = function (message, callback) {
      this.messages.push(message);
      this.sean.shout(message);
      callback();
    };

    this.assertLucyDidNotHearMessage = function (message, callback) {
      expect(this.lucy.lastHeardMessage).to.not.equal(message);
      callback();
    };

    this.assertLucyHeardMessages = function (messages, callback) {
      var self = this;
      messages.forEach(function (message) {
        expect(self.lucy.heardMessages).to.include(message);
      });
      callback();
    };

    this.destroy = function (callback) { callback(); };
    callback();
  }
};
