const { defineSupportCode } = require('cucumber')

function CustomWorld() {
}

defineSupportCode(function({ setWorldConstructor }) {
  setWorldConstructor(CustomWorld)
})
