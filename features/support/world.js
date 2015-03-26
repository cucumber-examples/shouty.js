var chai = require('chai');
var expect = chai.expect;

var Shouty = require('../../lib/shouty');
var Person = Shouty.Person;
var Network = Shouty.Network;

module.exports = {
  DomainWorld: function DomainWorld(callback) {
    this.network = new Network();

    this.registerPerson = function (name) {
      this[name] = new Person(this.network);
    };

    this.makePersonShout = function (name, message, callback) {
      this[name].shout(message, callback);
    };

    this.expectPersonToHaveHeard = function (name, message, callback) {
      expect(this[name].heardMessages).to.include(message);
      callback();
    };

    callback();
  }
};
