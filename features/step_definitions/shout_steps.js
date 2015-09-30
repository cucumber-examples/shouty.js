function Shouter() {
  this.shout = function () {};

  this.lastHeardMessage = "Hello World!";
}

module.exports = function () {
  var sean, lucy;

  this.Given(/^Lucy is (\d+) meters away from Sean$/, function (distance) {
    sean = new Shouter();
    lucy = new Shouter();
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    sean.shout(shout);
  });

  this.Then(/^Lucy should hear "([^"]*)"$/, function (shout) {
    if (lucy.lastHeardMessage != shout) {
      throw new Error("Expected Lucy to hear " + shout + ", but she heard " + lucy.lastHeardMessage);
    }
  });

  this.Then(/^Sean should hear "([^"]*)"$/, function (shout) {
    if (sean.lastHeardMessage != shout) {
      throw new Error("Expected Sean to hear " + shout + ", but he heard " + sean.lastHeardMessage);
    }
  });

  this.Then(/^Lucy should not hear "([^"]*)"$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
