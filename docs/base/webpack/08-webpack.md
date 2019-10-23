---
title: 压缩 css
---

## 压缩 css

>  1.安装 压缩css 插件

```
yarn add optimize-css-assets-webpack-plugin -D
```

>  2.安装 压缩js 插件 

```
yarn add uglifyjs-webpack-plugin -D
```

>  3.配置webpack.config.js

```
// webpack 是node 写出来的 node的写法
let path = require('path');  //内置模块
//console.log(path.resolve('build'));   //f:\webpack-demo\build
let HtmlwebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
  },
  mode:'production',       //模式 默认两种 生产环境  production  开发环境 development
  entry:'./src/index.js',   //入口 从什么位置开始打包 可以写相对路径
  output:{                  //出口
    filename:'bundle.[hash:8].js',   //打包后的文件名 :8只显示8个数位  中间添加一个hash 每一次更改就产生一个新的文件 防止覆盖
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
  module:{ //模块
    // loader 特点 希望单一 用法 字符串只用一个loader 多个loader需要 [], 从右往左执行 从下往上执行
    rules:[  //规则 css-loader 解析@import这种语法 style-loader 把css插入head的标签中
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

>  4.注意 现在还不能压缩js  ( 还没有配置 )  所以要注销掉 src/index.js 内

```
/* let str = require('./a.js'); */

/*  console.log(str); */

require('./a.css');

require('./index.css');

require('./index.less');
```
