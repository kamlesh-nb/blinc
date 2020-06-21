const babel = require("@babel/core");
const terser = require("terser")
const fs = require('fs');
const cfg = require('./build.config')

cfg.files.forEach(function (file){
  babel.transformFileAsync(file.in, cfg.babelOptions).then(result => {
    fs.writeFile(`${file.out}.js`, result.code, function (err) {
      if (err) throw err;
    });
    
    fs.writeFile(`${file.out}.js.map`, JSON.stringify(result.map), function (err) {
      if (err) throw err;
    });

    var output = terser.minify(result.code)
    fs.writeFile(`${file.out}.min.js`, output.code, function (err) {
      if (err) throw err;
    });
  });
})

console.log('Build completed...');
 

