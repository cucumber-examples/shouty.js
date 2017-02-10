const MESSAGE_RANGE = 1000

class Shouty {
  constructor() {
    this.locationsByShouter = new Map()
    this.messagesByShouter = new Map()
  }

  setLocation(person, coordinate) {
    this.locationsByShouter.set(person, coordinate)
  }

  shout(person, message) {
    this.messagesByShouter.set(person, message)
  }

  getMessagesHeardBy(listener) {
    const messagesHeard = new Map()

    for (const [shouter, message] of this.messagesByShouter) {
      const shouterLocation = this.locationsByShouter.get(shouter)
      const listenerLocation = this.locationsByShouter.get(listener)

      if (shouterLocation.distanceFrom(listenerLocation) < MESSAGE_RANGE) {
        messagesHeard.set(shouter, message)
      }
    }

    return messagesHeard
  }
}

module.exports = Shouty
