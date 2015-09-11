var haversine = require('haversine');

function Person() {
  var shoutsHeard = [];

  this.hear = function(shout) {
    shoutsHeard.push(shout);
  };

  this.getShoutsHeard = function () {
    return shoutsHeard;
  }
}

module.exports = function Shouty() {
  var peopleByName = {};

  this.personIsAtLocation = function (personName, geoLocation) {
    peopleByName[personName] = new Person();
    peopleByName[personName].geoLocation = geoLocation;
  };

  this.shout = function (shouterName, shout) {
    var shouter = peopleByName[shouterName];

    for(var listenerName in peopleByName) {
      var listener = peopleByName[listenerName];
      var distance = haversine(shouter.geoLocation, listener.geoLocation, {unit: 'km'});
      var withinDistance = distance < 1;
      if(withinDistance) {
        listener.hear(shout);
      }
    }
  };

  this.getShoutsHeardBy = function (personName) {
    var person = peopleByName[personName];
    return person.getShoutsHeard();
  }
};
