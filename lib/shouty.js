module.exports = function Shouty() {
  this.personIsAt = function (personName, geoLocation, callback) {
    var person = findOrCreatePerson(personName);
    person.setGeoLocation(geoLocation);
    callback();
  };

  this.personShouts = function (personName, message, callback) {
    var person = findOrCreatePerson(personName);
    person.shout(message);
    callback();
  };

  this.messagesHeardBy = function (personName, callback) {
    var person = findOrCreatePerson(personName);
    return callback(null, person.getMessagesHeard());
  };

  var messageExchange = new MessageExchange();
  var people = {};

  function findOrCreatePerson(personName) {
    return people[personName] = people[personName] || new Person(messageExchange);
  }
};

function Person(messageExchange) {
  messageExchange.subscribe(this);

  // TODO: rename to receivedMessages
  var messagesHeard = [];
  var geoLocation;

  this.setGeoLocation = function (newGeoLocation) {
    geoLocation = newGeoLocation;
  };

  this.getGeoLocation = function () {
    return geoLocation;
  };

  this.shout = function (message) {
    messageExchange.broadcast(message, geoLocation);
  };

  this.hear = function (message) {
    messagesHeard.push(message);
  };

  this.getMessagesHeard = function () {
    return messagesHeard;
  };
};

function MessageExchange() {
  var people = [];

  this.subscribe = function (person) {
    people.push(person);
  };

  this.broadcast = function (message, messageLocation) {
    people.forEach(function (listener) {
      if(isWithinRange(messageLocation, listener.getGeoLocation())) {
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
