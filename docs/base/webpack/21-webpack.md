---
title: 分开不同环境
---

## 分开不同环境

>  分开两个文件  一个专门用来开发  一个专门用来生产 不用每次更改配置文件

>  先创建两个文件 

```
   1. webpack.prod.js
   2. webpack.dev.js
```

>  公共的写在 webpack.base.js  其他的 开发 / 生产 分开写

>  先安装插件 merge  

```
yarn add webpack-merge -D
```

>  运行 dev 开发环境 未压缩

```
npm run build -- --config webpack.dev.js
```

>  运行 prod 生产环境 压缩

```
npm run build -- --config webpack.prod.js
```

>  webpack.prod.js

```
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
  mode:'production',
  optimization:{
    minimizer:[

    ]
  },
  plugins:[
    
  ]
})
```

>  webpack.dev.js

```
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
  mode:'development',
  devServer:{

  },
  devtool:'source-map'
})
```

>  webpack.base.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  //多入口
  entry: { home:'./src/index.js' },
  module:{  //规则
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
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
  resolve:{  //解析 第三方包 common
    modules:[path.resolve('node_modules')], 
    extensions:['.js','.css','.json','.vue']  //扩展名 文件名后缀
  },
  devServer:{  //开发服务器
    //3. 有服务端 不想用代理来处理 能不能在服务端中启动 webpack 端口用服务端端口 
  },
  output:{ 
    //[name] 相当于 home other 的名字 也可以加 [hash] 一个意思
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[  //所有插件数组
    new webpack.DefinePlugin({
      DEV:JSON.stringify('pro'), //console.log('dev')
      FLAG:'true',  //标识 布尔类型
      EXPORESSION:'1+1'    //取最终结果2  如果是要字符串 就需要用JSON.stringify
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'index.html'
    })
  ]
}
```