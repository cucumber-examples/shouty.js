var ShoutyWorld = require('../support/world').ShoutyWorld;

module.exports = function () {
  this.World = ShoutyWorld;

  this.Given(/^Lucy is (\d+)ft away from Sean$/, function (distance, callback) {
    var lucyPosition = parseInt(distance);
    this.startShouty();
    this.registerPerson("sean", 0);
    this.registerPerson("lucy", lucyPosition);
    callback();
  });

  this.When(/^Sean shouts a message$/, function (callback) {
    this.makeSeanShout("Blah blah");
    callback();
  });

  this.When(/^Sean shouts a (\d+)\-character message$/, function (length, callback) {
    length = parseInt(length) + 1;
    var message = new Array(length).join('X');
    this.makeSeanShout(message);
    callback();
  });

  this.When(/^Sean shouts multiple messages$/, function (callback) {
    this.makeSeanShout("Free bagels!");
    this.makeSeanShout("Free gherkins!");
    callback();
  });

  this.Then(/^Lucy should hear that message$/, function (callback) {
    this.assertLucyHeardMessages(this.messages, callback);
  });

  this.Then(/^Lucy should not hear that message$/, function (callback) {
    this.assertLucyDidNotHearMessage(this.messages[0], callback);
  });

  this.Then(/^Lucy should hear those messages$/, function (callback) {
    this.assertLucyHeardMessages(this.messages, callback);
  });
};
