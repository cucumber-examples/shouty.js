var assert = require('assert');
var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  this.World = function DomainWorld() {
    this.startShouty = function () {
      this.network = new Network();
    };

    this.registerPerson = function (name, position) {
      this[name] = new Person(this.network, position);
    };

    this.makePersonShout = function (shouterName, shout) {
      this[shouterName].shout(shout);
    };
  };

  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance) {
    this.startShouty();
    this.registerPerson('lucy', 0);
    this.registerPerson('sean', distance);
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    this.makePersonShout('sean', shout);
  });

  this.Then(/^Lucy should receive "([^"]*)"$/, function (shout) {
    this.assertPersonReceivedShout(shout);

    // if (this.lucy.lastHeardMessage != shout)
    //   throw new Error("Lucy should have received " + shout + ", but she received: " + this.lucy.lastHeardMessage)
  });

  this.Then(/^Lucy should not receive "([^"]*)"$/, function (shout) {
    if (this.lucy.lastHeardMessage === shout)
      throw new Error("Lucy should not have received \"" + shout + "\"");
  });
};
