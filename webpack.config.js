const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

const {
  resolveTsconfigPathsToAlias,
} = require('./webpack/resolve-tsconfig-path-to-webpack-alias');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: require.resolve('babel-loader'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /antd\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: { modules: true, importLoaders: 1 },
          },
          require.resolve('postcss-loader'),
        ],
      },
      {
        test: /antd\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      ...resolveTsconfigPathsToAlias(),
      'lodash-es': 'lodash',
    },
    plugins: [
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  stats: { children: false },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new EnvironmentPlugin({
      BACK_URL: '',
      STATS_URL: '',
      GOOGLE_CLIENT_ID: '',
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['ru'],
    }),
  ],
};
