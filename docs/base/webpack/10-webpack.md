---
title: 处理 js 语法 及 校验
---

## 处理 js 语法 及 校验  

>  1. 安装 

```
yarn add  @babel/plugin-transform-runtime -D
```

>  同时安装  

```
yarn add @babel/runtime
```

>  同时安装  

```
yarn add @babel/polyfill
```

>  同时安装  

```
yarn add eslint eslint-loader
```  

>   进入官网https://eslint.org/demo/  点击Rules Configuration 然后选择需要的打钩
>   再点击.eslintrc.json 下载到文件的根目录  命名为  .eslintrc.json

>  2,配置到webpack 

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
      {   //这就是个代码校验 来检查是否错误
        test:/\.js$/,
        use:{
          loader:'eslint-loader',
          options:{
            enforce:'pre'  //强制在普通验证之前执行  post就是在普通之后执行
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

>  编写 src/index.js  src/a.js 

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

```
module.exports = 'kevin';
require('@babel/polyfill')
class B{

}

function * gen (params) {
  yield 1;
}
console.log(gen().next());

'aaa'.includes('a');
```

>  执行 就会报错 进行验证  

```
npx webpack 
```