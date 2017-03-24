const assert = require('assert')
const Shouty = require('../../lib/shouty')

const { defineSupportCode } = require('cucumber')

defineSupportCode(({Before, Given, When, Then}) => {
  let shouty
  Before(function() {
    shouty = new Shouty()
  })

  Given('{actor} is at {int}, {int}', function (actor, x, y) {
    console.log('actor', actor)
    return 'pending'
  })

  When('{actor} shouts', function (shouter) {
    console.log('shouter', shouter)
    return 'pending'
  })

  Then('{actor} should hear Sean', function (listener) {
    return 'pending'
  })

  Then('{actor} should hear nothing', function (listener) {
    return 'pending'
  })

})
