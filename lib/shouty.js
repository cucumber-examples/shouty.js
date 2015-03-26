module.exports = {
  Network: function Network() {
    this.people = [];

    this.broadcast = function (message, callback) {
      this.people.forEach(function (person) {
        person.hear(message);
      });
      callback();
    };

    this.register = function (person) {
      this.people.push(person);
    };
  },

  Person: function Person(network) {
    this.heardMessages = [];

    network.register(this);

    this.shout = function (message, callback) {
      network.broadcast(message, callback);
    };

    this.hear = function (message) {
      this.heardMessages.push(message);
    };
  }
};
