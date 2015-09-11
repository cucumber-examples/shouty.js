function Person() {
  this.shoutsHeard = [];
}

module.exports = function Shouty() {
  var peopleByName = {};

  this.personIsAtLocation = function (personName, geoLocation) {
    peopleByName[personName] = new Person();
  };

  this.personShouts = function (personName, message) {
    
  };

  this.getShoutsHeardBy = function (personName) {
    var person = peopleByName[personName];
    return person.shoutsHeard;
  }
};
