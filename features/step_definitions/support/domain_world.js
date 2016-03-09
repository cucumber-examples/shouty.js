var Shouty = require('../../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

function DomainWorld() {
  this.startShouty = function () {
    this.network = new Network();
  };

  this.registerPerson = function (name, position) {
    this[name] = new Person(this.network, position);
  };

  this.makePersonShout = function (shouterName, shout) {
    this[shouterName].shout(shout);
  };

  this.assertPersonReceivedShout = function (receiverName, shout) {
    if (this[receiverName].lastHeardMessage != shout)
      throw new Error(receiverName + " should have received " + shout + ", but they received: " + this[receiverName].lastHeardMessage)
  };

  this.assertPersonDidNotReceiveShout = function (receiverName, shout) {
    if (this[receiverName].lastHeardMessage === shout)
      throw new Error(receiverName + " should not have received \"" + shout + "\"");
  }
};

module.exports = { DomainWorld: DomainWorld };
