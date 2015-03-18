module.exports = {
  Network: function Network() {
    var people = [];

    this.register = function (person) {
      people.push(person);
    };

    this.broadcast = function (message, shouter) {
      if (message.length >= 140) return;

      people.forEach(function (person) {
        var distance = Math.abs(shouter.position - person.position);
        if (distance <= 1000) {
          person.hear(message);
        }
      });
    }
  },

  Person: function Person(network, position) {
    this.position = position;
    network.register(this);

    this.shout = function (message) {
      network.broadcast(message, this);
    };

    this.hear = function (message) {
      this.lastHeardMessage = message;
    };
  }
};
