const path = require('path');

var config = {
  module: {}
}

var blinc = Object.assign({}, config, {
  name: 'blinc',
  entry: './src/index.js',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'index.js',
      library: 'blinc',
      libraryTarget: 'umd',
    }
})

var types = Object.assign({}, config, {
  name: 'types',
  entry: './src/types.js',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'types.js',
      library: 'types',
      libraryTarget: 'umd',
    }
})
module.exports = [
  blinc, types,       
];
  // module.exports = {
  //   entry: './src/index.js',
  //   devtool: 'source-map',
  //   output: {
  //     path: path.resolve(__dirname, './'),
  //     filename: 'index.js',
  //     library: 'blinc',
  //     libraryTarget: 'commonjs2',
  //   }
  // }