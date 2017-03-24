const assert = require('assert')
const {defineSupportCode} = require('cucumber')
const {Task, Question} = require('../../lib/screenplay')
const Shouty = require('../../lib/shouty')
const {TalkToShoutyAPI, TalkToRestAPI} = require('../support/abilities')

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

function startAtLocation(location) {
  return async (actor) => getCoreAbilityAs(actor).identifyAs({
    as: actor.name,
    at: location
  })
}

function shoutMessage(message) {
  return async actor => getCoreAbilityAs(actor).shout(message)
}

function checkThat(question, match) {
  return async actor => {
    const answer = await actor.answers(question)
    return match(answer)
  }
}

function lastHeardMessageFrom(shouterName) {
  return async actor => {
    const heardMessages = await getCoreAbilityAs(actor).getMessagesHeard()
    // TODO: filter messages, make sure it was sent by this._shouterName
    return heardMessages[heardMessages.length - 1]
  }
}

function getCoreAbility() {
  if (process.env.SHOUTY_ADAPTER === 'rest')
    return TalkToRestAPI
  else
    return TalkToShoutyAPI
}

function getCoreAbilityAs(actor) {
  return getCoreAbility().as(actor)
}