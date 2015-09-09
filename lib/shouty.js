function Person() {
  var messagesHeard = [];

  this.deliverShout = function (message) {
    messagesHeard.push(message);
  };

  this.getDeliveredShouts = function () {
    return messagesHeard;
  }
}

module.exports = function Shouty() {
  var people = {};

  this.personIsIn = function(personName, latLon) {
    var person = people[personName];
    if(!person) {
      person = new Person();
      people[personName] = person;
    }
    person.latLon = latLon;
  };

  this.shout = function(personName, message) {
    // loop over all people, deliver to the ones within range
    // for the time being, deliver to EVERYONE
    for(var personName in people) {
      var person = people[personName];
      person.deliverShout(message);
    };
  };

  this.getAllShoutsHeardBy = function(personName) {
    var person = people[personName];
    return person.getDeliveredShouts();
  };
};
