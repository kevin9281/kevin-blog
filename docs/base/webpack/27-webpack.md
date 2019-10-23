---
title: 懒加载
---

## 懒加载

>  安装预设插件 

```
yarn add @babel/plugin-syntax-dynamic-import -D
```

>  配置插件 module.exports = {   rules:[     use:{      options:{

```
plugins:[
   '@babel/plugin-syntax-dynamic-import'
]
```

>  src / source .js

```
export default 'kevin'
```

>  src / index.js

```
let button = document.createElement('button');
button.innerHTML = 'hello';
//vue懒加载 react懒加载

//路由懒加载实现 靠的es6 import语法
button.addEventListener('click',function () {
    //es6 草案中的语法 jsonp实现动态加载文件
  import('./source.js').then(data=>{
    console.log(data.default);
    //console.log('click')
  })
});

document.body.appendChild(button);
```

>  webpack.config.js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode:'production',
  entry:{  //多入口
    index:'./src/index.js'
  },
  devServer:{
    port:3000,
    open:true,
    contentBase:'./dist'
  },
  module:{
    noParse:/jquery/,   //可以不去解析某些包 不去解析jquery中的依赖库
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,  //排除
        include:path.resolve('src'),  //包含
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    //从moment 中如果引入了 .locale 就忽略掉不打包 节省空间
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    })
  ]
}
```
