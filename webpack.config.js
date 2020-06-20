const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

const {
  resolveTsconfigPathsToAlias,
} = require('./webpack/resolve-tsconfig-path-to-webpack-alias');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /antd\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
      {
        test: /antd\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: resolveTsconfigPathsToAlias(),
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
  ],
};
