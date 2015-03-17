var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  var network, lucy, sean;

  this.Given(/^Lucy is (\d+)ft away from Sean$/, function (distance, callback) {
    network = new Network();
    lucy = new Person(network);
    sean = new Person(network);
    callback();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (message, callback) {
    sean.shout(message);
    callback();
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (message, callback) {
    if (lucy.lastHeardMessage !== message) {
      var error = new Error('Expected Lucy to hear: "' + message + '", but she heard: "' + lucy.lastHeardMessage + '"');
      callback(error);
    } else {
      callback();
    }
  });

};
