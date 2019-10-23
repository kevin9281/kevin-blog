---
title: --save --dev 和 --save 区别
---

## --save --dev 和 --save 区别
```
webpack -P    //压缩混淆脚本
 
webpack -D    //生成map映射文件，告知哪些模块被最终打包到哪里了

生产环境  production  开发环境  development

一、模式
运行webpack命令时，一定要指定模式。

二、--save -dev
--save：将保存配置信息到pacjage.json。默认为dependencies节点中。 -P
--dev：将保存配置信息devDependencies节点中   -D

因此：

--save：将保存配置信息到 pacjage.json 的 dependencies 节点中。

--save-dev：将保存配置信息到 pacjage.json 的 devDependencies 节点中。

dependencies：运行时的依赖，发布后，即生产环境下还需要用的模块

devDependencies：开发时的依赖。里面的模块是开发时用的，发布时用不到它。


```