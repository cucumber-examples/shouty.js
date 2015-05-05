// @jbpros - I don't like that I have to use an artificial WebWorld property
// here just to avoid the function being auto-run when cucumber runs.
// I really want to say module.exports = function () {};
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
