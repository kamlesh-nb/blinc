const path = require('path');

  module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'index.js',
      library: 'blinc',
      libraryTarget: 'commonjs2',
    }
  }