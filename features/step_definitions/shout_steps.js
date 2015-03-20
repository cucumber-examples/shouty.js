var World = require('../support/world');

module.exports = function () {
  var worldType = (process.env.WORLD === 'web' ? 'WebWorld' : 'DomainWorld');
  this.World = World[worldType];

  this.After(function (callback) {
    this.destroy(callback);
  });

  this.Given(/^Lucy is (\d+)ft away from Sean$/, function (distance, callback) {
    var self = this;

    var lucyPosition = parseInt(distance);
    self.registerPerson("sean", 0, function (err) {
      if (err) return callback(err);
      self.registerPerson("lucy", lucyPosition, callback);
    });
  });

  this.When(/^Sean shouts a message$/, function (callback) {
    this.makeSeanShout("Blah blah", callback);
  });

  this.When(/^Sean shouts a (\d+)\-character message$/, function (length, callback) {
    length = parseInt(length) + 1;
    var message = new Array(length).join('X');
    this.makeSeanShout(message, callback);
  });

  this.When(/^Sean shouts multiple messages$/, function (callback) {
    var self = this;
    self.makeSeanShout("Free bagels!", function (err) {
      if (err) return callback(err);
      self.makeSeanShout("Free gherkins!", callback);
    });
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
