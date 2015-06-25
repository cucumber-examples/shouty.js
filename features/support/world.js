var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  this.World = process.env.WORLD == 'web' ? WebWorld : ShoutyWorld;

  function WebWorld(callback) { callback(); }

  function ShoutyWorld(callback) {
    this.configuration = { range: 1000, shoutLengthLimit: 256 };
    this.network = new Network(this.configuration);
    this.people = {};

    this.registerPerson = function (name, position) {
      this.people[name] = new Person(this.network, position);
    };

    this.shout = function (name, shout) {
      this.people[name].shout(shout);
    };

    this.getLastMessageHeardBy = function (name) {
      return this.people[name].lastHeardShout;
    };

    callback();
  }

};
