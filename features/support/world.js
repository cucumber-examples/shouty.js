const { setWorldConstructor } = require('cucumber')

function CustomWorld() {
}

setWorldConstructor(CustomWorld)
