---
title: 页面跳转
---

## 路由跳转   

    跳转到 path:'/login' 的页面 

```
<router-link to="/login"  <router-link/  
```  

    路由跳转时传参  

```
传参的页面<template  中 ：<router-link :to="'/home/newsinfo/' + item.id"   <router-link/  
```  

    参数接收  

```
data() {
  return {
    id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
  };
}
```

   router.js内路由的配置  
```
  { path: '/home/newsinfo/:id', component: Newsinfo ，name: 'Newsinfo' }
```  

## 编程式页面跳转  

   在点击跳转绑定的事件的方法中 

```
  this.$router.push({ name:'Home' })   //跳转到name为Home的页面
```

   编程式页面跳转时传参  

   params 传参 : 相当于 post 请求，页面跳转时参数不会在地址栏中显示

```
this.$router.push({
  name:'',
  params: { id:idParams }
})
```

   接收参数  

```
this.$route.params.id
```

   query 传参 : 相当于 get 请求，页面跳转时参数会在地址栏中显示

```
this.$router.push({
  name:'',
  query: { id:idParams }
})
```  

    接收参数  

```
this.$route.query.id
```  

   注意：传参是 router   ，  接收参数是  route

    通用方法

```
<div class= "goods-item" v-for= "item in list" :key= "item.lid"  
  <img @click="jump" :data-lid="item.lid  
</div  

methods:{
//每一个事件就有一个事件对象 可以拿到这个事件对象 target触发时间的元素 元素的id
  jump(e){ // e=   事件对象
    var lid = e.target.dataset.lid;
    this.$router.push("/goodinfo?pid="+lid);
  }
}
```