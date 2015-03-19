var chai = require('chai');
var expect = chai.expect;

module.exports = {
  ShoutyWorld: function ShoutyWorld(callback) {
    this.assertLucyHeardMessage = function (message, callback) {
      expect(this.lucy.lastHeardMessage).to.equal(message);
      callback();
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
