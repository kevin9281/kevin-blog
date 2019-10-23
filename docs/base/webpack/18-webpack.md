---
title: webpack 跨域问题
---

## webpack 跨域问题

>  1,  重写的方式 把请求代理到express服务器上  服务端是别人的 代理过去

>  根目录创建 server.js  

```
// express 

let express = require('express');

let app = express();

app.get('/user',(req,res)=>{
  res.json({ name:'webpack架构1' })
})

app.listen(3000);
```

>  src / index .js

```
let xhr = new XMLHttpRequest();

//http://localhost:8080  webpack-dev-server的服务  -> 请求再转发给 3000

// http-proxy 代理


xhr.open('GET','/api/user',true);

xhr.onload = function() {
  console.log(xhr.response);
}

xhr.send();
```

>  配置 webpack.config.js   devServer  proxy 代理

```
  devServer:{  //开发服务器
    proxy:{   //重写的方式 把请求代理到express服务器上
      '/api': {
        target:'http://localhost:3000',
        pathRewrite:{'/api':''}  //相当于改了路径
      }
    } 
  },
```

>  2, 前端只想单纯模拟数据 

>  更改 src / index .js

```
 let xhr = new XMLHttpRequest();

//http://localhost:8080  webpack-dev-server的服务  -> 请求再转发给 3000

// http-proxy 代理


xhr.open('GET','/user',true);

xhr.onload = function() {
  console.log(xhr.response);
}

xhr.send();
```

>  配置 webpack.config.js

```
  devServer:{  //开发服务器
    //2,我们前端只想单纯来模拟数据
    before(app){   //提供的方法 钩子
      app.get('/user',(req,res)=>{
        res.json({ name:'webpack架构-before' })
      })
    }
  },
```

>  3, 前端 服务端用同一个端口
>  安装插件  webpack 开发服务的中间件 可以在服务端启动webpack 服务端启动到前端代码上

```
yarn add webpack-dev-middleware -D
```

>  配置 根目录 server.js 服务端 其他都不用配置

```
// express 

let express = require('express');
let app = express();
let webpack = require('webpack');

//中间件引入 
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user',(req,res)=>{
  res.json({ name:'webpack架构1' })
})

app.listen(3001);
```

>  然后启动服务端 就可以访问 http://loaclhost:3001 或者 http://loaclhost:3001/user