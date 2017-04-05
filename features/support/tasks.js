const { screenplay } = require('../../lib/screenplay')
const { getCoreAbilityAs } = require('./abilities')

module.exports = screenplay( ({ task, question }) => {
  task('startAtLocation', location => {
    return async actor => getCoreAbilityAs(actor).identifyAs({
      as: actor.name,
      at: location
    })
  })

  task('shoutMessage', message  => {
    return async actor => getCoreAbilityAs(actor).shout(message)
  })

  task('checkThat', (question, match)  => {
    return async actor => {
      const answer = await actor.answers(question)
      return match(answer)
    }
  })

  question('lastHeardMessageFrom', shouterName => {
    return async actor => {
      const heardMessages = await getCoreAbilityAs(actor).getMessagesHeard()
      // TODO: filter messages, make sure it was sent by this._shouterName
      return heardMessages[heardMessages.length - 1]
    }
  })
})
