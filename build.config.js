module.exports = {
  files: [
    { in: "./src/index.js", out: "./build/blinc" },
    { in: "./src/tags/index.js", out: "./build/tags/tags" },
    { in: "./src/css/index.js", out: "./build/css/css" },
    { in: "./src/router/index.js", out: "./build/router/router" },
  ],
  babelOptions: {
    presets: ["@babel/env"],
    babelrc: true,
    configFile: false,
    sourceMaps: true,
    compact: true,
  },
  terserOptions: {
    topLevel: true,
    mangle: {
      properties: true,
    },
    compress:{
      pass: 2
    },
    output: {
      beautify: false,
      preamble: "/* minified */"
  }
  },
};

/*
"blinc": "npx babel src/index.js -o build/blinc.js -s",
    "tags": "npx babel src/tags/index.js -o build/tags/tags.js -s",
    "router": "npx babel src/router/index.js -o build/router/router.js -s",
    "css": "npx babel src/css/index.js -o build/css/css.js -s",
    "babelify": "npm run blinc && npm run tags && npm run router && npm run css",
    "blinc-m": "terser ./build/blinc.js -o ./build/blinc.min.js -c -m",
    "tags-m": "terser ./build/tags/tags.js -o ./build/tags/tags.min.js -c -m",
    "router-m": "terser ./build/router/router.js -o ./build/router/router.min.js -c -m",
    "css-m": "terser ./build/css/css.js -o ./build/css/css.min.js -c -m",
    "minify": "npm run blinc-m && npm run tags-m && npm run router-m && npm run css-m",
    "build": "npm run babelify && npm run minify"
*/
