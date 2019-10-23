---
title: 实现多线程打包
---

## 实现多线程打包

## 安装 happypack  

```
yarn add happypack
```

>  如果项目不大的话 是不需要多线程的
>  cs 和 js 都使用多线程打包

```
yarn add style-loader css-loader
```

>  配置 webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

//模块 happypack 可以实现多线程来打包 进程
let Happypack = require('happypack');

module.exports = {
  mode:'development',
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
        use:'Happypack/loader?id=js'
      },
      {
        test:/\.css$/,
        use:'Happypack/loader?id=css'
      }
    ]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new Happypack({
      id:'css',
      use:['style-loader','css-loader']
    }),
    new Happypack({
      id:'js',
      use:[{
        loader:'babel-loader',
        options:{
          presets:[
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    }),
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