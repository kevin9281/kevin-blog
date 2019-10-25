---
title: 使用mock-post
---

## 使用mock-post

> 写接口

> 在模拟post请求的时候 就会模拟打印下 option 
> option 是相关的参数  

```
// 这里的option 是请求过来相关的参数
Mock.mock('/api/addgoods', 'post', function (option) {
  console.log(option) // 一定要console 一下 看一下有没有数据
  // {url: "/api/addgoods", type: "POST", body: "{"name":"菠萝","price":8,"count":550,"img":""}"}
  return Mock.mock({ // 外层是拦截ajax的 里面是模拟假数据的
    status: 200,
    message: '@cword(2,5)!'
  })
})
```

> 发请求

```
<template>
  <div id="app">
    <h1>学习MockJs</h1>
    <button @click="getGoodsList">获取商品列表</button>
    <button @click="addGodds">获取商品列表</button>
  </div>
</template>
```

```
    async addGodds () {
      const { data: res } = await this.$http.post('/api/addgoods', {
        name: '菠萝',
        price: 8,
        count: 550,
        img: ''
      })
      console.log(res)
    }
```