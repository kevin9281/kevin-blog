---
title: 高级语法 转 es5 语法
---

## 高级语法 转 es5 语法  

>  1.安装 es6 转 es5  

```
yarn add babel-loader @babel/core @babel/preset-env -D
```

>   同时安装 识别 es6 语法

```
yarn add @babel/plugin-proposal-class-properties -D
```

>    同时安装 实现高级语法 转为 es5 语法

```
yarn add @babel/plugin-proposal-decorators -D
```

>  2.配置 webpack.config.js

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
  module:{ //模块
    // loader 特点 希望单一 用法 字符串只用一个loader 多个loader需要 [], 从右往左执行 从下往上执行
    rules:[  //规则 css-loader 解析@import这种语法 style-loader 把css插入head的标签中
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{   //用babel-loader 需要把es6转为es5
            presets:[  //预设
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
          }
        }
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

>  3.编写 src/index.js

```
let str = require('./a.js');

console.log(str); 

require('./index.css');

require('./index.less');

let fn = ()=>{
  console.log('log');
}
fn();

@log
class A{  //new A()  a=1
  a = 1;
}
let a = new A();
console.log(a.a);

function log (target) {
  console.log(target,'23');
}
```

>  4.执行  

```
 npm run dev
```