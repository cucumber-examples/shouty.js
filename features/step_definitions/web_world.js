var Browser = require('zombie');
Browser.localhost('example.com', 3000);

module.exports.WebWorld = function (callback) {
  this.personIsAt = function(personName, location) {
  };

  this.personShouts = function (personName, message) {
  };

  this.messagesHeardBy = function (personName) {
    return [];
  };

  callback();
};
