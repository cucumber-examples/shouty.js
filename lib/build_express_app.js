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
    shouty.shout(req.params.personName, req.body)
    res.end()
  })

  return app
}

module.exports = buildExpressApp