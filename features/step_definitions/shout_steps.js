var assert = require('assert');
var DomainWorld = require('./support/domain_world').DomainWorld;

module.exports = function () {
  this.World = DomainWorld;

  this.Given(/^Lucy is (\d+)m away from Sean$/, function (distance) {
    this.startShouty();
    this.registerPerson('lucy', 0);
    this.registerPerson('sean', distance);
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    this.makePersonShout('sean', shout);
  });

  this.Then(/^Lucy should receive "([^"]*)"$/, function (shout) {
    this.assertPersonReceivedShout('lucy', shout);
  });

  this.Then(/^Lucy should not receive "([^"]*)"$/, function (shout) {
    this.assertPersonDidNotReceiveShout('lucy', shout);
  });
};
