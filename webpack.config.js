const path = require('path');

const config = {
  mode: 'production',
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  }
}

var blincConfig = Object.assign({}, config, {
    name: "blinc",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js"
    },
});
var tagsConfig = Object.assign({}, config,{
    name: "tags",
    entry: "./src/tags/index.js",
    output: {
        path: path.resolve(__dirname, 'dist/tags'),
        filename: "index.js"
    },
});

module.exports = [blincConfig, tagsConfig]