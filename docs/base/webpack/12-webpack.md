---
title: 图片处理
---

## 图片处理  

>  webpack 打包图片

```
1. 在js 中创建图片来引入
2. 在css 引入 background (' url ')
3. <img src = " " alt = " ">
```

>  需要引入图片 必须用  require 或者 import 语法导入进来 才能进行打包js  打包图片

>  1.安装 

```
yarn add file-loader -D
```

```
rules:[  
  {
    test:/\.(png|jpg|gif)$/,
    use:'file-loader'
  },
```

>  2.在 js 中 创建图片来引入 

```
//file-loader 默认会在内部生成一张图片 到build目录下 把生成的图片的名字返回回来
import logo from './300.jpg';  //把图片引入 返回结果是一个新的图片地址
let image = new Image();
console.log(logo);
image.src = logo;
document.body.appendChild(image);
```

>  3.在 index.js 中  导入css / less 中的 css图片

```
import './index.less';
import './index.css';
```

>   index.less

```
body{
  
  div{
    border: 1px solid #dadade;
    width: 500px;
    height: 500px;
    background: url("./300.jpg"); 
  }
}
```

>  4.安装  专门解析html 来编译图片

```
yarn add html-withimg-loader -D
```
```
rules:[  
  {
    test:/\.html$/,
    use:'html-withimg-loader'
  },
```

>  5.图片比较小 换成becs 64

>  安装

```
yarn add url-loader -D
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
   optimization:{  //优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,  //是否用缓存
        parallel: true, //是否是并发打包的 一起压缩多个
        sourceMap: true    //源码映射
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },  //开发模式直接跳过优化项
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
    })
  ],
  externals:{    //这个模块告诉脚本 jquery 是外部模块 无需打包
    jquery:'$'
  },
  module:{ //模块
    // loader 特点 希望单一 用法 字符串只用一个loader 多个loader需要 [], 从右往左执行 从下往上执行
    rules:[  //规则 css-loader 解析@import这种语法 style-loader 把css插入head的标签中
      {
        test:/\.html$/,
        use:'html-withimg-loader'
      },
/*       {
        test:/\.(png|jpg|gif)$/,
        use:'file-loader'
      }, */
      {
        test:/\.(png|jpg|gif)$/,
        //做一个限制 当我们的图片 小于多少k的时候用base64来转化
        //大于这个限制的时候 用file-loader 产出真实的图片
        use:{
          loader: 'url-loader',
          options:{
            limit:200*1024   //当图片小于200k 全部都转化base64
          }
        }
      },
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

>  src/index.html 

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
  <img src="./300.jpg">
</body>
</html>
```

>  src/index.js 

```
//在js 中创建图片来引入
//file-loader 默认会在内部生成一张图片 到build目录下 把生成的图片的名字返回回来
import logo from './300.jpg';  //把图片引入 返回结果是一个新的图片地址
let image = new Image();
console.log(logo);
image.src = logo;
document.body.appendChild(image);
//在css 引入 background (' url ')
import './index.less';
import './index.css';
//<img src = " " alt = " ">
```

>  src/index.less

```
@import './a.css';
body{
  
  div{
    border: 1px solid #dadade;
    width: 500px;
    height: 500px;
    background: url("./300.jpg"); 
  }
}
```