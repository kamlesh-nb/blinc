const path = require('path');

  module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: 'blinc',
      libraryTarget: 'commonjs2',
    },

  }