var Browser = require('zombie');
Browser.localhost('example.com', 3000);
var browser = new Browser();

module.exports.WebWorld = function (callback) {
  this.personIsAt = function(personName, geoLocation, callback) {
    browser.visit('/people/' +
                  personName +
                  '?lat=' + geoLocation[0] +
                  '&lon=' + geoLocation[1],
                  callback);
  };

  this.personShouts = function (personName, message, callback) {
  };

  this.messagesHeardBy = function (personName, callback) {
    return [];
  };

  callback();
};
