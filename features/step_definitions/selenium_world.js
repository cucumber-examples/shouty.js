var webdriver = require('selenium-webdriver');

module.exports.SeleniumWorld = function (callback) {
  this.personIsAt = function(personName, geoLocation, callback) {
    var browser = new webdriver.Builder()
      .forBrowser('firefox')
      .build();

    callback();
  };

  callback();
};
