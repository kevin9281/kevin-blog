---
title: 配置 source-map
---

## 配置 source-map

>  1.安装 babel 包 

```
yarn add babel-loader @babel/core @babel/preset-env webpack-dev-server -D
```

>  source-map 源码映射的四种配置区别 :

>  1,源码映射 会单独生成一个sourcemap 文件 出错了 会标识当前报错的列和行 大 和 全

```
devtool:'source-map',  //增加映射文件 可以帮我们调试源代码
```

>  2.区别是 不会产生单独的文件 但是可以显示 行和列  唯一区别会把source-map放到当前打包文件 home.js内

```
devtool:'eval-source-map',
```

>  3,区别是 不会产生列 但是是一个单独的映射文件 产生后可以保留起来 用来调试

```
devtool:'cheap-module-source-map', 
```

>  4,区别是 不会产生文件 集成在打包后的文件中 也不会产生列

```
devtool:'cheap-module-eval-source-map',
```


>  webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'production',  //模式
  //多入口
  entry: {
    home:'./src/index.js'
  },
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
  //1,源码映射 会单独生成一个sourcemap 文件 出错了 会标识当前报错的列和行 大 和 全
  //devtool:'source-map',  //增加映射文件 可以帮我们调试源代码
  //2.区别是 不会产生单独的文件 但是可以显示 行和列  唯一区别会把source-map放到当前打包文件 home.js内
  //devtool:'eval-source-map',
  //3,区别是 不会产生列 但是是一个单独的映射文件 产生后可以保留起来 用来调试
  //devtool:'cheap-module-source-map', 
  //4,区别是 不会产生文件 集成在打包后的文件中 也不会产生列
  devtool:'cheap-module-eval-source-map',
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