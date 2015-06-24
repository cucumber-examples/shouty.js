function Person(network, position) {
  network.register(this);

  this.position = position;

  this.hear = function (shout) {
    this.lastHeardShout = shout;
  };

  this.shout = function (shout) {
    network.broadcast(this, shout);
  };

  this.lastHeardShout = undefined;
}

module.exports = Person;
