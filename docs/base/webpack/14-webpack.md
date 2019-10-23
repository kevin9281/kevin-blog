---
title: 打包多页应用 (集合操作)
---

## 打包多页应用 (集合操作)

>  1. 新建文件夹 webpack-demo-2

>  1.先初始化 

```
yarn init -y
```

>  2.安装 webpack  webpack-cli  （-D就是--save-dev的缩写）

```
yarn add webpack webpack-cli -D
```

>  3.创建 webpack.config,js  创建 src / index.js  src / other.js

```
let path = require('path');

module.exports = {
  mode:'development',  //开发模式
  //多入口
  entry: {
    home:'./src/index.js', //将 src 下 index.js打包完的文件名字 home  
    other:'./src/other.js'
  },
  output:{  //多入口 就需要多个出口
    //[name] 相当于 home other 的名字 也可以加 [hash] 一个意思
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  }
}
```

>  4.执行  npx webpack  就默认出现 dist 文件夹 文件夹下 有 home.js  other.js

>  5.根目录 创建  index.html

>  6.安装 html 插件:用模板生成html 再自动将 js 引入进去  再进行配置

```
yarn add html-webpack-plugin -D
```

>  引入插件

```
let HtmlWebpackPlugin = require('html-webpack-plugin');
```

>  配置插件

```
 plugins:[  //所有插件数组
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'home.html',      //文件名
      chunks:['home']            //代码块
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'other.html',      //文件名
      chunks:['other','home']    //打包出来的 other.html 内 既引入了 other 也引入了 home
    })
  ]
```

>  7.再执行出来 npx webpack  就出现 home.html 里面只引入了 home.js  