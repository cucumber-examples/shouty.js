var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var Shouty = require('../lib/shouty');
var Person = Shouty.Person;

describe("Shouty", function () {

  describe("Person", function () {

    it("can be instantiated", function () {
      var person = new Person();
      expect(person).to.be.instanceof(Person);
    });

  });

});
