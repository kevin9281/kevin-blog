---
title: webpack 小插件
---

## webpack 小插件

>  1.  cleanWebpackPlugin  需要安装第三方模块
>  可以在每次输出目录前 可以把dist目录删掉 只会出现最新的目录

```
yarn add clean-webpack-plugin -D
```

>  引入 配置

```
let CleanWebpackPlugin = require('clean-webpack-plugin');
```

>  CleanWebpackPlugin 的地址目录 相当于 output 的 path 路径

```
 output:{ 
    //[name] 相当于 home other 的名字 也可以加 [hash] 一个意思
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[  //所有插件数组
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'home.html'
    }),
    new CleanWebpackPlugin()  //将dist目录删掉 再产出最新的
  ]
```

>  2.  copyWebpackPlugin  需要安装第三方模块
>  可以拷贝文件到需要的目录    

```
yarn add copy-webpack-plugin -D
```

>  引入 配置 

```
let CopyWebpackPlugin = require('copy-webpack-plugin');
```

```
 plugins:[  //所有插件数组
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'home.html'
    }),
    new CleanWebpackPlugin(),  //将dist目录删掉 再产出最新的
    new CopyWebpackPlugin([
      {from:'./doc',to:'./dist'},   //将doc 拷贝到 dist文件夹下
      {from:'doc',to:'./'}   //将hello.txt 拷贝到 dist文件夹
    ])
  ]
```

>  3.  bannerPlugin   内置的插件
>  在 打包出来的js 前面加上 已经被注销的字 
>  引入 配置

```
let webpack = require('webpack');
```

```
plugins:[  //所有插件数组
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'home.html'
    }),
    new CleanWebpackPlugin(),  //将dist目录删掉 再产出最新的
    new CopyWebpackPlugin([
      {from:'./doc',to:'./dist'},   //将doc 拷贝到 dist文件夹下
      {from:'doc',to:'./'}   //将hello.txt 拷贝到 dist文件夹
    ]),
    new webpack.BannerPlugin('2019年5月24号制作 颜军颂')
  ]
```

>  index.js

```
/*! 2019年5月24号制作 颜军颂 */!function(e){var n={};functi
```