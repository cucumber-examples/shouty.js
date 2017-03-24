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
      const icon = activity instanceof Interaction ? '🕹' : '📋'
      this._log(`${icon} ${activity}`)
      result = await activity.performAs(this)
    }
    this._stackLevel -= 1
    return result
  }

  async answers(question) {
    this._stackLevel += 1
    this._log(`🔬 ${question}`)
    const answer = await question.answeredBy(this)
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

class Activity {}

class Task extends Activity {
  performAs(actor) {
    throw new Error(`Implement me, actor ${actor.name} wants to perform ${this.name}.`)
  }

  toString() {
    const props = {}
    for (const prop of Object.getOwnPropertyNames(this))
      props[prop] = this[prop]
    return `${this.constructor.name} (${util.inspect(props, { colors: true, breakLength: Infinity })})`
  }
}

class Interaction extends Activity {
  performAs(actor) {
    throw new Error(`Implement me, actor ${actor.name} wants to perform ${this.name}.`)
  }

  toString() {
    const props = {}
    for (const prop of Object.getOwnPropertyNames(this))
      props[prop] = this[prop]
    return `${this.constructor.name} (${util.inspect(props, { colors: true, breakLength: Infinity })})`
  }
}

class Question {
  async answeredBy(actor) {
    throw new Error(`Implement me, ${actor.name} wants to to answer the question "${this.constructor.name}".`)
  }

  toString() {
    const props = {}
    for (const prop of Object.getOwnPropertyNames(this))
      props[prop] = this[prop]
    return `${this.constructor.name} (${util.inspect(props, { colors: true, breakLength: Infinity })})`
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
  Interaction,
  Question,
  Stage,
  Task,
  defineSupportCode
}
