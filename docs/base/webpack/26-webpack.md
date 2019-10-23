---
title: 抽取公共代码
---

## 抽取公共代码

>  在多个页面中需要使用公共的部分 

>  配置多入口

```
  entry:{  //多入口
    index:'./src/index.js',
    other:'./src/other.js'
  },
```

>  配置出口

```
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
```

>  创建 src /a.js 

```
console.log('a!');
```

>  src/ b.js 

```
console.log('b!');
```

>  src / index.js 

```
import './a';
import './b';
console.log('index.js');

import $ from 'jquery';
console.log($);
```

>  src / other.js

```
import './a';
import './b';
console.log('index.js');

import $ from 'jquery';
console.log($);
```

>  配置 webpack.config.js  optimization :{ 

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  optimization:{   //commonChunkPlugins
    splitChunks:{  //多页面分割代码块
      cacheGroups:{  //缓存组
        common:{   //公共的模块
          chunks:'initial',  //刚开始就进行抽离common
          minSize:0,   //大小超过0的字节
          minChunks:2,  //只要使用过1次以上就要抽离出来
        },
        vendor:{  //第三方模块
          priority:1, //权重 会先抽离jquery
          test:/node_modules/,  //把你抽离出来
          chunks:'initial',
          minSize:0,
          minChunks:2,
        }
      }
    }
  },
  mode:'production',
  entry:{  //多入口
    index:'./src/index.js',
    other:'./src/other.js'
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

>  编译完后 就会出现公共的代码.js