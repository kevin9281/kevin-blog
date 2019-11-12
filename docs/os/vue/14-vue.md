---
title: vue Axios
---



 **什么是: 专门发送HTTP请求的支持Promise的函数库**

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

**借助qs.min.js**

**axios.post(“url”,Qs.stringify({参数1,参数2,…}))**

​        **//”参数1=值1&参数2=值2&…”**



![imager](https://raw.githubusercontent.com/kevin9281/-/master/vue-axios.png)