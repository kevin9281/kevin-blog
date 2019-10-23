---
title: 热更新
---

## 热更新  

>  src / index.js

```
import str from './source';
console.log(str);

if(module.hot){
  module.hot.accept('./source', ()=>{
    let str = require('./source')
    //console.log('文件更新了');
  })
}
```

>  src / source.js

```
export default 'kevin12345'
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
    hot:true, //启用热更新
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
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new webpack.NamedModulesPlugin(), //打印更新的模块路径 告诉我们哪个模块更新
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    //从moment 中如果引入了 .locale 就忽略掉不打包 节省空间
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    })
  ]
}
```