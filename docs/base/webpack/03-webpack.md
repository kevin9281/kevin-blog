---
title: 配置webpack
---

## 配置webpack  

>  打包工具  ->   输出后的结果 ( js模块 )  

>  webpack 0配置 先创建 src文件夹 创建index.js 文件  直接执行  

```
npx webpack
```

>  生成 dist 文件夹 压缩文件 main.js
>  压缩的main.js 就可以执行 index,js 的内容  

>  默认生产环境  
>  开发环境就不会压缩代码

>  打包   -> 支持js模块化  

>  手动配置 webpack  
>  -默认配置文件的名字  webpack.config.js
>  -根目录更改名字为    webpack.config.my.js

```
// webpack 是node 写出来的 node的写法
let path = require('path');  //内置模块
//console.log(path.resolve('build'));   //f:\webpack-demo\build

module.exports = {  //导出的配置文件
  mode:'development',       //模式 默认两种 生产环境  production  开发环境 development
  entry:'./src/index.js',   //入口 从什么位置开始打包 可以写相对路径
  output:{                  //出口
    filename:'bundle.js',   //打包后的文件名
    path:path.resolve(__dirname,'build'),  //路径必须是一个绝对路径 resolve相对路径解析为绝对路径
  }
}
```  

>  src/index.js  

```
let str = require('./a.js');

console.log(str);
```

>  更改配置文件的名字
>  默认名字也是可以更改的  在webpack-cli 内更改
>  创建 webpack.config.my.js

```
npx webpack --config webpack.config.my.js
```

>  也可以在 pack.json 文件内 配置脚本 执行webpack webpack-cli  

```
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build":"webpack --config webpack.config.my.js"
  },
  "devDependencies": {
    "webpack": "^4.32.0",
    "webpack-cli": "^3.3.2"
  }
}
```

>  直接执行 npm run build