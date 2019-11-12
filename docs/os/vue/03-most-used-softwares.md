---
title: vue 组件
---

**什么是: 拥有专属HTML，CSS，数据的，可重用的页面独立区域。**

 **为什么: 可重用，松耦合，便于协作和分工**

 **何时: 今后所有的页面都是用组件组成的。**

 **如何:**

**1. 定义组件模板:**

```
 <template id=”tplxxx”>
   <div> 必须只有一个父元素
     组件可重用的html片段(包含绑定语法，事件绑定)
   </div>
   <template>
```

**2. 创建组件:**

```
 Vue.component(“组件名/标签名”,{//组件其实是可重用的标签而已
  template: “选择器找到<template>”,
  data(){ //data:function(){ … }——要为每个组件实例创建独有的模型数据
   return { 模型变量 }
},
    methods:{
    处理函数(){ … }
   }
})
```



**3. 在页面中使用组件:**

```
<div id=”#app”>
  …<组件名></组件名>
 
     <script>
       new Vue({ el:”#app”, … })
```



**原理: new Vue识别出组件标签：**

**1. 找到组件模板的HTML片段**

**创建组件实例，绑定组件内容，提供数据和方法支持。**

![img](https://raw.githubusercontent.com/kevin9281/-/master/c7.png)

