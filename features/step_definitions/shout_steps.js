var Q = require('q');

module.exports = function () {

  this.Given(/^Lucy (?:is within range of|can hear) Sean$/, function () {
    return Q.all([
      this.registerPerson('Sean', 0),
      this.registerPerson('Lucy', this.configuration.range - 1)
    ]);
  });

  this.Given(/^Lucy is out of range from Sean$/, function () {
    return Q.all([
      this.registerPerson('Sean', 0),
      this.registerPerson('Lucy', this.configuration.range)
    ]);
  });

  this.When(/^Sean shouts$/, function () {
    this.sean_shout = "hello";
    return this.shout('Sean', this.sean_shout);
  });

  this.When(/^Sean shouts a short shout$/, function () {
    this.sean_shout = (new Array(this.configuration.shoutLengthLimit)).join('X');
    return this.shout('Sean', this.sean_shout);
  });

  this.When(/^Sean shouts a too\-long shout$/, function () {
    this.sean_shout = (new Array(this.configuration.shoutLengthLimit + 1)).join('X');
    return this.shout('Sean', this.sean_shout);
  });

  this.Then(/^Lucy should hear Sean's shout$/, function () {
    var self = this;

    return self.getLastMessageHeardBy('Lucy').then(function (lastHeardShout) {
      if (lastHeardShout != self.sean_shout) {
        throw new Error("Expected Lucy to have heard \"" + self.sean_shout +"\"");
      }
    });
  });

  this.Then(/^Lucy should not hear Sean's shout$/, function () {
    var self = this;

    return self.getLastMessageHeardBy('Lucy').then(function (lastHeardShout) {
      if (lastHeardShout == self.sean_shout) {
        throw new Error("Expected Lucy not to have heard \"" + self.sean_shout +"\"");
      }
    });
  });
};
