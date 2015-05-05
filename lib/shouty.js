module.exports = function Shouty () {
  this.personIsAt = function(personName, location) {
    person(personName).setLocation(location);
  };

  this.personShouts = function (personName, message) {
    person(personName).shout(message);
  };

  this.messagesHeardBy = function (personName) {
    return person(personName).messagesHeard();
  };

  var network = new Network();
  var people = {};
  function person(personName) {
    var person = people[personName];
    if (person) return person;
    return people[personName] = new Person(network);
  }
};

function Network () {
  var people = [];

  this.subscribe = function (person) {
    people.push(person);
  };

  this.broadcast = function (message, messageLocation) {
    people.forEach(function (listener) {
      if(isWithinRange(messageLocation, listener.getLocation())) {
        listener.hear(message);
      }
    });
  };

  function isWithinRange(loc1, loc2) {
    var dist = haversine(loc1[0], loc1[1], loc2[0], loc2[1]);
    return dist <= 1000;
  }

  // http://www.movable-type.co.uk/scripts/latlong.html
  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371000; // metres
    var φ1 = toRad(lat1);
    var φ2 = toRad(lat2);
    var Δφ = toRad(lat2-lat1);
    var Δλ = toRad(lon2-lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d;
  }

  function toRad(deg) {
    return deg * Math.PI / 180;
  }
};

function Person (network) {
  var location, messagesHeard = [];
  network.subscribe(this);

  this.setLocation = function (newLocation) {
    location = newLocation;
  };

  this.getLocation = function () {
    return location;
  };

  this.shout = function (message) {
    network.broadcast(message, location);
  };

  this.hear = function (message) {
    messagesHeard.push(message);
  };

  this.messagesHeard = function () {
    return messagesHeard;
  }
};
