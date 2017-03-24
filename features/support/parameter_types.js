const { defineSupportCode } = require('cucumber')

defineSupportCode(({ defineParameterType, Before }) => {
  let world
  Before(function () { world = this })

  defineParameterType({
    regexp: /[A-Z]\w+/,
    transformer: actorName => world.stage.actorNamed(actorName),
    typeName: 'actor'
  })
})
