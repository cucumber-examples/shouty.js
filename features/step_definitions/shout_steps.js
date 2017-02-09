const assert = require('assert')
const Shouty = require('../../lib/shouty')
const Coordinate = require('../../lib/coordinate')

const {defineSupportCode} = require('cucumber')

defineSupportCode(({Before, Given, When, Then}) => {
  const ARBITARY_MESSAGE = 'Hello, world'
  let shouty
  Before(function() {
    shouty = new Shouty()
  })

  Given(/^Lucy is at (\d+), (\d+)$/, function (x, y) {
    shouty.setLocation('Lucy', new Coordinate(x, y))
  })

  Given(/^Sean is at (\d+), (\d+)$/, function (x, y) {
    shouty.setLocation('Sean', new Coordinate(x, y))
  })

  When(/^Sean shouts$/, function () {
    shouty.shout('Sean', ARBITARY_MESSAGE)
  })

  Then(/^Lucy should hear Sean$/, function () {
    assert.equal(Object.keys(shouty.getMessagesHeardBy('Lucy')).length, 1)
  })

  Then(/^Lucy should hear nothing$/, function () {
    assert.equal(Object.keys(shouty.getMessagesHeardBy('Lucy')).length, 0)
  })

})
