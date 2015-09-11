var assert = require('assert');
var Shouty = require('../../lib/shouty');

// Some locations to use
var bridgeHouse = {latitude: 53.4720597, longitude: -2.2998615};
var theQuays    = {latitude: 53.4709477, longitude: -2.2938976};
var piccadilly  = {latitude: 53.4774029, longitude: -2.2309325};

module.exports = function () {
  this.World = function(callback) {
    callback();
    return new Shouty();
  };
};
