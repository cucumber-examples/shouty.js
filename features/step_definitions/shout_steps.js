function Shouter(network, position) {
  this.position = position;

  network.join(this);

  this.shout = function (shout) {
    network.broadcast(this, shout);
  };

  this.hear = function (shout) {
    this.lastHeardShout = shout;
  };
}

function Network() {
  var shouters = [];

  this.broadcast = function (shouter, shout) {
    var tooShort = shout.length < 1;
    var tooLong = shout.length > 143;
    if (tooShort || tooLong) return;

    shouters.forEach(function (listener) {
      var distance = Math.abs(listener.position - shouter.position);
      if (distance <= 500) {
        listener.hear(shout);
      }
    });
  };

  this.join = function (shouter) {
    shouters.push(shouter);
  };
}

module.exports = function () {
  var sean, lucy, shouters = {};

  this.Given(/^Lucy is (\d+) meters away from Sean$/, function (distance) {
    var lucyPosition = distance;
    var network = new Network();
    sean = new Shouter(network, 0);
    lucy = new Shouter(network, lucyPosition);
    shouters.Sean = sean;
    shouters.Lucy = lucy;
  });

  this.When(/^Sean shouts "([^"]*)"$/, function (shout) {
    sean.shout(shout);
  });

  this.Then(/^(\w+) should hear "([^"]*)"$/, function (name, shout) {
    if (shouters[name].lastHeardShout != shout) {
      throw new Error("Expected " + name + " to hear " + shout + ", but they heard " + shouters[name].lastHeardShout);
    }
  });

  this.Then(/^(\w+) should not hear "([^"]*)"$/, function (name, shout) {
    if (shouters[name].lastHeardShout == shout) {
      throw new Error("Expected " + name + " not to hear " + shout + ", but they heard it.");
    }
  });
};
