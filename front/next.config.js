const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withPlugins = require('next-compose-plugins');
const withCSS = require('next-css-unpluggable');

const tsIncludes = require('./.workarounds/ts-includes');

module.exports = withPlugins(
  [
    [
      withTypescript,
      {
        webpack: tsIncludes,
      },
    ],
    [
      withCSS,
      {
        cssModules: true,
      },
    ],
    {
      publicRuntimeConfig: {
        backUrl: process.env.BACK_URL || 'http://localhost:3000',
        googleClientId:
          process.env.GOOGLE_CLIENT_ID ||
          '619616345812-bi543g7ojta4uqq4kk1ccp428pik8hp8.apps.googleusercontent.com',
      },
    },
  ],
  {
    webpack(config, options) {
      // Do not run type checking twice:
      if (options.isServer) {
        config.plugins.push(new ForkTsCheckerWebpackPlugin());
      }

      return config;
    },
    distDir: '../dist/front',
  },
);
