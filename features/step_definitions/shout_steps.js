const assert = require('assert')
const Shouty = require('../../lib/shouty')
const Coordinate = require('../../lib/coordinate')

const {defineSupportCode} = require('cucumber')

defineSupportCode(({Given, When, Then}) => {
  const ARBITARY_MESSAGE = 'Hello, world'
  var shouty = new Shouty()

  Given(/^Lucy is at (\d+), (\d+)$/, function (x, y, callback) {
    shouty.setLocation('Lucy', new Coordinate(x, y))
    callback()
  })

  Given(/^Sean is at (\d+), (\d+)$/, function (x, y, callback) {
    shouty.setLocation('Sean', new Coordinate(x, y))
    callback()
  })

  When(/^Sean shouts$/, function (callback) {
    shouty.shout('Sean', ARBITARY_MESSAGE)
    callback()
  })

  Then(/^Lucy should hear Sean$/, function (callback) {
    assert.equal(Object.keys(shouty.getMessagesHeardBy('Lucy')).length, 1)
    callback()
  })

  Then(/^Lucy should hear nothing$/, function (callback) {
    assert.equal(Object.keys(shouty.getMessagesHeardBy('Lucy')).length, 0)
    callback()
  })

})
