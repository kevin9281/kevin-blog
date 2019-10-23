---
title: 创建手册
---

## 创建手册

> 全局安装node vne和脚手架

```
0.1 node -v  （检查一下 版本） node 安装地址：http://nodejs.cn/download/
0.2 npm  install  -g  vue-cli 全局安装脚手架  ( cnpm install -g vue-cli )
0.3 npm install -g @vue/cli 全局安装vue 
0.4 **: 如果npm在国内的网络环境下可能会比较慢，解决方案：
    安装：npm install cnpm -g --registry=https://registry.npm.taobao.org；  
    注意：安装完后最好查看其版本号cnpm -v或关闭命令提示符重新打开，安装完直接使用有可能会出现错误；
    注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm（以下操作将以cnpm代替npm）。
```

>  1. 创建主文件夹

>  2. 生成内容 

```
  2.1 mkdir server 创建server文件夹    (服务端项目 给web 和 管理项目的接口)
  2.2 创建脚手架 vue create web 创建web端项目 (选默认)
  2.3 创建脚手架 vue create admin 创建后台管理项目 (选默认)
```

>  3. 进入服务端 初始化项目  (项目介绍文件)

```
  3.1 cd server
  3.2 npm init -y
  3.3 新建package.json 内的 "main" 服务端入口文件
  3.4 "scripts" 自定义脚本  "serve": "nodemon index.js",
  3.5 nodemon 需要全局安装 npm i -g nodemon
  3.6 就可以用 npm run serve 启动服务器
```

>  4.安装插件

```
  4.1 进入admin 安装 vue add element
  4.1.1 ? How do you want to import Element? (Use arrow keys) > Fully import 引用方式
        ? Do you wish to overwrite Element's SCSS variables? No
        ? Choose the locale you want to load (Use arrow keys) > zh-CN
  4.1.2 安装路由 vue add router 
        ? Use history mode for router? (Requires proper server setup for index fallback in production) > No
  4.2 安装 axios  请求数据提交接口 npm i axios
```

>  5.完成admin 内数据接口axios  npm install axios

```
  5.1 创建http.js 然后编辑
  import axios from 'axios'

  const http = axios.create({
  baseURL: "http://locahost:3000/admin/api"
  })

  export default http

  5.2 然后main.js 内导入 就可以在任意页面使用 this.$http.post
  import http from './http'
  Vue.prototype.$http = http
```

>  6.完成服务器 创建服务器 

```
  6.0 下载mogondb
       cmd 内 先进入安装目录  1. D:   2. cd D:\MongoDB\bin   3.mongod -dbpath D:\data\db  4. mongo  //检查版本号 是否连接成功
       配置环境变量
  6.1 进入server 安装 npm i express@next cors mongoose
  6.2 启动服务器 npm run serve
```

>  7.安装插件 npm i inflection   用于单词的格式转换 单复数的转换

>  8.基于 Quill、适用于 Vue 的富文本编辑器，支持服务端渲染和单页应用。 可视化编辑

```
    8.1 Vue-Quill-Editor
    8.2 vue2-editor: npm install vue2-editor 需要在前端页面安装
```

```
  <template>
  <div id="app">
    <vue-editor v-model="content"></vue-editor>
    </div>
  </template>

  <script>
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        content: "<h1>Some initial content</h1>"
      };
    }
  };
  </script>
```

```
  8.3 实现图片上传 在文档后面 Example - Custom Image Handler
  <template>
    <div id="app">
      <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="htmlForEditor"> </vue-editor>
    </div>
  </template>
```