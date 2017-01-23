module.exports = function Shouty() {
  const MESSAGE_RANGE = 1000
  this.locations = {}
  this.messages = {}

  this.setLocation = function(person, coordinate) {
    this.locations[person] = coordinate
  }

  this.shout = function(person, message) {
    this.messages[person] = message
  }

  this.getMessagesHeardBy = function(listener) {
    var result = {}

    Object.keys(this.messages).forEach(shouter => {
        var message = this.messages[shouter]
        var distance = this.locations[listener].distanceFrom(this.locations[shouter])

        if(distance < MESSAGE_RANGE) {
          result[shouter] = message
        }
    })

    return result
  }
};
