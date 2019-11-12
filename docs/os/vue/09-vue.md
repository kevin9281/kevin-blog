---
title: vue 绑定class和style
---



 **绑定style:**

**1. 将style按字符串绑定: 问题: 不便于修改其中一个css属性**

**2. 将style按对象绑定:**

```
new Vue({
      data:{
    popStyle:{
      css属性名:”属性值px”,
      css属性名:”属性值px”
      }
    }
})
```



 **绑定class:**

 **写死的class和:class=””是可以共存的**

  **结果: :class绑定后的class会和写死的class合并为一处**

 **2种:**

**1. 用字符串方式绑定**

**2. 用对象方式绑定**

```
new Vue({
  data:{
classObj:{
  样式类名: true/false,
  样式类名: true/false
   }
  }
})
```

**结果: 样式类对应的值为true，则出现在元素的class中，否则不出现**

![imager](https://raw.githubusercontent.com/kevin9281/-/master/c1.png)

![imager](https://raw.githubusercontent.com/kevin9281/-/master/c2.png)

