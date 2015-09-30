function Shouter(shouters, position) {
  this.position = position;

  this.shout = function (shout) {
    var self = this;

    shouters.forEach(function (listener) {
      if (Math.abs(listener.position - self.position) <= 500) {
        listener.lastHeardMessage = shout;
      }
    });
  };
}

module.exports = function () {
  var sean, lucy;

  this.Given(/^Lucy is (\d+) meters away from Sean$/, function (distance) {
    var shouters = [];
    var lucyPosition = distance;
    sean = new Shouter(shouters, 0);
    lucy = new Shouter(shouters, lucyPosition);
    shouters.push(sean);
    shouters.push(lucy);
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

  this.Then(/^Lucy should not hear "([^"]*)"$/, function (shout) {
    if (lucy.lastHeardMessage == shout) {
      throw new Error("Expected Lucy not to hear " + shout + ", but she heard it.");
    }
  });
};
