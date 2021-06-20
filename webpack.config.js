'use strict';

const CopyPlugin = require('copy-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const pkg = require('./package.json');

const config = {
  entry: {
    background: './src/background.js',
    options: './src/options.jsx',
    'scroll-to-image': './src/scroll-to-image.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        loader: 'babel-loader',
        test: /\.(?:js|jsx)$/u
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['options'],
      meta: { viewport: 'width=device-width,initial-scale=1' },
      scriptLoading: 'defer',
      template: './src/index.ejs',
      title: `${pkg.name} options`
    }),
    new CopyPlugin({
      patterns: [
        {
          context: './src/assets',
          from: '**/*'
        }
      ]
    })
  ],
  resolve: { extensions: ['.js', '.jsx'] }
};

module.exports = config;
