---
title: vue router

---

## 路由的基本配置

```
1. 首先在 views 下 创建页面
2. 在router / index.js 中 懒加载的方式配置路由

const routes = [{
  path: '/home',
  component: () => import('../views/Home.vue')
}]

3. 在App.vue 中 使用 <router-view></router-view> 标签
```



## 路由的跳转

**router-link**

```
<router-link to="/home">home</router-link>
```



**编程式导航**

```
1. <button @click="toHome">funhome</button>

2. methods: {
    toHome() {
      this.$router.push({ path: "/home" });
    }
  }
```



**跳转传参**

```
1. 设置动态路由  

const routes = [{
  path: '/home/:id',
  name: 'home',
  component: () => import('../views/Home.vue'),
}]

2. 绑定事件 <button @click="toHome">funhome</button>

  methods: {
    toHome() {
      this.$router.push({ path: "/home", query: { name: "Kevin" } });
      this.$router.push({ name: "home", params: { id: "3" } });
    }
  }
  
3. 获取参数   
<h1>{{$route.query.name}}</h1>  // 使用query 的话 就不能使用动态路由 不能在路由路径后面加上:
<h1>{{$route.params.id}}</h1>
```





## 动态路由

```
1. 在路由配置 

const routes = [{
  path: '/home/:id',
  component: () => import('../views/Home.vue')
}]

2. 在页面可以拿到获取  <h1>{{$route.params.id}}</h1>
```



## 嵌套路由

```
实现: 头部底部固定 中间部分由 router-view 生成

1. 先在路由配置可以把home 当成主页面 头部底部固定 通过子组件改变其内容显示

const routes = [{
  path: '/home/:id',
  component: () => import('../views/Home.vue'),   
  children:[{
    path:'/child',
    component:()=>import('../views/Children.vue')
  }]
}]

2.  通过 router-view 改变其内容显示
<template>
  <div>
    <h1>头部</h1>
    <router-view></router-view>
    <h1>底部</h1>
  </div>
</template>
```



## 导航守卫

```
实现: 进入路由的时候做一些事情 获取token 判断用户权限 就使用导航守卫 在 main.js 中写上钩子

router.beforeEach((to, from, next) => {
  console.log(to.path)  // 打印当前进入路由的路径
  next()  // 继续跳转
})
```



## 路由懒加载

```

```

