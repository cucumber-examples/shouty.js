var DomainWorld = require('../support/domain_world').DomainWorld;
var WebWorld = require('../support/web_world').WebWorld;

var chai = require('chai');
var expect = chai.expect;

module.exports = function () {
  this.World = process.env.WORLD == 'web' ? WebWorld : DomainWorld;

  this.Given(/^Lucy is (\d+) meters away from Sean$/, function (distance) {
    var lucyPosition = distance;
    this.registerShouter("Sean", 0);
    this.registerShouter("Lucy", lucyPosition);
  });

  this.Given(/^Lucy is close enough to hear Sean$/, function () {
    this.registerShouter("Sean", 0);
    this.registerShouter("Lucy", 10);
  });

  this.When(/^(\w+) shouts "([^"]*)"$/, function (name, shout) {
    this.shouterShout(name, shout);
  });

  this.Then(/^(\w+) should hear "([^"]*)"$/, function (name, shout) {
    expect(this.lastHeardShoutBy(name)).to.equal(shout);
  });

  this.Then(/^(\w+) should not hear "([^"]*)"$/, function (name, shout) {
    expect(this.lastHeardShoutBy(name)).to.not.equal(shout);
  });
};
