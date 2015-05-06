module.exports = function Shouty() {
  this.personIsAt = function (personName, geoLocation, callback) {
    callback();
  };

  this.personShouts = function (personName, message, callback) {
    callback();
  };

  this.messagesHeardBy = function (personName, callback) {
    var messagesHeard = [];
    return callback(null, messagesHeard);
  };
};
