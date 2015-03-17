module.exports = function () {
  var lucy, sean;

  function Person() {
    this.lastHeardMessage = "Free Guinness!";
    this.shout = function (message) {
    };
  }

  this.Given(/^Lucy is (\d+)ft away from Sean$/, function (distance, callback) {
    lucy = new Person();
    sean = new Person();
    callback();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (message, callback) {
    sean.shout(message);
    callback();
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (message, callback) {
    if (lucy.lastHeardMessage !== message) {
      callback(new Error("Lucy didn't hear the message"));
    } else {
      callback();
    }
  });

};
