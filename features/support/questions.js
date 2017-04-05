const { screenplay } = require('../../lib/screenplay')
const { getCoreAbilityAs } = require('./abilities')

module.exports = screenplay( ({ question }) => {
  question('lastHeardMessageFrom', shouterName => {
    return async actor => {
      const heardMessages = await getCoreAbilityAs(actor).getMessagesHeard()
      // TODO: filter messages, make sure it was sent by this._shouterName
      return heardMessages[heardMessages.length - 1]
    }
  })
})

