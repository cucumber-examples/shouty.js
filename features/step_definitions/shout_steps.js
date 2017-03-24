const assert = require('assert')
const {defineSupportCode} = require('cucumber')
const {Task, Question} = require('../../lib/screenplay')
const Shouty = require('../../lib/shouty')

const {TalkToShoutyAPI, TalkToRestAPI} = require('../support/abilities')

class Start {
  static atLocation(location) {
    if (process.env.SHOUTY_ADAPTER === 'rest')
      return new StartViaRestAPI(location)
    else
      return new StartViaDomainAPI(location)
  }
}

class StartViaRestAPI extends Task {
  static atLocation(location) {
    return new this(location)
  }

  constructor(location) {
    super()
    this._location = location
  }

  async performAs(actor) {
    // TODO: extract to own task, and use performAs
    return TalkToRestAPI.as(actor).identifyAs({
      as: actor.name,
      at: this._location
    })
  }
}

class StartViaDomainAPI extends Task {
  static atLocation(location) {
    return new this(location)
  }

  constructor(location) {
    super()
    this._location = location
  }

  async performAs(actor) {
    // TODO: extract to own task, and use performAs
    return TalkToShoutyAPI.as(actor).identifyAs({
      as: actor.name,
      at: this._location
    })
  }
}

class Shout {
  static message(message) {
    if (process.env.SHOUTY_ADAPTER === 'rest')
      return new ShoutViaRestAPI(message)
    else
      return new ShoutViaDomainAPI(message)
  }
}

class ShoutViaRestAPI extends Task {
  constructor(message) {
    super()
    this._message = message
  }

  async performAs(actor) {
    return TalkToRestAPI.as(actor).shout(this._message)
  }
}

class ShoutViaDomainAPI extends Task {
  constructor(message) {
    super()
    this._message = message
  }

  async performAs(actor) {
    return TalkToShoutyAPI.as(actor).shout(this._message)
  }
}

class Verify {
  static lastMessageFrom(personName, match) {
    if (process.env.SHOUTY_ADAPTER === 'rest')
      return new Check(LastHeardMessageViaRestAPI.from(personName), match)
    else
      return new Check(LastHeardMessageViaDomainAPI.from(personName), match)
  }
}

class Check extends Task {
  static that(question, match) {
    return new this(question, match)
  }

  constructor(question, match) {
    super()
    this._question = question
    this._match = match
  }

  async performAs(actor) {
    const answer = await actor.answers(this._question)
    return this._match(answer)
  }
}

class LastHeardMessageViaDomainAPI extends Question {
  static from(shouterName) {
    return new this(shouterName)
  }

  constructor(shouterName) {
    super()
    this._shouterName = shouterName
  }

  async answeredBy(actor) {
    const heardMessages = await TalkToShoutyAPI.as(actor).getMessagesHeard()
    // TODO: filter messages, make sure it was sent by this._shouterName
    return heardMessages[heardMessages.length - 1]
  }
}

class LastHeardMessageViaRestAPI extends Question {
  static from(shouterName) {
    return new this(shouterName)
  }

  constructor(shouterName) {
    super()
    this._shouterName = shouterName
  }

  async answeredBy(actor) {
    const heardMessages = await TalkToRestAPI.as(actor).getMessagesHeard()
    // TODO: filter messages, make sure it was sent by this._shouterName
    return heardMessages[heardMessages.length - 1]
  }
}


const DEFAULT_MESSAGE = 'Hi folks!!!'

const hasContents = expected => actual => assert.equal(actual, expected)

defineSupportCode(({Before, Given, When, Then}) => {
  let shouty

  Before(function () {
    shouty = new Shouty()
  })

  Given('{actor} is at {int}, {int}', async function (actor, x, y) {
    await actor.attemptsTo(
      Start.atLocation({x, y, as: actor.name})
    )
  })

  When('{actor} shouts', async function (shouter) {
    await shouter.attemptsTo(
      Shout.message(DEFAULT_MESSAGE)
    )
  })

  Then('{actor} should hear Sean', async function (listener) {
//    await listener.attemptsTo(
//      Check.that(LastHeardMessage.from('Sean'), hasContents(DEFAULT_MESSAGE))
//    )
    await listener.attemptsTo(
      Verify.lastMessageFrom('Sean', hasContents(DEFAULT_MESSAGE))
    )
  })

  Then('{actor} should hear nothing', async function (listener) {
    return 'pending'
  })

})
