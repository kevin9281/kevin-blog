---
title: vue Axios
---



 axios:

 什么是: 一个基于Promise的支持HTTP请求响应的函数库

//专门发送HTTP请求的支持Promise的函数库

 为什么:

 浏览器中向服务端发送ajax请求，4种:

  \1. 使用原生的xhr对象——繁琐

  \2. 使用jQuery中的$.ajax()——大材小用

  \3. 旧版Vue中，Vue官方自带了Vue-resource组件，专门发送xhr请求。——新版本中已经不推荐使用

  \4. axios，官方推荐的代替Vue-resource的，专门发送ajax请求的函数库

 何时：只要在Vue中发送ajax请求，都用axios

 如何: axios是一个单独的js文件，与平台无关。

  即可用在浏览器中，也可运行在node.js中

\1. 从浏览器制作XMLHttpRequests

\2. 让HTTP从node.js的请求

\3. 支持Promise API

\4. 拦截请求和响应

\5. 转换请求和响应数据

\6. 取消请求

\7. 自动转换为JSON数据

\8. 客户端支持防止XSRF





什么是: 专门发送HTTP请求的支持Promise的函数库**

 **何时: 今后，没有jQuery也想发送ajax请求时**

 **如何:**



**1. Get:**

```
axios.get(“url”,{
  params:{ 参数:值, … }
}).then(res=>{
   res.data才是服务端返回的数据
})
```



**2. Post:**

```
 借助qs.min.js
   axios.post(“url”,Qs.stringify({参数1,参数2,…}))
                //”参数1=值1&参数2=值2&…”

```





![imager](https://raw.githubusercontent.com/kevin9281/-/master/vue-axios.png)