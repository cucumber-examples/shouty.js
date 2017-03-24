const assert = require('assert')
const fetch = require('node-fetch')
const { Ability } = require('../../lib/screenplay')
const Coordinate = require('../../lib/coordinate')

class TalkToShoutyAPI extends Ability {
  static as(actor) {
    return actor.abilityTo(this)
  }

  static using(shouty) {
    return new this(shouty)
  }

  constructor(shouty) {
    super()
    this._shouty = shouty
    this._username = null
  }

  async identifyAs({ as: username, at: { x, y } }) {
    this._username = username
    await this._shouty.setLocation(username, new Coordinate(x, y))
  }

  async shout(message) {
    await this._shouty.shout(this._username, message)
  }

  async getMessagesHeard() {
    return Array.from(this._shouty.getMessagesHeardBy(this._username).values())
  }
}

let responseIsOk = function (response) {
  return new Promise((resolve, reject) => {
    if (response.ok)
      return resolve()

    response.body.pipe(process.stderr, { end: false })
    response.body.on('end', () => {
      reject(new Error('Response was not ok'))
    })
  })
}
class TalkToRestAPI extends Ability {
  static as(actor) {
    return actor.abilityTo(this)
  }

  static using(baseUrl) {
    return new this(baseUrl)
  }

  constructor(baseUrl) {
    super()
    this._baseUrl = baseUrl
  }

  async identifyAs({ as: username, at: { x, y } }) {
    this._username = username
    const response = await fetch(`${this._baseUrl}/${username}/location`, {
      method: 'POST',
      body: { x, y }
    })
    await responseIsOk(response)
  }

  async shout(message) {
    const response = await fetch(`${this._baseUrl}/${this._username}/messages`, {
      method: 'POST',
      body: message
    })
    await responseIsOk(response)
  }
}

module.exports = {
  TalkToShoutyAPI,
  TalkToRestAPI
}
