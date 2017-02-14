class SynchronousSnippet {
  build (functionName, pattern, parameters, comment) {
    parameters.pop() // get rid of callback
    return `${functionName}("${pattern}", function (${parameters.join(", ")}) {
  // ${comment}
  return 'pending'
})`
  }
}
module.exports = SynchronousSnippet;
