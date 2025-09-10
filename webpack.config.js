/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const entry = './src/index.ts';

const webConfig = {
  mode: 'production',
  target: 'web',
  entry,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      stream: false,
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'iost.min.js',
    library: 'IOST',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  optimization: { minimize: true },
  devtool: false,
};

const nodeConfig = {
  mode: 'production',
  target: 'node',
  entry,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `index.js`,
    libraryTarget: 'commonjs2',
  },
  devtool: false,
};

module.exports = [webConfig, nodeConfig];
