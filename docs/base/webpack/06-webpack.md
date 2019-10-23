---
title: 配置webpack 解析css less 模块
---

## 配置webpack 解析css less 模块  

>  1.安装 css 和 style 模块解析的依赖 style-loader 和 css-loader  

```
yarn add css-loader style-loader -D
```

>  解析 less 需安装  

```
yarn add less less-loader -D (sass stylus node-sass sass-loader)
```

>  src/index.js   

```
let str = require('./a.js');

console.log(str);

require('./index.css');

require('./index.less');
```  

>  配置 webpack.config.js  

```
// webpack 是node 写出来的 node的写法
let path = require('path');  //内置模块
//console.log(path.resolve('build'));   //f:\webpack-demo\build
let HtmlwebpackPlugin = require('html-webpack-plugin');

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
      minify:{               //压缩html
        removeAttributeQuotes:true,   //去除双引号
        collapseWhitespace:true       //折叠 html 变成一行       
      },
      hash:true    //添加 hash 戳  
    })
  ],
  module:{ //模块
    // loader 特点 希望单一 用法 字符串只用一个loader 多个loader需要 [], 从右往左执行 从下往上执行
    rules:[  //规则 css-loader 解析@import这种语法 style-loader 把css插入head的标签中
      {
        test: /\.css$/,   //可以处理css
        use:[
          {
            loader:'style-loader',
            options:{
              insertAt:'top'  //style标签会插入到html页面 head顶部 优先级降低
            }
          },
           'css-loader'
        ]
      },
      {
        test: /\.less$/,   //可以处理less
        use:[
          {
            loader:'style-loader',
            options:{
              insertAt:'top'  //style标签会插入到html页面 head顶部 优先级降低
            }
          },
           'css-loader',  //@import  解析路径
           'less-loader'   //把less -> css
        ]
      }
    ]
  }
}
```


```
npm run dev
```

>   就可以把less css 直接注入到html  head标签里面的 style了