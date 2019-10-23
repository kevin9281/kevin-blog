---
title: watch 用法 webpack 实时打包
---

## watch 用法 webpack 实时打包

>  可以进行实时编译

```
  watch:true,   //允许实时打包
  watchOptions:{    //监控的选项
    poll:1000,      //每秒运行一次
    aggregateTimeout:500,    //防抖 一直在输入代码 停了后过了500毫秒内输入东西只打包一次
    ignored:/node_modules/  //不需要进行监控的文件
  },
```

>  webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'production',  //模式
  //多入口
  entry: { home:'./src/index.js' },
  module:{  //规则
    rules:[
      {
        test: /\.js$/,
        use: {
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  watch:true,
  watchOptions:{    //监控的选项
    poll:1000,      //每秒运行一次
    aggregateTimeout:500,    //防抖 一直在输入代码 停了后过了500毫秒内输入东西只打包一次
    ignored:/node_modules/  //不需要进行监控的文件
  },
  output:{ 
    //[name] 相当于 home other 的名字 也可以加 [hash] 一个意思
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[  //所有插件数组
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'home.html'
    })
  ]
}
```