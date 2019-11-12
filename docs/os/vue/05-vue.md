---
title: vue 计算属性
---


## 什么是: 

>  什么是: 实际不存在的属性，都要依靠现有属性动态计算获得


## 1. 定义时:

```
new Vue({
  computed: {
    计算属性名() {
      return 计算后的值;
    }
  }
});
```

## 2. 绑定时: 

> 同普通模型变量的绑定完全一样

```
其实methods也能实现！
computed vs methods
computed的值可被vue缓存，仅计算一次，反复使用除非依赖的模型变量发生变化，才重新计算
methods是只要调用一次就计算一次，反复调用会导致反复计算——效率低
如何选择:
1. 如果侧重返回值，首选计算属性
2. 如果侧重执行一项任务，才选择methods
```

![Image](https://raw.githubusercontent.com/kevin9281/-/master/clipboard.png)