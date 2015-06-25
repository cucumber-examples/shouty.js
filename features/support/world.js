var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

var ShoutyServer = require('../../lib/shouty/server');
var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  this.World = process.env.WORLD == 'web' ? WebWorld : ShoutyWorld;

  this.After(function (callback) {
    this.destroy(callback);
  });

  function WebWorld(callback) {
    this.configuration = { range: 1000, shoutLengthLimit: 256 };
    this.people = {};

    var server = new ShoutyServer();

    this.registerPerson = function (name, position) {
      var driver = new webdriver.Builder()
        .forBrowser('firefox')
        .build();
      this.people[name] = driver;
      return driver.get('http://localhost:1337/?name=' + name + '&position=' + position);
    };

    this.shout = function (name, shout) {
      this.people[name].findElement(By.name('message')).sendKeys(shout);
      return this.people[name].findElement(By.name('shout')).click();
    };

    this.getLastMessageHeardBy = function (name) {
      this.people[name].navigate().refresh();
      return this.people[name]
        .findElement(By.xpath("//li[1]"))
        .getText();
    };

    this.destroy = function (callback) {
      var promise;
      for (var name in this.people) {
        promise = this.people[name].quit();
      }
      // wait for browsers to have closed before shutting server:
      promise.then(function () {
        server.stop(callback);
      })
    };

    server.start(callback);
  }

  function ShoutyWorld(callback) {
    this.configuration = { range: 1000, shoutLengthLimit: 256 };
    this.network = new Network(this.configuration);
    this.people = {};

    this.registerPerson = function (name, position) {
      this.people[name] = new Person(this.network, position);
    };

    this.shout = function (name, shout) {
      this.people[name].shout(shout);
    };

    this.getLastMessageHeardBy = function (name) {
      var self = this;
      return { then: function (cb) { cb(self.people[name].lastHeardShout); } };
    };

    this.destroy = function (callback) { callback(); }

    callback();
  }

};
