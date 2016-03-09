var Person = require('../lib/shouty').Person;

describe("Person", function () {
  it("can be instantiated", function () {
    var network = { register: function () {} };
    var person = new Person(network);
    expect(person.constructor).toBe(Person);
  });

  describe("#distanceTo", function () {
    it("computes the distance between two people", function () {
      var network = { register: function () {} };
      var sean = new Person(network, 0);
      var lucy = new Person(network, 100);
      expect(sean.distanceTo(lucy)).toEqual(100);
    })
  })
})
