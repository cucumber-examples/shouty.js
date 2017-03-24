'use strict'

const util = require('util')
const { defineSupportCode: cucumberDefineSupportCode } = require('cucumber')

const log = console.log.bind(console)

class Stage {
  constructor() {
    this._casts = []
    this._actorsByName = new Map()
  }

  setCast(cast) {
    this._casts.push(cast)
    return this
  }

  actorNamed(actorName) {
    if (this._actorsByName.has(actorName))
      return this._actorsByName.get(actorName)

    for (const cast of this._casts) {
      const actor = cast.callActor(actorName)
      if (actor) {
        this._actorsByName.set(actorName, actor)
        return actor
      }
    }
    throw new Error(`${actorName} is not a known actor.`)
  }
}

module.exports = { Stage }
