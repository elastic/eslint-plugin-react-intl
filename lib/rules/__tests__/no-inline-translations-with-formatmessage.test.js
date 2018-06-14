/**
 * @fileoverview Catch calls to formatMessage() that use a literal translation
 * @author Rory Hunter
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require(`../no-inline-translations-with-formatmessage`)
const RuleTester = require(`eslint`).RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run(`is-valid-icu-message-syntax`, rule, {
  valid: [
    {
      code: `formatMessage(messages.foo)`,
      parser: `babel-eslint`
    }
  ],

  invalid: [
    {
      code: `formatMessage({ id: "foo", defaultMessage: "bar" })`,
      parser: `babel-eslint`,
      errors: [{ message: `Do not call formatMessage() with a literal translation, instead use defineMessages()` }]
    }
  ]
})
