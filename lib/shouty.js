function Person(network) {
  network.register(this);

  this.shout = function (shout) {
    network.broadcast(shout);
  };
}

function Network() {
  var people = [];

  this.register = function (person) {
    people.push(person);
  }

  this.broadcast = function (shout) {
    if (shout.length == 0 || shout.length > 256) return;

    people.forEach(function (person) {
      person.lastHeardMessage = shout;
    });
  }
}

module.exports = {
  Person: Person,
  Network: Network
}
