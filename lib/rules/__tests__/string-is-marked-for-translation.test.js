/**
 * @fileoverview Catch strings that aren't marked for translation
 * @author Rami Valta
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require(`../string-is-marked-for-translation`)
const RuleTester = require(`eslint`).RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run(`string-is-marked-for-translation`, rule, {
  valid: [
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        <FormattedMessage id='asdjl'`,
        `            description='asdjfl'`,
        `            defaultMessage='asdasdasd'`,
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
        `    return (<div>+()</div>);`, // Non-letter characters should be allowed
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
        `    return (<div>test</div>);`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    },
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (<div>æøå</div>);`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    },
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (<div>{'test'}</div>);`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    },

    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    const foo = (<div>test</div>);`,
        `    return foo;`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    }, {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    const varObjectTest = { testKey : (<div>test</div>) };`,
        `    return varObjectTest.testKey;`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    }, {
      code: [
        `var Hello = React.createClass({`,
        `  foo: (<div>hello</div>),`,
        `  render() {`,
        `    return this.foo;`,
        `  },`,
        `});`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    }, {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        asdjfl`,
        `      </div>`,
        `    );`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    }, {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        asdjfl`,
        `        test`,
        `        foo`,
        `      </div>`,
        `    );`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    },
    {
      code: [
        `class Comp1 extends Component {`,
        `  render() {`,
        `    return (`,
        `      <div>`,
        `        <FormattedMessage id="erodfasf" defaultMessage="houheirh"/>`,
        `        <h4>FALSELS</h4>`,
        `      </div>`,
        `    );`,
        `  }`,
        `}`
      ].join(`\n`),
      parser: `babel-eslint`,
      errors: [{ message: `Found string literal inside JSX, should be inside a <Formatted* /> component` }]
    }
  ]
})
