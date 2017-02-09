const {defineSupportCode} = require('cucumber')
const Shouty = require('../../lib/shouty')

function CustomWorld() {
  this.shouty = new Shouty()
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})
