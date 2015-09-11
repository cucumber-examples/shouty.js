var assert = require('assert');
var haversine = require('haversine');
var Shouty = require('../../lib/shouty');

// Simple location service just for our tests
var locations = {
  "Bridge House": {latitude: 53.4720597, longitude: -2.2998615},
  "The Quays":    {latitude: 53.4709477, longitude: -2.2938976},
  "Piccadilly":   {latitude: 53.4774029, longitude: -2.2309325}
};

module.exports = function () {
  this.World = function(callback) {
    callback();
    return new Shouty();
  };

  this.Given(/^"([^"]*)" is at "([^"]*)"$/, function (personName, locationName) {
    var geoLocation = locations[locationName];
    this.personIsAtLocation(personName, geoLocation);
  });

  this.Given(/^"([^"]*)" is more than (\d+) km away from "([^"]*)"$/, function (locationName1, maxDistance, locationName2) {
    var distance = haversine(locations[locationName1], locations[locationName2], {unit: 'km'});
    assert(distance > maxDistance, "Distance was actually " + distance + "km");
  });

  this.Given(/^"([^"]*)" is within (\d+) km of "([^"]*)"$/, function (locationName1, maxDistance, locationName2) {
    var distance = haversine(locations[locationName1], locations[locationName2], {unit: 'km'});
    assert(distance <= maxDistance, "Distance was actually " + distance + "km");
  });

  this.Given(/^"([^"]*)" has heard "([^"]*)"'s shout$/, function (listenerName, shouterName) {
    this.personIsAtLocation(listenerName, locations["Bridge House"]);
    this.personIsAtLocation(shouterName, locations["The Quays"]);
    this.shout(shouterName, "A message from " + shouterName);
  });

  this.When(/^"([^"]*)" moves next to "([^"]*)"$/, function (listenerName, shouterName) {
    this.personIsAtLocation(listenerName, locations["The Quays"]);
  });

  this.When(/^"([^"]*)" shouts$/, function (personName) {
    this.shout(personName, "A message from " + personName);
  });

  this.Then(/^"([^"]*)" should not hear anything$/, function (personName) {
    assert.deepEqual(this.getShoutsHeardBy(personName), []);
  });

  this.Then(/^"([^"]*)" should hear "([^"]*)"'s shout$/, function (listenerName, shouterName) {
    assert.deepEqual(this.getShoutsHeardBy(listenerName), ["A message from " + shouterName]);
  });
};
