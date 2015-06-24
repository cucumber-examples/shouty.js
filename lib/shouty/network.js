function Network(configuration) {
  var people = [];

  this.register = function (person) {
    people.push(person);
  };

  this.broadcast = function (shouter, shout) {
    if (shout.length < configuration.shoutLengthLimit) {
      people.forEach(function (person) {
        var distance = Math.abs(shouter.position - person.position);
        if (distance < configuration.range) {
          person.hear(shout);
        }
      });
    }
  };
}

module.exports = Network;
