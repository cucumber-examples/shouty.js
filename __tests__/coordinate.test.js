var assert = require('assert')
var Coordinate = require('../lib/coordinate')

describe("coordinate class", () => {

  it("should calculate the distance from itself", () => {
    var a = new Coordinate(0, 0);
    assert.equal(a.distanceFrom(a), 0)
  })

  it("should calculate the distance from another coordinate along X axis", ()=>{
    var a = new Coordinate(0, 0);
    var b = new Coordinate(1000, 0);

    assert.equal(a.distanceFrom(b), 1000)

  })
})
