---
title: 样式表抽离成专门的单独文件并且设置版本号
---

## 样式表抽离成专门的单独文件并且设置版本号  

>   1.安装  

```
yarn add mini-css-extract-plugin -D
```

>  2.配置 webpack/config.js

```
// webpack 是node 写出来的 node的写法
let path = require('path');  //内置模块
//console.log(path.resolve('build'));   //f:\webpack-demo\build
let HtmlwebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {  //导出的配置文件
  devServer:{  //开发服务器的配置
    port:3000,    //端口号
    progress:true,   //打包的时候出现进度条
    contentBase:'./build',   //以指定的目录来运行静态服务
    compress:true    //压缩
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
           'css-loader'
        ]
      },
      {
        test: /\.less$/,   //可以处理less
        use:[
          MiniCssExtractPlugin.loader,
           'css-loader',  //@import  解析路径
           'less-loader'   //把less -> css
        ]
      }
    ]
  }
}
```

>  3.然后把需要处理的文件放入 index.js

```
let str = require('./a.js');

console.log(str);

require('./a.css');

require('./index.css');

require('./index.less');
```

>  4.执行 就可以看到html网页中 样式是在什么文件内 方便更改  

```
npm run build
```

>  5.自动添加前缀  

```
yarn add postcss-loader autoprefixer -D 
```

>  然后根目录创建文件 postcss.config.js 

```
module.exports = {
  plugins:[ require('autoprefixer') ]
}
```

>  再更改webpack.config.js 配置

```
// webpack 是node 写出来的 node的写法
let path = require('path');  //内置模块
//console.log(path.resolve('build'));   //f:\webpack-demo\build
let HtmlwebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {  //导出的配置文件
  devServer:{  //开发服务器的配置
    port:3000,    //端口号
    progress:true,   //打包的时候出现进度条
    contentBase:'./build',   //以指定的目录来运行静态服务
    compress:true    //压缩
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

>  再执行 就已经添加好前缀了 

```
npm run build 
```