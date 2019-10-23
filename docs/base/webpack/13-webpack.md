---
title: 打包文件分类
---

## 打包文件分类

>  1.	更改 webpack.config.js 可以选择 给某一个文件添加cdn前缀 还是给当前所有路径文件添加 

>  output 内更改的是 当前所有引用资源全部加上 前缀
>  rules 内更改个别的 是单独给某个文件添加 比如 js  css  html 内路径添加前缀
>  outputPath 为输出的路径 打包完 就生成 img文件夹 直接放入img文件夹下

```
  output:{                  //出口
    filename:'bundle.js', 
    path:path.resolve(__dirname,'build'),  //路径必须是一个绝对路径 resolve相对路径解析为绝对路径
    publicPath:'http://www.zhufengpeixun.cn' //这就是给所有路径文件前面加上这个域名
  },
```

```
{
  test:/\.(png|jpg|gif)$/,
  //做一个限制 当我们的图片 小于多少k的时候用base64来转化
  //大于这个限制的时候 用file-loader 产出真实的图片
  use:{
    loader: 'url-loader',
    options:{
      limit:1,
      outputPath:'/img/',   //生成了img文件夹 放入img文件内
      publicPath:'http://www.zhufengpeixun.cn' //单独给图片加前缀 没给其他文件加
    }
  }
}
```

>  直接放入css 文件夹下

```
plugins:[ 
  new MiniCssExtractPlugin({
    filename:'css/main.css',
  })
],
```