const assert = require('assert')
const { Before, Given, When, Then } = require('@cucumber/cucumber')
const Shouty = require('../../lib/shouty')
const Coordinate = require('../../lib/coordinate')

const ARBITARY_MESSAGE = 'Hello, world'
let shouty

Before(function() {
  shouty = new Shouty()
})

Given('Lucy is at {int}, {int}', function (x, y) {
  shouty.setLocation('Lucy', new Coordinate(x, y))
})

Given('Sean is at {int}, {int}', function (x, y) {
  shouty.setLocation('Sean', new Coordinate(x, y))
})

When('Sean shouts', function () {
  shouty.shout('Sean', ARBITARY_MESSAGE)
})

Then('Lucy should hear Sean', function () {
  assert.strictEqual(shouty.getShoutsHeardBy('Lucy').size, 1)
})

Then('Lucy should hear nothing', function () {
  assert.strictEqual(shouty.getShoutsHeardBy('Lucy').size, 0)
})
