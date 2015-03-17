module.exports = {
  Network: function Network() {
    var people = [];

    this.register = function (person) {
      people.push(person);
    };

    this.broadcast = function (message) {
      people.forEach(function (person) {
        person.hear(message);
      });
    }
  },

  Person: function Person(network) {
    network.register(this);

    this.shout = function (message) {
      network.broadcast(message);
    };

    this.hear = function (message) {
      this.lastHeardMessage = message;
    };
  }
};
