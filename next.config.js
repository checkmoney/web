const withTypescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');
const withCSS = require('next-css-unpluggable');

const tsIncludes = require('./.workarounds/ts-includes');

module.exports = withPlugins([
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
      backUrl: process.env.BACK_URL || 'https://api.checkmoney.space',
      statsUrl: process.env.STATS_BACK_URL || 'https://stats.checkmoney.space',
      googleClientId:
        process.env.GOOGLE_CLIENT_ID ||
        '619616345812-bi543g7ojta4uqq4kk1ccp428pik8hp8.apps.googleusercontent.com',
    },
  },
]);
