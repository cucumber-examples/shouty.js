var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var Shouty = require('../lib/shouty');
var Network = Shouty.Network;
var Person = Shouty.Person;

describe("Shouty", function () {

  describe("Network", function () {
    it("can be instantiated", function () {
      var network = new Network;
      expect(network).to.be.instanceof(Network);
    });
  });

  describe("Person", function () {
    var person, network;

    beforeEach(function () {
      network = { broadcast: sinon.spy() };
      person = new Person(network);
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
      it("tells the network to broadcast the message", function () {
        var callback = sinon.spy();
        person.shout("some message", callback);
        expect(network.broadcast).to.have.been.calledWith("some message", callback);
      });
    });

  });

});
