module.exports = {
  Network: function Network() {
    this.people = [];

    this.broadcast = function (message, callback) {
      this.people.forEach(function (person) {
        person.hear(message);
      });
      callback();
    };
  },

  Person: function Person(network) {
    this.heardMessages = ["Free espressos!"];

    this.shout = function (message, callback) {
      network.broadcast(message, callback);
    };
  }
};
