---
title: 首页新闻资讯后台数据对接
---

## 首页新闻资讯后台数据对接

>  1. 做一个功能从原网站直接录入分类新闻
```
  1.1 通过js 选中原网站所有 $$('.news_list .title')
  1.2 得到标题 内容 $$('.news_list .title').map(el => el.innerHTML)
  1.3 去掉前面热门5条 $$('.news_list .title').map(el => el.innerHTML).slice(5)
  1.4 放到js内直接使用 写个接口去录入这些数据 省得一个个录入
  1.5 在数据库 db.js 内直接先把所有模型全部引用一遍 npm i require-all 把某一个文件夹下所有文件使用一遍
       require('require-all')(__dirname + './../models')
  1.6 然后创建 routers/web/index.js 编写接口然后返回给页面
  1.7 做新闻接口展示出来
```

>  2. 安装插件 npm i axios 用于做接口请求 把原有的写页面的数据 改为一个空数组接受数据

```
    data(){
      return {
        active: 0
      }
    }
  }
  swiper 点击关联 
  <div class="nav-item" :class="{active: active === i}"
  @click="$refs.list.swiper.slideTo(i)">

  swiper 滑动关联 
  <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex"> 
```

>  3. 安装插件 npm i dayjs 格式化时间 改成任意格式