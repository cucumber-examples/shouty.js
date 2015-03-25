var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var Shouty = require('../lib/shouty');
var Person = Shouty.Person;

describe("Shouty", function () {

  describe("Person", function () {
    var person;

    beforeEach(function () {
      person = new Person();
    });

    it("can be instantiated", function () {
      expect(person).to.be.instanceof(Person);
    });

    describe("@heardMessages", function () {

      it("contains the messages heard by the person", function () {
        expect(person.heardMessages).to.include("Free espressos!");
      });

    });

    describe("#shout", function () {

      it("calls back", function () {
        var callback = sinon.spy();
        person.shout("some message", callback);
        expect(callback).to.have.been.called;
      });

    });

  });

});
