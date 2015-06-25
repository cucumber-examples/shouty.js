var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

var Shouty = require('../../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

module.exports = function () {
  this.World = process.env.WORLD == 'web' ? WebWorld : ShoutyWorld;

  function WebWorld(callback) {
    this.configuration = { range: 1000, shoutLengthLimit: 256 };
    this.people = {};

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

    callback();
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
      return this.people[name].lastHeardShout;
    };

    callback();
  }

};
