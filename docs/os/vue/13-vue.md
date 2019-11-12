---
title: vue spa单页面应用 vues
---

## spa单页面应用 



什么是单页面应用: 整个应用程序只有一个完整的HTML页面。所谓页面跳转，是通过替换网页中指定区域的内容，来模拟实现的跳转。**



 **为什么:**

| **多页面应用**                                               | **单页面应用**                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **包含多个独立的完整的HTML页面****缺: 请求次数多**           | **整个项目只有一个完整的HTML页面。其它所谓的“页面”只不过是HTML片段而已****优: 请求少** |
| **页面跳转的本质:****删除就的整个DOM树，重新下载另外整个DOM树，重新加载。****缺: 效率低** | **页面跳转的本质:****只是把当前DOM树中局部片段替换为另一个HTML片段****优: 效率高** |
| **如果两个页面都需要一个相同的资源，每个页面都要重复请求**   | **如果多个“页面”都要用到相同的资源，注定只需要下载一次即可** |
| **无法实现页面切换动画**                                     | **有机会实现页面切换动画**                                   |



**1. 定义一个完整的HTML页面**

**2. 定义多个“页面”的HTML片段**

**3. 定义路由字典: (routes)**

 **一组相对路径和对应”页面”之间的对应关系的集合**

```
var routes=[
  {path:”/index”, component: Index },
  {path:”/details”, component: Details},
  {…}
]
```

**4. 编写路由器程序:**

**获得url中的相对路径**

**去路由字典中查询要加载的对应组件片段**

**用找到的组件片段，替换完整页面中占位符元素所在的位置**





## vuex

##### 全局共享的数据 多个组件之间共享数据
```
Vuex 是一个仓库,Vuex核心对象 store 就是一个容器 此容器存储所有组件共享数据

当某一个组件更新共享数据,Vuex 通知所有使用数据组件更新数据;

如果有一个组件改了共享数据 会通知其他使用到的组件都会改动

保证所有组件使用数据状态统一
```
```
Vuex 使用方式
① 在 main.js 中下载引入并创建配置 Vuex 对象
  npm i vuex
  import Vuex from "vuex"
  Vue.use(Vuex) 
  var store = new Vuex.Store({
      state:{},       //存储全局共享数据
      mutations:{},   //修改和操作共享数据的一些方法
      getter:{}       //获取全局共享数据方法
  }) //创建Vuex实例对象
②   其他组件操作全局共享数据: 
  js     this.$store.commit("修改数据的方法名字")
    其他组件获取全局共享数据:
  <template> {{$store.getter.获取数据的方法名字}}
```

```
示例:将购物车中数量添加全局共享数据中
①
state:{cartCount:0},
mutations:{
    increment(state){
        state.cartCount++;
    }
},
getter:{
    getCartCount(state){
        return state.cartCount;
    }
}
this.$store.commit("increment");
②
App.vue 
<template> {{ $store.getter.getCartCount }}
```
![](https://raw.githubusercontent.com/kevin9281/-/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190323161650.png)
![](https://raw.githubusercontent.com/kevin9281/-/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190323162119.png)
![](https://raw.githubusercontent.com/kevin9281/-/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190323162628.png)

#### Vuex 共享数据刷新状态丢失
##### 原因:Vuex 刷新 vuex 认为刷新加载全局数据
###### 提供解决方法:
```
使用 sessionStorage 辅助保存 vuex 全局数据,依赖 vuex 通知其他组件来更新数据
state:{
    cartCount:sessionStorage.getltem("cartCount") || 0
},
mutations:{
    sub(state,count){
        state.cartCount=count
        sessionStorage.setltem("cartCount",count)
    }
},
getters:{
    optCatCount(){return state.cartCount}
}
```
```
sessionStorage 是HTML5新增的一个会话存储对象，用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。在JavaScript语言中可通过 window.sessionStorage 或 sessionStorage 调用此对象。
```
```
特点:
1) 同源策略限制。若想在不同页面之间对同一个sessionStorage进行操作，这些页面必须在同一协议、同一主机名和同一端口下。(IE 8和9存储数据仅基于同一主机名，忽略协议（HTTP和HTTPS）和端口号的要求)
2) 单标签页限制。sessionStorage操作限制在单个标签页中，在此标签页进行同源页面访问都可以共享sessionStorage数据。
3) 只在本地存储。seesionStorage的数据不会跟随HTTP请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。(若使用Chrome的恢复标签页功能，seesionStorage的数据也会恢复)。
4) 存储方式。seesionStorage的存储方式采用key、value的方式。value的值必须为字符串类型(传入非字符串，也会在存储时转换为字符串。true值会转换为"true")。
5) 存储上限限制：不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在5MB以下。
可访问 http://dev-test.nemikor.com/web-storage/support-test/ 测试浏览器的存储上限。
```


