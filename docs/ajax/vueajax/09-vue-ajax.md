---
title: vue vant 搭建rem项目
---



## 安装

```
1. 安装插件 vant

  npm i vant -S
  
2. 按需引入

  npm i babel-plugin-import -D
  
3. 在babel.config.js中加入
  
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]

```

