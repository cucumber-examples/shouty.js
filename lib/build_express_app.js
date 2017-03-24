const express = require('express')
const bodyParser = require('body-parser')
const Coordinate = require('./coordinate')

const buildExpressApp = (shouty) => {
  const app = express()
  app.use(bodyParser.json())

  app.post('/:personName/location', (req, res) => {
    shouty.setLocation(req.params.personName, new Coordinate({
      x: req.body.x,
      y: req.body.y,
    }))
    res.end()
  })

  app.post('/:personName/messages', (req, res) => {
    shouty.shout(req.params.personName, req.body.message)
    res.end()
  })

  app.get('/:personName/messages', (req, res) => {
    const messages = shouty.getMessagesHeardBy(req.params.personName)
    res.send(Array.from(messages)).end()
  })

  return app
}

module.exports = buildExpressApp
