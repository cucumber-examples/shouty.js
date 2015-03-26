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
    var network;

    beforeEach(function () {
      network = new Network;
    });

    it("can be instantiated", function () {
      expect(network).to.be.instanceof(Network);
    });


    describe("@people", function () {
      it("is an empty list of registered people", function () {
        expect(network.people).to.deep.equal([]);
      });
    });

    describe("#register", function () {
      it("appends the person to the registered people list", function () {
        var person = {};
        network.register(person);
        expect(network.people).to.include(person);
      });
    });

    describe("#broadcast", function () {
      var callback;

      beforeEach(function () {
        network.people = [
          { hear: sinon.spy() },
          { hear: sinon.spy() }
        ];
        callback = sinon.spy();
      });

      it("sends the message to everyone on the network", function () {
        network.broadcast("some message", callback);
        network.people.forEach(function (person) {
          expect(person.hear).to.have.been.calledWith("some message");
        });
      });

      it("calls back", function () {
        var callback = sinon.spy();
        network.broadcast("some message", callback);
        expect(callback).to.have.been.called;
      });

    });
  });

  describe("Person", function () {
    var person, network;

    beforeEach(function () {
      network = { broadcast: sinon.spy(), register: sinon.spy() };
      person = new Person(network);
    });

    it("can be instantiated", function () {
      expect(person).to.be.instanceof(Person);
    });

    it("registers itself onto the network", function () {
      expect(network.register).to.have.been.calledWith(person);
    });

    describe("@heardMessages", function () {

      it("is an empty list of messages heard by the person", function () {
        expect(person.heardMessages).to.deep.equal([]);
      });

    });

    describe("#shout", function () {
      it("tells the network to broadcast the message", function () {
        var callback = sinon.spy();
        person.shout("some message", callback);
        expect(network.broadcast).to.have.been.calledWith("some message", callback);
      });
    });

    describe("#hear", function () {
      it("appends the message to the list of heard messages", function () {
        person.hear("a message");
        expect(person.heardMessages).to.include("a message");
      });
    });
  });

});
