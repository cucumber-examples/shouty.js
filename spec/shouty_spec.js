var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var Shouty = require("../lib/shouty");
var Person = Shouty.Person;

describe("Shouty", function () {

  describe("Person", function () {
    var person, network;

    beforeEach(function () {
      network = {};
      network.broadcast = sinon.spy();
      network.register = sinon.spy();
      person = new Person(network);
    });

    it("can be instantiated", function () {
      expect(person).to.be.instanceof(Person);
    });

    describe("#shout", function () {
      it("is a method", function () {
        expect(person).to.respondTo('shout');
      });

      it("tells the network to broadcast the message", function () {
        var callback = sinon.spy();
        person.shout("a message", callback);
        expect(network.broadcast).to.have.been.calledWith("a message", callback);
      });

    });
  });
});
