module.exports = function Shouty () {
  this.personIsAt = function(personName, location) {
    person(personName).setLocation(location);
  };

  this.personShouts = function (personName, message) {
    person(personName).shout(message);
  };

  this.messagesHeardBy = function (personName) {
    return person(personName).messagesHeard();
  };

  var network = new Network();
  var people = {};
  function person(personName) {
    var person = people[personName];
    if (person) return person;
    return people[personName] = new Person(network);
  }
};

function Network () {
  var people = [];

  this.subscribe = function (person) {
    people.push(person);
  };

  this.broadcast = function (message) {
    people.forEach(function (person) {
      person.hear(message);
    });
  };
};

function Person (network) {
  var location, messagesHeard = [];
  network.subscribe(this);

  this.setLocation = function (newLocation) {
    location = newLocation;
  };

  this.shout = function (message) {
    network.broadcast(message);
  };

  this.hear = function (message) {
    messagesHeard.push(message);
  };

  this.messagesHeard = function () {
    return messagesHeard;
  }
};
