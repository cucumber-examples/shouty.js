module.exports = function Shouty() {
  this.personIsAt = function (personName, geoLocation, callback) {
    var person = findOrCreatePerson(personName);
    person.isAt(geoLocation);
    callback();
  };

  this.personShouts = function (personName, message, callback) {
    callback();
  };

  this.messagesHeardBy = function (personName, callback) {
    var messagesHeard = [];
    return callback(null, messagesHeard);
  };

  var people = {};

  function findOrCreatePerson(personName) {
    return people[personName] = people[personName] || new Person();
  }
};

function Person() {
  this.isAt = function (geoLocation) {

  };
};
