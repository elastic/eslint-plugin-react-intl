module.exports = {
  rules: {
    'string-is-marked-for-translation': require(`./lib/rules/string-is-marked-for-translation`),
    'is-valid-icu-message-syntax': require(`./lib/rules/is-valid-icu-message-syntax`),
    'no-inline-translations-with-formatmessage': require(`./lib/rules/no-inline-translations-with-formatmessage`)
  },
  rulesConfig: {
    'string-is-marked-for-translation': 0,
    'is-valid-icu-message-syntax': 0,
    'no-inline-translations-with-formatmessage': 1
  }
}
