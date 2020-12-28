// eslint-disable-next-line no-undef
const { override, addBabelPlugins } = require('customize-cra')

// eslint-disable-next-line no-undef
module.exports = override(
  addBabelPlugins(
    '@babel/plugin-proposal-optional-chaining'
  )
)
