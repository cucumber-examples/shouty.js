var webdriver = require('selenium-webdriver');
var By = webdriver.By;

module.exports.SeleniumWorld = function (callback) {
  var browsers = {};

  this.personIsAt = function(personName, geoLocation, callback) {
    var browser = new webdriver.Builder()
      .forBrowser('firefox')
      .build();

    browsers[personName] = browser;

    browser.get(
      'http://localhost:3000/people/' +
      personName +
      '?lat=' + geoLocation[0] +
      '&lon=' + geoLocation[1]
    ).then(callback);
  };

  this.personShouts = function (personName, message, callback) {
    var browser = browsers[personName];
    browser.findElement(By.name('message')).sendKeys(message);
    browser.findElement(By.name('shout')).click().then(function () {
      callback();
    });

  };

  callback();
};
