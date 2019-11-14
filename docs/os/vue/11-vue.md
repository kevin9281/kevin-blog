---
title: vue 组件化开发
---

 **什么是: 一个页面都是由组件组成**

 **如何: 拿到页面后，应该先划分页面区域：**

​    **2个准则: 1. 按功能; 2. 按是否重复**

 **其实组件也有不同:**

**1. 每个页面中可能有多个组件，但多数情况只有一个new Vue()——称为根组件**

**2. 全局组件: 可在页面任何位置使用**

**Vue.component(“组件名/标签名”,{ … })**

**3. 局部组件: 只能用于特定父组件内的组件，也称为子组件。**

**2步:**

**1. 将全局组件降级为一个普通组件对象**

**var 组件对象名/驼峰命名={ … }**

**2. 将所有组件对象提前到父组件之前定义**

**3. 在父组件中:**

```
Vue.component(“父组件”,{
  … ,
  components:{
    组件对象名, …
}
})
```

![image](https://raw.githubusercontent.com/kevin9281/-/master/components.png)