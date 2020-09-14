const { setWorldConstructor } = require('@cucumber/cucumber')

function CustomWorld() {
}

setWorldConstructor(CustomWorld)
