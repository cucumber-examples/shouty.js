module.exports = {
  Person: function Person() {
    this.shout = function (message, callback) {
      callback();
    };
  }
};
