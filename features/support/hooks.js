const http = require('http')
const Shouty = require('../../lib/shouty')
const buildExpressApp = require('../../lib/build_express_app')
const { defineSupportCode } = require('cucumber')
const { Stage, Cast } = require('../../lib/screenplay')
const { Actor } = require('serenity-js/lib/serenity/screenplay/actor')
const { TalkToShoutyAPI, TalkToRestAPI } = require('./abilities')

class Actors extends Cast {
  constructor({ shouty }) {
    super()
    this._shouty = shouty
  }

  callActor(actorName) {
    if (process.env.SHOUTY_ADAPTER === 'rest')
      return Actor.named(actorName)
        .whoCan(TalkToRestAPI.using('http://localhost:1407'))
    else
      return Actor.named(actorName)
        .whoCan(TalkToShoutyAPI.using(this._shouty))
  }
}

defineSupportCode(({ Before, After }) => {
  let server

  Before(async function () {
    const shouty = new Shouty()

    if (process.env.SHOUTY_ADAPTER === 'rest') {
      const app = buildExpressApp(shouty)
      server = http.createServer(app)
      await new Promise((resolve, reject) => {
        server.listen(1407, err => {
          if (err) return reject(err)
          resolve()
        })
      })
    }

    this.stage = new Stage()
      .setCast(new Actors({ shouty }))
  })

  After(async function () {
    if(server) {
      return new Promise((resolve, reject) => {
        server.close(err => {
          if (err) return reject(err)
          resolve()
        })
      })
    }
  })
})
