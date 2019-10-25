---
title: 对mock提供的数据模块拆分
---

## 对mock提供的数据模块拆分

> 在mock文件夹下创建 goods.js 此文件表示所有商品接口模块 还可以新建 商品接口模块 用户接口模块等...

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

// 这里的option 是请求过来相关的参数
Mock.mock('/api/addgoods', 'post', function (option) {
  console.log(option) // 一定要console 一下 看一下有没有数据
  // {url: "/api/addgoods", type: "POST", body: "{"name":"菠萝","price":8,"count":550,"img":""}"}
  return Mock.mock({ // 外层是拦截ajax的 里面是模拟假数据的
    status: 200,
    message: '@cword(2,5)!'
  })
})

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
      name: '@fruit()', // 实现给一个数组 当接收请求的时候 随机从一个水果的数组里 随机挑选一个出去
      price: 2,
      count: 199,
      img: '@dataImage(78x78)'
    },
    status: 200,
    message: '获取商品成功!'
  })
})

```

> 再从 mock / index.js 中 导入商品模块 就只需要将index.js 暴露出去 方便管理

```
// 导入扩展函数(Random 自定义假数据)
import './extends'

// 导入商品模块
import './goods'

// 导入用户模块 user.js
// 导入购物车模块 cart.js
```

> 还可以创建一个文件 专门保存自定义假数据

> mock / extends.js 

```

import {
  Random
} from 'mockjs'

// 创建自定义mock 函数
Random.extend({
  // 自定义函数名: function 函数  (这个自定义函数名 可以被@调用)
  'fruit': function () { // 此处function 不要写成箭头
    const arr = ['榴莲', '菠萝蜜', '椰子', '苹果', '菠萝', '西瓜']
    return this.pick(arr) // 此处是随机选一个返回
  }
})

```