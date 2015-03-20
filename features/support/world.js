var chai = require('chai');
var expect = chai.expect;

var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = {
  ShoutyWorld: function ShoutyWorld(callback) {
    this.messages = [];

    this.startShouty = function () {
      this.network = new Network();
    };

    this.registerPerson = function (name, position) {
      this[name] = new Person(this.network, 0);
    };

    this.makeSeanShout = function (message) {
      this.messages.push(message);
      this.sean.shout(message);
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

    callback();
  }
};
