// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
  function isCallToFormatMessage (node) {
    const callee = node.callee

    switch (callee.type) {
      case `Identifier`:
        return callee.name === `formatMessage`

      case `MemberExpression`:
        return callee.property.name === `formatMessage`

      default:
        return false
    }
  }

  // --------------------------------------------------------------------------
  // Public
  // --------------------------------------------------------------------------

  return {
    CallExpression (node) {
      const args = node.arguments

      if (isCallToFormatMessage(node) && args.length > 0 && args[0].type === `ObjectExpression`) {
        context.report({
          node,
          message: `Do not call formatMessage() with a literal translation, instead use defineMessages()`
        })
      }
    }

  }
}

module.exports.schema = [{
  type: `object`,
  properties: {},
  additionalProperties: false
}]
