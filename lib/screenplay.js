'use strict'

const util = require('util')
const { defineSupportCode: cucumberDefineSupportCode } = require('cucumber')

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

class Ability {
  get name() { return this.constructor.name }
}

class Actor {
  static named(actorName) {
    return new this(actorName)
  }

  constructor(name) {
    this._name = name
    this._abilities = new Map()
    this._stackLevel = 0
  }

  get name() { return this._name }

  whoCan(...abilities) {
    for (const ability of abilities)
      this._abilities.set(ability.name, ability)

    return this
  }

  can(Ability) {
    return this._abilities.has(Ability.name)
  }

  abilityTo(Ability) {
    if (this.can(Ability))
      return this._abilities.get(Ability.name)
    else
      throw new Error(`${this.name} doesn't know how to ${Ability.name}`)
  }

  async attemptsTo(...activities) {
    this._stackLevel += 1
    let result
    for (const activity of activities) {
      if (typeof activity === 'function'){
        result = await activity(this)
      } else {
        result = await activity.performAs(this)
      }

    }
    this._stackLevel -= 1
    return result
  }

  async answers(question) {
    this._stackLevel += 1
    let answer
    if (typeof question === 'function') {
      answer = await question(this)
    } else {
      answer = await question.answeredBy(this)
    }
    this._stackLevel -= 1
    return answer
  }
}

class Cast {
  callActor(actorName) {
    throw new Error(`Implement me, someone needs an actor named ${actorName}.`)
  }
}

const stageHelpers = {
  Actor
}

const defineSupportCode = (fn) => {
  cucumberDefineSupportCode(cucumberHelpers => fn(Object.assign({}, cucumberHelpers, stageHelpers)))
}

module.exports = {
  Ability,
  Actor,
  Cast,
  Stage,
  defineSupportCode
}
