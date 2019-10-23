---
title: resolve 解析
---

## resolve 解析

>  需要用到css 先安装css 插件

```
yarn add css-loader style-loader -D
```

>  加上bootstrap 框架

```
yarn add bootstrap
```

>  就可以在 src /index.js 引入

```
import 'bootstrap/dist/css/bootstrap.css';
```

>  需要配置resolve 下的 alias / mainFields / mainFiles   之后 就可以用下面的简写

```
import 'bootstrap';   //直接会去当前的mode_modules下找此文件
```

>  webpack.config.js / module.exports = {

```
resolve:{  //解析 第三方包 common
    modules:[path.resolve('node_modules')],

    //方法一:
    alias:{ //别名 vue  vue.runtime
      bootstrap:'bootstrap/dist/css/bootstrap.css'
    //}  

    //方法二:
   mainFields:['style','main'] //先找style 找不到style 再找main
    //"style": "dist/css/bootstrap.css",
    //"main": "dist/js/bootstrap",

    //方法三:
    mainFiles:[], //入口文件的名字 index.js
  },
```

>  webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode:'production',  //模式
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
    extensions:['.js','.css','.json','.vue'],  //扩展名 文件名后缀
    //先找.js .js没有的话再找.css 依次往后
    //import XX from Navbar.vue
    //[path.resolve('node_modules'),path.resolve('history')]

    //方法一:
    //alias:{ //别名 vue  vue.runtime
    //  bootstrap:'bootstrap/dist/css/bootstrap.css'
    //}  

    //方法二:
   mainFields:['style','main'] //先找style 找不到style 再找main
    //"style": "dist/css/bootstrap.css",
    //"main": "dist/js/bootstrap",

    //方法三:
    //mainFiles:[], //入口文件的名字 index.js
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
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'index.html'
    })
  ]
}
```

>  src / index.js

```
//import 'bootstrap/dist/css/bootstrap.css';
//这就是引入的样式文件了
//配置resolve 下的 alias 之后 就可以用下面的简写
import 'bootstrap';   //直接会去当前的mode_modules下找此文件

import './style' //引入样式文件 配置了 extensions 直接会找后缀名符合的文件

let xhr = new XMLHttpRequest();

//http://localhost:8080  webpack-dev-server的服务  -> 请求再转发给 3000

// http-proxy 代理


xhr.open('GET','/user',true);

xhr.onload = function() {
  console.log(xhr.response);
}

xhr.send();
```

>  index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <button class="btn btn-danger"></button>
</body>
</html>
```

>  src / style.css

```
body{
  background: yellow;
}
```