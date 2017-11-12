'use strict'

const MESSAGE_RANGE = 1000;

class Shouty {
  constructor() {
    this.locationsByShouter = new Map();
    this.shoutsByShouter = new Map();
  }

  setLocation(person, coordinate) {
    this.locationsByShouter.set(person, coordinate);
  }

  shout(person, shout) {
    if(!(person in this.shoutsByShouter)) {
      this.shoutsByShouter[person] = [];
    }
    this.shoutsByShouter[person].push(shout);
  }

  getShoutsHeardBy(listener) {
    const shoutsHeard = new Map();

    for (const [shouter, shouts] of this.shoutsByShouter) {
      const shouterLocation = this.locationsByShouter.get(shouter);
      const listenerLocation = this.locationsByShouter.get(listener);

      if (shouterLocation.distanceFrom(listenerLocation) < MESSAGE_RANGE) {
        shoutsHeard.set(shouter, shouts);
      }
    }

    return shoutsHeard;
  }
}

module.exports = Shouty;
