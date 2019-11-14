---
title: vue3 vue.config.js

---



## 1.创建项目

```
使用 vue ui 创建项目
配置 Babel Router Vuex Linter/Formatter css Pre-processors 使用配置文件 
使用 history 

```

## 2.vue.config.js

```
此文件是在 src 平级目录下
此文件是对 webpack 对全局做配置
// vue.config.js 常用配置
 module.exports = {
  // 基本路径 vue-cli 3.3 以前请使用 baseUrl
  publicPath : "/",
  // 输出文件目录
  outputDir:"dist",
  //用于嵌套生成的静态资产(js,css,img,fonts)的目录
  assetsDir:"",
  //生成环境 sourceMap
  productionSourceMap: true,
  // webpack 配置
  configureWebpack: () = {},
  chainWebpack: () = {},
  // css相关配置
  css: {
  // 启用css modules
  	modules: false,
 	// 是否使用css分离插件
 		extract: true,
 	// 开启css source maps?
 	  sourceMap: flase,
 	// css与舍弃配置项
 	  loaderOptions: {},
  },
  // webpack-dev-server 相关配置
  devServer:{
  	host:'0.0.0.0',
  	port:8080,
  	proxy:{}, //设置代理
  },
  // 第三方插件配置
  pluginOptions:{
  	// ...
  }
 }
```

## 3.router.js

```
1. 路由正常加载方式

缺点: 进入页面 就会全部加载组件 

import Home from "home";

  {
    path: '/',
    name: 'home',
    component: Home
  },
  
2. 路由懒加载方式

优点: 进入页面的时候他不会加载 优化项目进入速度 配置了 component的话 就可以进入这个页面才加载这个组件

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
```

