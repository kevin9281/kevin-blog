---
title: 打包压缩 html
---

## 打包压缩 html  

>  1.安装插件 html  

```
yarn add html-webpack-plugin -D
```

>  2.配置 HtmlwebpackPlugin  
>  webpack.config.js : 改为开发模式 可以压缩成一行

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
  ]
}
```

>  然后html 的内容就压缩了