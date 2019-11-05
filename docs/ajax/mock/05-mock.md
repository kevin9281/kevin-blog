---
title: 通过商品id查找商品信息
---

## 通过商品id查找商品信息

   写请求

   mock / index.js

```
// 这是请求id为多少的商品信息
// 请求的地址接口可以写正则 请求地址包含这个正则的地址就可以跑起来
// 为了让假数据 更像真实数据 在里面加 function
Mock.mock(/\/api\/getgoods/, 'get', function (option) {
  console.log(option) // 此处就是传来的id 地址 把拿到的2 放到返回数据里面

  const res = /\/api\/getgoods\/(\d+)/.exec(option.url)
  console.log(res)
  // exec方法 用前面的正则匹配后面的字符串 如果匹配成功返回数组

  return Mock.mock({
    data: {
      id: res[1] - 0, // 实现传来的数据id是多少 此处就拿到多少 通过正则exec函数
      name: '苹果',
      price: 2,
      count: 199,
      img: '@dataImage(78x78)'
    },
    status: 200,
    message: '获取商品成功!'
  })
})

```

    发送请求 

```
<template  
  <div id="app"  
    <h1  学习MockJs</h1  
    <button @click="getGoodsList"  获取商品列表</button  
    <button @click="addGodds"  获取商品列表</button  
    <button @click="getGoodsById (2)"  根据商品id获取商品信息</button  
  </div  
</template  
```

```
async getGoodsById (id) {
  const { data: res } = await this.$http.get(`/api/getgoods/${id}`)
  console.log(res)
}
```