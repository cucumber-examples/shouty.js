const assert = require('assert')
const Coordinate = require('../lib/coordinate')

describe('Coordinate', () => {

  it("should calculate the distance from itself", () => {
    const a = new Coordinate(0, 0)
    assert.strictEqual(a.distanceFrom(a), 0)
  })

  it("should calculate the distance from another coordinate along X axis", ()=>{
    const a = new Coordinate(0, 0)
    const b = new Coordinate(600, 0)

    assert.strictEqual(a.distanceFrom(b), 600)
  })

  // it("should calculate the distance from another coordinate", ()=>{
  //   const a = new Coordinate(0, 0)
  //   const b = new Coordinate(300, 400)
  //
  //   assert.strictEqual(a.distanceFrom(b), 500)
  // })
})
