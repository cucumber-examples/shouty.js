const { Stage, defineSupportCode } = require('../../lib/screenplay')

defineSupportCode(({ Before }) => {
  Before(function () {
    this.stage = new Stage()
      // .setCast(new CoreConsumers({
      //   accountStore,
      //   acl,
      //   makeUiCorePort: makeProtectedUiCorePort,
      //   messenger
      // }))
  })
})
