var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  var sean, lucy, network;

  this.Before(function (callback) {
    var configuration = { range: 1000, shoutLengthLimit: 256 };
    network = new Network(configuration);
    callback();
  });

  this.Given(/^Lucy is (\d+)m away of Sean$/, function (distance) {
    distance = parseInt(distance);
    var seanPosition = 0;
    sean = new Person(network, seanPosition);
    lucy = new Person(network, seanPosition + distance);
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    sean.shout(shout);
  });

  this.Then(/^Lucy should receive "([^"]*)"$/, function (shout) {
    if (lucy.lastHeardShout != shout) {
      throw new Error("Expected Lucy to have heard " + shout);
    }
  });

  this.Then(/^Lucy should not receive "([^"]*)"$/, function (shout) {
    if (lucy.lastHeardShout == shout) {
      throw new Error("Expected Lucy not to have heard " + shout);
    }
  });


  this.Then(/^there should be the following data:$/, function (table, callback) {
    console.log(table.rowsHash());
  });
};
