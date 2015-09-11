function Person() {
  this.shoutsHeard = [];
}

module.exports = function Shouty() {
  var peopleByName = {};

  this.personIsAtLocation = function (personName, geoLocation) {
    peopleByName[personName] = new Person();
  };

  this.personShouts = function (shouterName, message) {
    for(var listenerName in peopleByName) {
      var listener = peopleByName[listenerName];
      listener.shoutsHeard.push(message);
    }
  };

  this.getShoutsHeardBy = function (personName) {
    var person = peopleByName[personName];
    return person.shoutsHeard;
  }
};
