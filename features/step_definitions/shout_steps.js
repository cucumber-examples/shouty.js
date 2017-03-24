const assert = require('assert')
const Shouty = require('../../lib/shouty')

const { defineSupportCode } = require('cucumber')

defineSupportCode(({Before, Given, When, Then}) => {
  let shouty
  Before(function() {
    shouty = new Shouty()
  })

  Given('Lucy is at {int}, {int}', function (x, y) {
    return 'pending'
  })

  Given('Sean is at {int}, {int}', function (x, y) {
    return 'pending'
  })

  When('Sean shouts', function () {
    return 'pending'
  })

  Then('Lucy should hear Sean', function () {
    return 'pending'
  })

  Then('Lucy should hear nothing', function () {
    return 'pending'
  })

})
