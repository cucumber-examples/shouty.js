var assert = require('assert');
var Shouty = require('../../lib/shouty');
var Coordinate = require('../../lib/coordinate')

module.exports = function () {
  const ARBITARY_MESSAGE = 'Hello, world'

  this.World = function() {
    this.shouty = new Shouty()
  };

  this.Given(/^Lucy is at \[(\d+), (\d+)\]$/, function (x, y, callback) {
    this.shouty.setLocation('Lucy', new Coordinate(x, y))
    callback()
  });

  this.Given(/^Sean is at \[(\d+), (\d+)\]$/, function (x, y, callback) {
    this.shouty.setLocation('Sean', new Coordinate(x, y))
    callback()
  });

  this.When(/^Sean shouts$/, function (callback) {
    this.shouty.shout('Sean', ARBITARY_MESSAGE)
    callback()
  });

  this.Then(/^Lucy should hear Sean$/, function (callback) {
    assert.equal(Object.keys(this.shouty.getMessagesHeardBy('Lucy')).length, 1)
    callback()
  });

  this.Then(/^Lucy should hear nothing$/, function (callback) {
    assert.equal(Object.keys(this.shouty.getMessagesHeardBy('Lucy')).length, 0)
    callback()
  });
};
