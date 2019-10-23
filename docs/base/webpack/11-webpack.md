---
title: 全局变量引入问题
---

## 全局变量引入问题  

>  1.安装 jquery

```
yarn add jquery
```

>  2.安装暴露全局的loader 内联的loader

```
yarn add expose-loader
```

>  loader分为几类  

```
1:pre 前面执行的loader  
2:normal 普通loader  
3:内联 loader 
4:后置 postloader
```

>  这样在index.js 内 就可以看到 window.jquery 了  暴露了全局的函数

>  多种方式引入第三方模块

```
1. expose-loader  暴露到window上
2. providePlugin  给每个人提供一个 $
3. 引入的js  脚本不打包
```

>  webpack.config.js

```
// webpack 是node 写出来的 node的写法
let path = require('path');  //内置模块
//console.log(path.resolve('build'));   //f:\webpack-demo\build
let HtmlwebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');

module.exports = {  //导出的配置文件
/*   optimization:{  //优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,  //是否用缓存
        parallel: true, //是否是并发打包的 一起压缩多个
        sourceMap: true    //源码映射
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }, */  //开发模式直接跳过优化项
  mode:'development',       //模式 默认两种 生产环境  production  开发环境 development
  entry:'./src/index.js',   //入口 从什么位置开始打包 可以写相对路径
  output:{                  //出口
    filename:'bundle.js', 
    path:path.resolve(__dirname,'build'),  //路径必须是一个绝对路径 resolve相对路径解析为绝对路径
  },
  plugins:[    //数组 放着所有的webpack插件
    new HtmlwebpackPlugin({
      template:'./src/index.html',   //模板的路径
      filename:'index.html',       //打包出来的文件名字
    }),
    new MiniCssExtractPlugin({
      filename:'main.css',
    }),
/*     new webpack.ProvidePlugin({ //在每个模块中都注入$
      $:'jquery'
    }) */
  ],
  externals:{    //这个模块告诉脚本 jquery 是外部模块 无需打包
    jquery:'$'
  },
  module:{ //模块
    // loader 特点 希望单一 用法 字符串只用一个loader 多个loader需要 [], 从右往左执行 从下往上执行
    rules:[  //规则 css-loader 解析@import这种语法 style-loader 把css插入head的标签中
/*       {   //这就是个代码校验 来检查是否错误
        test:/\.js$/,
        use:{
          loader:'eslint-loader',
          options:{
            enforce:'pre'  //强制在普通验证之前执行  post就是在普通之后执行
          }
        }
      }, */
/*       {
        test:require.resolve('jquery'),
        use:'expose-loader?$'
      }, */
      {
        test:/\.js$/,   //normal  普通的loader
        use:{
          loader:'babel-loader',
          options:{   //用babel-loader 需要把es6转为es5
            presets:[  //预设
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include:path.resolve(__dirname,'src'),  //包括
        exclude: /node_modules/   //排除
      },
      {
        test: /\.css$/,   //可以处理css
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',   
          'postcss-loader'   //先处理postcss 再处理css
        ]
      },
      {
        test: /\.less$/,   //可以处理less
        use:[
          MiniCssExtractPlugin.loader,
           'css-loader',  //@import  解析路径
           'postcss-loader', //加前缀
           'less-loader'   //把less -> css
        ]
      }
    ]
  }
}
```

>  index.js 

```
/* import $ from 'jquery'; */

// expose-loader 暴露 全局的loader 内联的loader
//loader 分为: pre 前面执行的loader  normal 普通loader  内联loader 后置 postloader
console.log($);  //在你每个模块中注入 $对象
```

>  index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body{ background: pink; }
  </style>
  <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
</head>
<body>
  <!-- 模板插入脚本 然后生成在build目录下 -->
  <div>内容</div>
</body>
</html>
```