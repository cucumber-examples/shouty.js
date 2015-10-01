var Shouty = require('../../lib/shouty.js');
var Network = Shouty.Network;
var Shouter = Shouty.Shouter;

function DomainWorld(callback) {
  this.network = new Network();
  this.shouters = {};

  this.registerShouter = function (name, position) {
    this.shouters[name] = new Shouter(this.network, position);
  };

  this.shouterShout = function (name, shout) {
    this.shouters[name].shout(shout);
  };

  this.lastHeardShoutBy = function (name) {
    return this.shouters[name].lastHeardShout;
  };

  callback();
};

module.exports = { DomainWorld: DomainWorld };
