---
title: 通过ip 地址访问html
---

## 通过ip 地址访问html  

> webpack dev server 是 webpack 提供的用于本地开发的工具，它支持代码热更新，能迅速将更改后的代码更新到浏览器中。在这个模式下，构建后的代码在内存中，不会写入硬盘，所以读写速度快了很多。  


>  1.安装 
> 
```
yarn add webpack-dev-server -D
```

>  2.然后执行 不会真实打包文件 只会在内存中打包 只会在内存中 默认已当前目录下做一个静态目录

```
npx webpack-dev-server
```

>  3.修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：

```
// webpack 是node 写出来的 node的写法
let path = require('path');
//console.log(path.resolve('build'));   //f:\webpack-demo\build

module.exports = {
  mode:'development',       //模式 默认两种 生产环境  production  开发环境 development
  entry:'./src/index.js',   //入口
  output:{
    filename:'bundle.js',   //打包后的文件名
    path:path.resolve(__dirname,'build'),                  //路径必须是一个绝对路径
  },
  devServer: {
    contentBase: './build'
  },
}

配置一下package.json 开始执行文件
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server"
  },
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.32.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.4.1"
  }
}
```

>  默认已当前目录下 执行目录

```
然后执行  npm run start
```