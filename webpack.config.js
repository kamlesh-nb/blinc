const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

var config = {
  devtool: 'source-map',
  module: {},
};
var mode = 'production'
var blincConfig = Object.assign({}, config, {
  name: "blinc",
  mode: mode,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  plugins: [
    new CompressionPlugin({
      filename: 'blinc.gz',
      algorithm: 'gzip',
      compressionOptions: {
        level: 1,
      },
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
});
var tagsConfig = Object.assign({}, config, {
  name: "tags",
  mode: mode,
  entry: "./src/tags/index.js",
  output: {
    path: path.resolve(__dirname, "build/tags"),
    filename: "index.js",
  },
  plugins: [
    new CompressionPlugin({
      filename: 'tags.gz',
      algorithm: 'gzip',
      compressionOptions: {
        level: 1,
      },
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
});

var routerConfig = Object.assign({}, config, {
  name: "router",
  mode: mode,
  entry: "./src/router/index.js",
  output: {
    path: path.resolve(__dirname, "build/router"),
    filename: "index.js",
  },
  plugins: [
    new CompressionPlugin({
      filename: 'router.gz',
      algorithm: 'gzip',
      compressionOptions: {
        level: 1,
      },
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
});

var cssConfig = Object.assign({}, config, {
  name: "css",
  mode: mode,
  entry: "./src/css/index.js",
  output: {
    path: path.resolve(__dirname, "build/css"),
    filename: "index.js",
  },
  plugins: [
    new CompressionPlugin({
      filename: 'css.gz',
      algorithm: 'gzip',
      compressionOptions: {
        level: 1,
      },
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
});

module.exports = [blincConfig, tagsConfig, routerConfig, cssConfig];
