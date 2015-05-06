var webdriver = require('selenium-webdriver');

module.exports.SeleniumWorld = function (callback) {
  this.personIsAt = function(personName, geoLocation, callback) {
    var browser = new webdriver.Builder()
      .forBrowser('firefox')
      .build();

    browser.get(
      'http://localhost:3000/people/' +
      personName +
      '?lat=' + geoLocation[0] +
      '&lot=' + geoLocation[1]
    ).then(callback);
  };

  callback();
};
