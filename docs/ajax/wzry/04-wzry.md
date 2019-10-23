---
title: 下载mangodb  
---

## 下载mangodb  

```
https://www.mongodb.com/download-center
```

>  选择msi 下载

>  下载完配置环境变量  因为mondgdb 不像是node 下载完就直接配置了环境

>  右键点击计算机 然后点属性 => 高级系统设置 => 环境变量 => path => 把下载的mongodb 的bin 全目录新建到环境变量中 然后保存  (D:\MongoDB\bin)

>  然后就可以在全局cmd 内测试 直接输入 mongod

>  在c盘根目录下创建 data 内创建文件夹 db (默认的数据库的目录)

>  然后cmd 命令行全局 mongod 就可以开启了