var {defineSupportCode} = require('cucumber');
var Shouty = require('../../lib/shouty');

function CustomWorld() {
  this.shouty = new Shouty()
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
});
