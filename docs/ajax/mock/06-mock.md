---
title: 自定制Random函数
---

## 自定制Random函数

   通过 Random 成员

   Mock.Random 中的方法与数据模板的 @占位符 一一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 @扩展方法 引用。例如：

```
Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
// =   "水瓶座"
Mock.mock('@CONSTELLATION')
// =   "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// =   { constellation: "射手座" }
```

   mock / index.js 写请求

```
// 导入模拟假数据的包

import Mock, {
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
