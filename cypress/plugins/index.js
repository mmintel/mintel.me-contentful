const htmlvalidate = require('cypress-html-validate/dist/plugin')
const htmlValidateConfig = require('../../htmlvalidate.config');

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  htmlvalidate.install(on, htmlValidateConfig)

  return config
}