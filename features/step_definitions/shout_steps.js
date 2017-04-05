const assert = require('assert')
const {defineSupportCode} = require('cucumber')
const Shouty = require('../../lib/shouty')
const { startAtLocation, shoutMessage, checkThat } = require('../support/tasks')
const { lastHeardMessageFrom } = require('../support/questions')

const DEFAULT_MESSAGE = 'Hi folks!!!'
const hasContents = expected => actual => assert.equal(actual, expected)

defineSupportCode(({Before, Given, When, Then}) => {
  let shouty

  Before(function () {
    shouty = new Shouty()
  })

  Given('{actor} is at {int}, {int}', async function (actor, x, y) {
    await actor.attemptsTo(
      startAtLocation({x, y, as: actor.name})
    )
  })

  When('{actor} shouts', async function (shouter) {
    await shouter.attemptsTo(
      shoutMessage(DEFAULT_MESSAGE)
    )
  })

  Then('{actor} should hear Sean', async function (listener) {
    await listener.attemptsTo(
      checkThat(lastHeardMessageFrom(listener.name), hasContents(DEFAULT_MESSAGE))
    )
  })

  Then('{actor} should hear nothing', async function (listener) {
    return 'pending'
  })
})
