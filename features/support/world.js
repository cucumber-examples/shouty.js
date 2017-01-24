var {defineSupportCode} = require('cucumber');
import { Shouty } from '../../lib';

function CustomWorld() {
  this.shouty = new Shouty()
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
});
