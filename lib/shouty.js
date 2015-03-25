module.exports = {
  Network: function Network() {

  },

  Person: function Person(network) {
    this.heardMessages = ["Free espressos!"];

    this.shout = function (message, callback) {
      network.broadcast(message, callback);
    };
  }

};
