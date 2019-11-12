---
title: vue 脚手架工具
---

**Vue脚手架工具:**

**什么是脚手架工具: 用于创建脚手架代码的命令行工具**

**什么是脚手架代码: 已经包含最核心功能的半成品项目结构。**

**为什么: 避免重复劳动，标准化项目结构**

**如何:**

**1. 安装脚手架命令行工具:**

**npm i -g @vue/cli**

**2．用脚手架命令行生成脚手架项目代码**

**vue create xz_vue**

**选Manually select feature——手动选择配置**

**选组件: 空格选中/取消选中**

**选Babel: 编译器，将浏览器不认识的变种js，转化为标准的浏览器认识的js。**

**比如: Vue使用了ES6中的模块语法: 浏览器不认**

**export default { … } ——抛出模块对象**

**等效于node中的module.exports={ … }**

**Import 组件 from ‘./views/组件.vue’ ——引入模块**

**等效于var 组件=require(“./views/组件.js”)**

**选Router——实现单页面应用中的路由组件**

**选Vuex——实现客户端状态存储**

**Use history mode for router 是否使用history模式作为路由方式: 选N 不启用history模式**

**Vue默认的路由模式: 域名/#/路径**

**History模式: 域名/路径 ——需要修改服务器配置才能实现**

**将配置保存在各自独立的配置文件中，还是集中保存在package.json文件中：选In package.json**

**是否保存当前配置为今后项目的模板: 选N**

**3. 进入脚手架项目文件夹内, 运行:npm run serve**

**编译脚手架中的零散的项目为一个完整的项目，并启动一个简版开发服务器，临时宿主调试的网页。**

**脚手架项目结构:**

![image](https://raw.githubusercontent.com/kevin9281/-/master/Vue脚手架项目结构.png)