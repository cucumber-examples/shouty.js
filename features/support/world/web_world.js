var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

var ShoutyServer = require('../../../lib/shouty_server');

module.exports = {
  WebWorld: function WebWorld(callback) {
    this.messages = [];
    this.shoutyServer = new ShoutyServer();

    this.registerPerson = function (name, position, callback) {
      var driver = new webdriver.Builder()
        .forBrowser('firefox')
        .build();
      driver.get('http://localhost:1337/?name=' + name + '&position=' + position)
        .then(callback);
      this[name] = driver;
    };

    this.makeSeanShout = function (message, callback) {
      this.messages.push(message);
      this.sean.findElement(By.name('message')).sendKeys(message);
      this.sean.findElement(By.name('shout')).click()
        .then(function () { callback(); });
    };

    this.assertLucyHeardMessages = function (messages, callback) {
      var self = this;
      var promise;
      self.lucy.navigate().refresh();
      messages.forEach(function (message) {
        promise = self.lucy.findElement(By.xpath("//li[contains(.,'" + message + "')]"));
      });
      promise.then(function () {
        callback();
      });
    };

    this.assertLucyDidNotHearMessage = function (message, callback) {
      var self = this;
      self.lucy.navigate().refresh();
      self.lucy.findElements(By.xpath("//li[contains(.,'" + message + "')]"))
      .then(function (messages) {
        if (messages.length > 0) {
          callback(new Error("Expected Lucy not to hear " + message));
        } else {
          callback();
        }
      });
    };

    this.destroy = function (callback) {
      var self = this;
      self.sean.quit();
      self.lucy.quit().then(function () {
        self.shoutyServer.stop(callback);
      });
    };

    this.shoutyServer.start(callback);
  }
};
