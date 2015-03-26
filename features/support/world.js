var Shouty = require('../../lib/shouty');
var Person = Shouty.Person;
var Network = Shouty.Network;

module.exports = {
  DomainWorld: function DomainWorld(callback) {
    this.network = new Network();

    this.registerPerson = function (name) {
      this[name] = new Person(this.network);
    };

    callback();
  }
};
