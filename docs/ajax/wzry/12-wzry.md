---
title: 首页英雄列表 抓取数据导入对接
---

## 首页英雄列表 抓取数据导入对接

> 1.先在后台接口抓取数据

```
$$('.hero-nav > li').map((li,i) => {
    return {
    name:li.innerText,
      heroes:$$('li', $$('.hero-list')[i]).map(el =>{
        return {
        name:$$('h3',el)[0].innerHTML,
        avatar:$$('img',el)[0].src
      }
    })
  }
})
```

>  2. 导入服务器

>  3. 设置点击获取自动高度 <swiper ref="list" :options="{autoHeight:true}"

>  4  新闻详情页

>  5. 英雄详情页