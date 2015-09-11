var haversine = require('haversine');

function Person() {
  this.shoutsHeard = [];
}

module.exports = function Shouty() {
  var peopleByName = {};

  this.personIsAtLocation = function (personName, geoLocation) {
    peopleByName[personName] = new Person();
    peopleByName[personName].geoLocation = geoLocation;
  };

  this.personShouts = function (shouterName, message) {
    var shouter = peopleByName[shouterName];

    for(var listenerName in peopleByName) {
      var listener = peopleByName[listenerName];
      var distance = haversine(shouter.geoLocation, listener.geoLocation, {unit: 'km'});
      var withinDistance = distance < 1;
      if(withinDistance) {
        listener.shoutsHeard.push(message);
      }
    }
  };

  this.getShoutsHeardBy = function (personName) {
    var person = peopleByName[personName];
    return person.shoutsHeard;
  }
};
