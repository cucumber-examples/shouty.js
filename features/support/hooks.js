const Shouty = require('../../lib/shouty')
const { Stage, Cast, Actor, defineSupportCode } = require('../../lib/screenplay')
const { TalkToShoutyAPI } = require('./abilities')

class Actors extends Cast {
  constructor({ shouty }) {
    super()
    this._shouty = shouty
  }

  callActor(actorName) {
    switch (actorName) {
      case 'Lucy': {
        return Actor.named(actorName)
          .whoCan(TalkToShoutyAPI.using(this._shouty))
      }

      case 'Sean': {
        return Actor.named(actorName)
          .whoCan(TalkToShoutyAPI.using(this._shouty))
      }
    }
  }
}

defineSupportCode(({ Before }) => {
  Before(function () {
    const shouty = new Shouty()
    this.stage = new Stage()
      .setCast(new Actors({ shouty }))
  })
})
