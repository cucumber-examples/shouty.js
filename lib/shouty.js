var util = require('util')

function Person(network, position) {
  network.register(this);

  this.position = position;

  this.shout = function (shout) {
    network.broadcast(this, shout);
  };

  this.distanceTo = function (otherPerson) {
    return Math.abs(otherPerson.position - this.position);
  };
}

function Network() {
  var people = [];

  this.register = function (person) {
    people.push(person);
  }

  this.broadcast = function (shouter, shout) {
    if (shout.length == 0 || shout.length > 256) return;

    people.forEach(function (person) {
      if (shouter.distanceTo(person) <= 1000)
        person.lastHeardMessage = shout;
    });
  }
}

module.exports = {
  Person: Person,
  Network: Network
}
