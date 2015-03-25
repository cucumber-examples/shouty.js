module.exports = {

  Person: function Person() {
    this.heardMessages = ["Free espressos!"];

    this.shout = function (message, callback) {
      callback();
    };
  }

};
