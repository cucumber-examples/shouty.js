const assert = require('assert')
const fetch = require('node-fetch')
const Coordinate = require('../../lib/coordinate')

class TalkToShoutyAPI {
  static as(actor) {
    return actor.abilityTo(this)
  }

  static using(shouty) {
    return new this(shouty)
  }

  constructor(shouty) {
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

class TalkToRestAPI {
  static as(actor) {
    return actor.abilityTo(this)
  }

  static using(baseUrl) {
    return new this(baseUrl)
  }

  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  async identifyAs({ as: username, at: { x, y } }) {
    this._username = username
    const response = await fetch(`${this._baseUrl}/${username}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ x, y })
    })
    await responseIsOk(response)
  }

  async shout(message) {
    const response = await fetch(`${this._baseUrl}/${this._username}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    await responseIsOk(response)
  }

  async getMessagesHeard() {
    const response = await fetch(`${this._baseUrl}/${this._username}/messages`)
    await responseIsOk(response)
    return Array.from(new Map(await response.json()).values())
  }
}

module.exports = {
  TalkToShoutyAPI,
  TalkToRestAPI
}
