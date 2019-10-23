---
title: vue 手机端官网
---

## vue 手机端官网

>  1. SASS(SCSS) css都是直接在main.js内引入
>  进入web页面安装插件 npm i -D sass sass-loader

>  2. 开发网站第一步重置样式

>  3. 网站色彩和字体定义 colors 定义变量 

```
text 定义字体 让编写的时候直接使用class来确定文本的位置

//   前面的名字  后面具体的值  变量colors
@each $colorKey , $color in $colors {
  .text-#{$colorKey} {
    color:$color
  }
  .bg-#{$colorKey} {
    background-color:$color
  }
}

// text
@each $var in (left , center , right) {
  .text-#{$var} {
    text-align: $var;
  }
}
```

>  4. 更改设置 px to rem  改为 html的px

>  5.定义flex布局

>  6.运用3重嵌套 嵌套出各种边距

> 7.先安装路由插件 vue add router 写单页面应用

```
  se history mode for router?  //使用的是普通的模式 地址栏会加上#
  (Requires proper server setup for index fallback in production) No
```

>  8.创建个新 Main.vue 页面 把主页面路由改为新页面 scaffold
> Main编写头部

>  9.编写Home 内容 

```
9.1 首页幻灯片 swiper 前端页面 安装插件 npm install vue-awesome-swiper --save
9.2 引入配置  github上 和 npm 官网都有 分是全局使用 还是局部使用
```

>  10.精灵图片(雪碧图) sprite 一张图片内有很多小图片 通过css背景定位方式决定显示哪个图标
>   借助 www.spritecow.com 图片传上去 自动定位

```
.sprite {  
  background: url(../images/index.png) no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  //九宫格精灵图
  &.sprite-news{
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }
  &......
}
```

>  11.字体图标  用文字画出来的图标 可以用文字控制 也可以加颜色

>  12.卡片布局 组件 card 图标 名称 都可以算是卡片布局 封装到全局

```
  12.1 封装组件 创建 components/Card.vue
  12.2 把通用的放进去 把数据改成动态传值
```

>  13.封装一个带分类 带列表的组件 list-card 列表卡片

```
13.0 components 内创建 listCard.vue
13.1 main.js 内 引用list-card组件
13.2 把原有的card 内容部分全写成 <slot></slot>
13.3 编辑新listcard 编辑数据类型
  props:{
    icon: {type:String , required:true},
    title: {type:String , required:true},
    categories:{type:Array, required:true}
  },
13.4 从home中请求数据
13.5 给home <m-list-card></m-list-card>绑定数据 :categories="newsCats"
13.6.在listcard 内 循环数据 newsCats
13.7 在listcard内 <slot name="items" :category="category"></slot> 给数据绑定回去
13.8 在home中 <template #items="{category}"></template> 引入数据 然后循环
```