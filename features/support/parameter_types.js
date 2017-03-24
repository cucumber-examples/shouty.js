const { defineSupportCode } = require('cucumber')

defineSupportCode(({ defineParameterType }) => {
  defineParameterType({
    regexp: /[A-Z]\w+/,
    transformer: actorName => actorName.toUpperCase(),
    typeName: 'actor'
  })
})