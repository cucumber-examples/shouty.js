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


module.exports = {
  Shouter: Shouter,
  Network: Network
};
