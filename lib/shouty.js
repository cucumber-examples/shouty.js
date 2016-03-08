function Person(network) {
  network.register(this);

  this.shout = function (shout) {
    if (shout.length == 0) return;

    network.people.forEach(function (person) {
      person.lastHeardMessage = shout;
    });
  };
}

function Network() {
  var people = [];
  this.people = people;
  this.register = function (person) {
    people.push(person);
  }
}

module.exports = {
  Person: Person,
  Network: Network
}
