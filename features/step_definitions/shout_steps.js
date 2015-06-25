module.exports = function () {

  this.Given(/^Lucy (?:is within range of|can hear) Sean$/, function () {
    this.registerPerson('Sean', 0);
    this.registerPerson('Lucy', this.configuration.range - 1);
  });

  this.Given(/^Lucy is out of range from Sean$/, function () {
    this.registerPerson('Sean', 0);
    this.registerPerson('Lucy', this.configuration.range);
  });

  this.When(/^Sean shouts$/, function () {
    this.sean_shout = "hello";
    this.shout('Sean', this.sean_shout);
  });

  this.When(/^Sean shouts a short shout$/, function () {
    this.sean_shout = (new Array(this.configuration.shoutLengthLimit)).join('X');
    this.shout('Sean', this.sean_shout);
  });

  this.When(/^Sean shouts a too\-long shout$/, function () {
    this.sean_shout = (new Array(this.configuration.shoutLengthLimit + 1)).join('X');
    this.shout('Sean', this.sean_shout);
  });

  this.Then(/^Lucy should hear Sean's shout$/, function () {
    if (this.getLastMessageHeardBy('Lucy') != this.sean_shout) {
      throw new Error("Expected Lucy to have heard \"" + this.sean_shout +"\"");
    }
  });

  this.Then(/^Lucy should not hear Sean's shout$/, function () {
    if (this.getLastMessageHeardBy('Lucy') == this.sean_shout) {
      throw new Error("Expected Lucy not to have heard \"" + this.sean_shout +"\"");
    }
  });

};
