---
title: 定义环境变量
---

## 定义环境变量 

>  根据当前的环境来判断 是选择开发的参数模式 还是生产的参数模式
>  这样就实现 根据 插件配置里面的 plugins ：[ new webpack.DefinePlugin ({ 下的 DEV : 
>  这个变量来区别是 开发模式 还是生产模式  

>  src / index.js

```
let url = '';
if (DEV == 'dev') { //根据 DEV 变量来区分是 开发 还是上线
  url = 'http://localhost:3000'
} else {
  url = 'http://www.kevin.cn'
}
console.log(url,'------'); 
console.log(typeof FLAG); //boolean 
console.log(EXPORESSION); // 2
```

>  配置 webpack.config.js  module.exports = { plugins:[

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
    extensions:['.js','.css','.json','.vue']  //扩展名 文件名后缀
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
    new webpack.DefinePlugin({
      DEV:JSON.stringify('pro'), //console.log('dev')
      FLAG:'true',  //标识 布尔类型
      EXPORESSION:'1+1'    //取最终结果2  如果是要字符串 就需要用JSON.stringify
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',   //模板
      filename:'index.html'
    })
  ]
}
```
