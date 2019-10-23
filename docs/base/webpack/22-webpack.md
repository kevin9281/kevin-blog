---
title: webpack 优化 noParse
---

## webpack 优化 noParse

>  防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

>  从第一步开始创建 webpack 

>  1.初始化一个 package.json

```
yarn init -y
```

>  2.安装webpack 一些包

```
yarn add webpack webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react -D
```

>  3.根目录创建 webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  entry:'./src/index.js',
  module:{
    rules:[
      {
        test:/\.js$/,use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    })
  ]
}
```

>  4.创建 根目录 src 文件夹 src / index.js

>  5.创建 根目录 public 文件夹 public / index.html

>  6.安装 jQuery

```
yarn add jquery
```

>  7.src / index.js

```
import jquery from 'jquery'
```

>  8.第一个优化点 webpack.config.js module.exports = { module: {

```
noParse:/jquery/,   //可以不去解析某些包 不去解析jquery中的依赖库
```

>  9.安装一个专门做时间的库 moment

```
yarn add moment
```

>  src/ index.js

```
import moment from 'moment';
```

>  10.安装开发服务器 server

```
yarn add webpack-dev-server -D
```
