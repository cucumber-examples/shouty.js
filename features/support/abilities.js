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

module.exports = {
  TalkToShoutyAPI
}
