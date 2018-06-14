/**
 * @fileoverview Catch strings that aren't marked for translation
 * @author Rami Valta
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require(`../is-valid-icu-message-syntax`)
const RuleTester = require(`eslint`).RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run(`is-valid-icu-message-syntax`, rule, {
  valid: [
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        <FormattedMessage id='asdjl'`,
        `            description='asdjfl'`,
        `            defaultMessage='foobar'`,
        `        />`,
        `      </div>`,
        `    );`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`
    },
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        <FormattedMessage id='asdjl'`,
        `            description='asdjfl'`,
        `            defaultMessage='{from}-{to} of {total, plural, one {# message} other {# messages}}'`,
        `        />`,
        `      </div>`,
        `    );`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`
    }
  ],

  invalid: [
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        <FormattedMessage id='asdjl'`,
        `            description='asdjfl'`,
        `            defaultMessage='foo { bar'`,
        `        />`,
        `      </div>`,
        `    );`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Invalid ICU Message syntax in defaultMessage: Expected ",", "}" or [^ \\t\\n\\r,.+={}#] but end of input found.` }]
    }
  ]
})
