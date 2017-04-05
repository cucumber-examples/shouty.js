'use strict'

const util = require('util')
const { defineSupportCode: cucumberDefineSupportCode } = require('cucumber')

const log = console.log.bind(console)

function screenplay(define) {
  const definitions = {}

  function task(name, fn) {
    definitions[name] = (...args) => {
      const activity = fn(...args)
      activity.__meta = {
        name,
        icon: '📋',
        args
      }
      return activity
    }
  }

  function question(name, fn) {
    definitions[name] = (...args) => {
      const activity = fn(...args)
      activity.__meta = {
        name,
        icon: '🔬',
        args
      }
      return activity
    }
  }

  function interaction(name, fn) {
    definitions[name] = (...args) => {
      const activity = fn(...args)
      activity.__meta = {
        name,
        icon: '🕹',
        args
      }
      return activity
    }
  }

  define( { task, question } )
  return definitions
}

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
      this._log(`${activity.__meta.icon} ${activity.__meta.name} ${JSON.stringify(activity.__meta.args)}`)
      result = await activity(this)
    }
    this._stackLevel -= 1
    return result
  }

  async answers(question) {
    this._stackLevel += 1
    this._log(`${question.__meta.icon} ${question.__meta.name} ${JSON.stringify(question.__meta.args)}`)
    const answer = await question(this)
    this._log(`👩‍🔬 ${util.inspect(answer, { colors: true, breakLength: Infinity })}`, 1)
    this._stackLevel -= 1
    return answer
  }

  _log(string, indentationOffset = 0) {
    log(`${this.name} ${new Array(this._stackLevel + indentationOffset).join('  ')} ${string}`)
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
  screenplay,
  defineSupportCode
}
