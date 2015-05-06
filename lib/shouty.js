module.exports = function Shouty() {
  this.personIsAt = function (personName, geoLocation, callback) {
    var person = findOrCreatePerson(personName);
    person.setGeoLocation(geoLocation);
    callback();
  };

  this.personShouts = function (personName, message, callback) {
    var person = findOrCreatePerson(personName);
    person.shout(message);
    callback();
  };

  this.messagesHeardBy = function (personName, callback) {
    var person = findOrCreatePerson(personName);
    return callback(null, person.getMessagesHeard());
  };

  var messageExchange = new MessageExchange();
  var people = {};

  function findOrCreatePerson(personName) {
    return people[personName] = people[personName] || new Person(messageExchange);
  }
};

function Person(messageExchange) {
  messageExchange.subscribe(this);

  // TODO: rename to receivedMessages
  var messagesHeard = [];

  this.setGeoLocation = function (geoLocation) {

  };

  this.shout = function (message) {
    messageExchange.broadcast(message);
  };

  this.hear = function (message) {
    messagesHeard.push(message);
  };

  this.getMessagesHeard = function () {
    return messagesHeard;
  };
};

function MessageExchange() {
  var people = [];

  this.subscribe = function (person) {
    people.push(person);
  };

  this.broadcast = function (message) {
    people.forEach(function (listener) {
      listener.hear(message);
    });
  };
};
