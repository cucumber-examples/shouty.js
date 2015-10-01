var Shouty = require('../../lib/shouty.js');
var Network = Shouty.Network;
var Shouter = Shouty.Shouter;

var chai = require('chai');
var expect = chai.expect;

module.exports = function () {
  var sean, lucy, shouters = {};

  this.Given(/^Lucy is (\d+) meters away from Sean$/, function (distance) {
    var lucyPosition = distance;
    var network = new Network();
    sean = new Shouter(network, 0);
    lucy = new Shouter(network, lucyPosition);
    shouters.Sean = sean;
    shouters.Lucy = lucy;
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    sean.shout(shout);
  });

  this.Then(/^(\w+) should hear "([^"]*)"$/, function (name, shout) {
    if (shouters[name].lastHeardShout != shout) {
      throw new Error("Expected " + name + " to hear " + shout + ", but they heard " + shouters[name].lastHeardShout);
    }
  });

  this.Then(/^(\w+) should not hear "([^"]*)"$/, function (name, shout) {
    if (shouters[name].lastHeardShout == shout) {
      throw new Error("Expected " + name + " not to hear " + shout + ", but they heard it.");
    }
  });
};
