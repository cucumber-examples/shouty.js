var chai = require('chai');
var expect = chai.expect;

module.exports = {
  ShoutyWorld: function ShoutyWorld(callback) {
    this.messages = [];

    this.makeSeanShout = function (message) {
      this.messages.push(message);
      this.sean.shout(message);
    };

    this.assertLucyDidNotHearMessage = function (message, callback) {
      expect(this.lucy.lastHeardMessage).to.not.equal(message);
      callback();
    };

    this.assertLucyHeardMessages = function (messages, callback) {
      var self = this;
      messages.forEach(function (message) {
        expect(self.lucy.heardMessages).to.include(message);
      });
      callback();
    };

    callback();
  }
};
