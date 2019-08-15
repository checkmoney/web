const customMedia = require('postcss-custom-media');
const nesting = require('postcss-nesting');
const normalize = require('postcss-normalize');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [nesting, normalize, presetEnv, customMedia],
};
