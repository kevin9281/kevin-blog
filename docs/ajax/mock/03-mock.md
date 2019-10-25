---
title: 使用mock-get
---

## 使用mock-get

> 在项目中使用mock 需要先跟后端 统一好接口 都应该返回那些数据 有那些字段 值是哪些类型的 都应该先约定好 形成文档

>  https://github.com/nuysoft/Mock/wiki/Mock.mock() 中有介绍各种属性与值

```
Miscellaneous:
Random.guid(): 唯一值
Random.id(): 随机生成一个 18 位身份证。
Random.increment() : 生成一个全局的自增整数。
Random.increment( step ):可选。整数自增的步长。默认值为 1。

Helper:
Random.capitalize( word ):把字符串的第一个字母转换为大写。
Random.upper( str ):把字符串转换为大写。
Random.lower( str ):把字符串转换为小写。
Random.pick( arr ):从数组中随机选取一个元素，并返回。
Random.shuffle( arr ):打乱数组中元素的顺序，并返回。
等等 ....
mock 里面的函数 想要调用的话 就在前面加上@ 整体 '@increment(1)'表示自增
图片建议使用 dataImage()
```

> mock / index.js 写接口

```
// 导入模拟假数据的包

import Mock from 'mockjs'

// 通过这个mock函数 可以模拟api接口 (http://mockjs.com/)
Mock.mock('/api/goodslist', 'get', {
  status: 200,
  message: '获取商品列表成功!',
  'data|5-10': [{ // 表示这个data是个数组 里面有5或者到10条随机的数据
    id: '@increment(1)', // 自增的id值
    // 'id|+1': 1, // id 从1开始实现自增+1
    name: '@cword(2,3)', // 随机生成中文字符串
    price: '@natural(2,10)', // 自然数 2-10位之间
    count: '@natural(100,999)', // 数量
    img: '@dataImage(78x78)' // 指定宽高的图片
  }]
})

```

> 就可以在页面中发起请求 app.vue 拿到返回数据 写请求

```
<template>
  <div id="app">
    <h1>学习MockJs</h1>
    <button @click="getGoodsList">获取商品列表</button>
  </div>
</template>

<script>
export default {
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/goodslist')
      console.log(res)
    }
  }
}
</script>

<style>
</style>
```