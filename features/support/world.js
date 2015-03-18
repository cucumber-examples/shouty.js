module.exports = {
  ShoutyWorld: function ShoutyWorld(callback) {
    this.assertLucyHeardMessage = function (message, callback) {
      if (this.lucy.lastHeardMessage !== message) {
        var error = new Error('Expected Lucy to hear: "' + message + '", but she heard: "' + this.lucy.lastHeardMessage + '"');
        callback(error);
      } else {
        callback();
      }
    }

    this.assertLucyDidNotHearMessage = function (message, callback) {
      if (this.lucy.lastHeardMessage === message) {
        var error = new Error('Expected Lucy not to hear: "' + message + '", but she heard it');
        callback(error);
      } else {
        callback();
      }
    }
    callback();
  }
};
