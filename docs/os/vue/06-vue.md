---
title: vue 自定义指令
---



**自定义指令:**

**如何:**

**1. 创建自定义指令:**

 **Vue.directive(“指令名”,{ //不要加v-**

  **inserted(el){ //会在当前元素被添加到DOM树上时自动调用**

   **//el: 当前DOM元素**

   **//可对el执行原生DOM API**

​    **}**

 **})**

**2. 使用指令:**

 **//必须加v-**

**3. 创建new Vue实例对象，监视HTML元素**



![imager](https://raw.githubusercontent.com/kevin9281/-/master/11231.png)