var haversine = require('haversine');

function Person() {
  this.messagesHeard = [];

  this.deliverShout = function (message) {
    this.messagesHeard.push(message);
  };
}

module.exports = function Shouty() {
  var people = {};

  this.personIsIn = function(personName, latLon) {
    var person = people[personName];
    if(!person) {
      person = new Person();
      people[personName] = person;
    }
    person.latLon = {
      latitude: latLon[0],
      longitude: latLon[1]
    };
  };

  this.shout = function(shouterName, message) {
    var shouter = people[shouterName];
    // loop over all people, deliver to the ones within range
    // for the time being, deliver to EVERYONE
    for(var listenerName in people) {
      var listener = people[listenerName];
      var distance = haversine(listener.latLon, shouter.latLon, {unit: 'km'});
      if(distance <= 1) {
        listener.deliverShout(message);
      }
    };
  };

  this.getAllShoutsHeardBy = function(personName) {
    var person = people[personName];
    return person.messagesHeard;
  };
};
