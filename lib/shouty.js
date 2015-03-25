module.exports = {
  Network: function Network() {
    this.broadcast = function (message, callback) {
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
