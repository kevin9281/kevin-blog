---
title: 内置优化功能
---

## 内置优化功能

>  webpack 自动做了两功能 

```
1. tree-shaking 把没用到的代码自动删除
2. scope hosting 作用域提升 
```

>  src / test.js 

```
let sum = ( a,b ) => {
  return a + b + 'sum';
}

let minus = ( a,b ) => {
  return a - b + 'minus';
}

export default {
  sum, minus
}
```

>  src /index.js

```
import calc from './test.js';
// import 在生产环境下 会自动去除掉没用的代码
// 这种方法叫 tree-shaking 方式 把没用到的代码自动删除 必须是import语法才可以

console.log ( calc.sum (1,2) );   //3 sum

//let calc = require('./test.js');
//console.log(calc.default.sum(1,2)); //3 sum
//require 语法不支持 tree-shaking 不会自动删除没用到的语法 会全部打包

//scope hosting 作用域提升 
let a = 1;
let b = 2;
let c = 3;
let d = a+b+c;  //在webpack中会自动省略 可以简化的代码
console.log(d);   //6 使用import 打包可以直接省去表达式计算 直接给出需要的结果
```

>  webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode:'production',
  entry:'./src/index.js',
  devServer:{
    port:3000,
    open:true,
    contentBase:'./dist'
  },
  module:{
    noParse:/jquery/,   //可以不去解析某些包 不去解析jquery中的依赖库
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,  //排除
        include:path.resolve('src'),  //包含
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist','manifest.json')
    }),
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    //从moment 中如果引入了 .locale 就忽略掉不打包 节省空间
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    })
  ]
}
```