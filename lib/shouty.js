const MESSAGE_RANGE = 1000

class Shouty {
  constructor() {
    this.locations = new Map()
    this.messages = new Map()
  }

  setLocation(person, coordinate) {
    this.locations.set(person, coordinate)
  }

  shout(person, message) {
    this.messages.set(person, message)
  }

  getMessagesHeardBy(listener) {
    var msgHeard = new Map()

    for(let [shouter, msg] of this.messages) {
      var shouterPos = this.locations.get(shouter)
      var listenerPos = this.locations.get(listener)

      if(shouterPos.distanceFrom(listenerPos) < MESSAGE_RANGE) {
        msgHeard.set(shouter, msg)
      }
    }

    return msgHeard
  }
}

module.exports = Shouty
