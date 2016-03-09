var Person = require('../lib/shouty').Person;

describe("Person", function () {
  var network;

  beforeEach(function () {
    network = { register: function () {} };
  })

  it("can be instantiated", function () {
    var person = new Person(network);
    expect(person.constructor).toBe(Person);
  });

  describe("#distanceTo", function () {
    it("computes the distance between two people", function () {
      var sean = new Person(network, 0);
      var lucy = new Person(network, 100);
      expect(sean.distanceTo(lucy)).toEqual(100);
    })

    it("computes the distance between two other people", function () {
      var robert = new Person(network, 10);
      var sarah = new Person(network, 50);
      expect(robert.distanceTo(sarah)).toEqual(40);
    })

    it("always computes positive distances", function () {
      var robert = new Person(network, 50);
      var sarah = new Person(network, 10);
      expect(robert.distanceTo(sarah)).toEqual(40);
    })
  })
})
