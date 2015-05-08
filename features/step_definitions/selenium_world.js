var webdriver = require('selenium-webdriver');
var By = webdriver.By;

module.exports.SeleniumWorld = function (callback) {
  var browsers = {};

  this.closeAll = function() {
    for(var personName in browsers) {
      var browser = browsers[personName];
      browser.close();
    }
  };

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

  this.messagesHeardBy = function (personName, callback) {
    var browser = browsers[personName];

    // refresh page to get new messages (if any)
    browser.navigate().refresh()
      .then(function () {
        return browser.findElements(By.xpath('//li'));
      })
      .then(function (lis) {
        var messagePromises = lis.map(function (li) {
          return li.getText();
        });
        return webdriver.promise.all(messagePromises);
      })
      .then (function (messages) {
        callback(null, messages);
      });
  };

  callback();
};
