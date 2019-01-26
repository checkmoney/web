const withPlugins = require('next-compose-plugins')
const withCSS = require('next-css-unpluggable')
const withTypescript = require('@zeit/next-typescript')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withPlugins(
  [
    [withTypescript],
    [
      withCSS,
      {
        cssModules: true,
      },
    ],
  ],
  {
    webpack(config, options) {
      // Do not run type checking twice:
      if (options.isServer) {
        config.plugins.push(new ForkTsCheckerWebpackPlugin())
      }

      return config
    },
    distDir: '../dist/front',
  },
)
