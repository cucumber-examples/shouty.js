function Shouter(network, position) {
  this.position = position;

  network.join(this);

  this.shout = function (shout) {
    network.broadcast(this, shout);
  };
}

function Network() {
  var shouters = [];

  this.broadcast = function (shouter, shout) {
    shouters.forEach(function (listener) {
      if (Math.abs(listener.position - shouter.position) <= 500) {
        listener.lastHeardMessage = shout;
      }
    });
  };

  this.join = function (shouter) {
    shouters.push(shouter);
  };
}

module.exports = function () {
  var sean, lucy;

  this.Given(/^Lucy is (\d+) meters away from Sean$/, function (distance) {
    var lucyPosition = distance;
    var network = new Network();
    sean = new Shouter(network, 0);
    lucy = new Shouter(network, lucyPosition);
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
