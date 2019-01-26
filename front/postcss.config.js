const nesting = require('postcss-nesting')
const normalize = require('postcss-normalize')
const presetEnv = require('postcss-preset-env')
const customMedia = require('postcss-custom-media')

module.exports = {
  plugins: [nesting, normalize, presetEnv, customMedia],
}
