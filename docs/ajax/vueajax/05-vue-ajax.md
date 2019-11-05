---
title: Vue+wzry后台管理
---

## 1.创建手册

   全局安装node vne和脚手架

```
0.1 node -v  （检查一下 版本） node 安装地址：http://nodejs.cn/download/
0.2 npm  install  -g  vue-cli 全局安装脚手架  ( cnpm install -g vue-cli )
0.3 npm install -g @vue/cli 全局安装vue 
0.4 **: 如果npm在国内的网络环境下可能会比较慢，解决方案：
    安装：npm install cnpm -g --registry=https://registry.npm.taobao.org；  
    注意：安装完后最好查看其版本号cnpm -v或关闭命令提示符重新打开，安装完直接使用有可能会出现错误；
    注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm（以下操作将以cnpm代替npm）。
```

    1. 创建主文件夹

    2. 生成内容 

```
  2.1 mkdir server 创建server文件夹    (服务端项目 给web 和 管理项目的接口)
  2.2 创建脚手架 vue create web 创建web端项目 (选默认)
  2.3 创建脚手架 vue create admin 创建后台管理项目 (选默认)
```

    3. 进入服务端 初始化项目  (项目介绍文件)

```
  3.1 cd server
  3.2 npm init -y
  3.3 新建package.json 内的 "main" 服务端入口文件
  3.4 "scripts" 自定义脚本  "serve": "nodemon index.js",
  3.5 nodemon 需要全局安装 npm i -g nodemon
  3.6 就可以用 npm run serve 启动服务器
```

    4.安装插件

```
  4.1 进入admin 安装 vue add element
  4.1.1 ? How do you want to import Element? (Use arrow keys)    Fully import 引用方式
        ? Do you wish to overwrite Element's SCSS variables? No
        ? Choose the locale you want to load (Use arrow keys)    zh-CN
  4.1.2 安装路由 vue add router 
        ? Use history mode for router? (Requires proper server setup for index fallback in production)    No
  4.2 安装 axios  请求数据提交接口 npm i axios
```

    5.完成admin 内数据接口axios  npm install axios

```
  5.1 创建http.js 然后编辑
  import axios from 'axios'

  const http = axios.create({
  baseURL: "http://locahost:3000/admin/api"
  })

  export default http

  5.2 然后main.js 内导入 就可以在任意页面使用 this.$http.post
  import http from './http'
  Vue.prototype.$http = http
```

    6.完成服务器 创建服务器 

```
  6.0 下载mogondb
       cmd 内 先进入安装目录  1. D:   2. cd D:\MongoDB\bin   3.mongod -dbpath D:\data\db  4. mongo  //检查版本号 是否连接成功
       配置环境变量
  6.1 进入server 安装 npm i express@next cors mongoose
  6.2 启动服务器 npm run serve
```

    7.安装插件 npm i inflection   用于单词的格式转换 单复数的转换

    8.基于 Quill、适用于 Vue 的富文本编辑器，支持服务端渲染和单页应用。 可视化编辑

```
    8.1 Vue-Quill-Editor
    8.2 vue2-editor: npm install vue2-editor 需要在前端页面安装
```

```
  <template  
  <div id="app"  
    <vue-editor v-model="content"  </vue-editor  
    </div  
  </template  

  <script  
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        content: "<h1  Some initial content</h1  "
      };
    }
  };
  </script  
```

```
  8.3 实现图片上传 在文档后面 Example - Custom Image Handler
  <template  
    <div id="app"  
      <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="htmlForEditor"   </vue-editor  
    </div  
  </template  
```

## 2.选型

```
工具安装和环境搭建(nodejs,npm,mongodb)
初始化项目
```

    管理后台 : 基于Element UI的后台管理基础界面搭建

```
创建分类

分类列表

修改分类

删除分类

子分类

通用 CRUD 接口

装备管理

图片上传 (multer)

英雄管理

编辑英雄 (关联,多选,el-select, multiple)

技能编辑

文章管理

富文本编辑器 (quill)

首页广告管理

管理员账号管理 (bcrypt)

登录页面

登录接口 (jwt,jsonwebtoken)

服务端登录校验

客户端路由限制 (beforeEach, meta)

上传文件的登录校验 (el-upload, headers)
```

    移动端网站

```
"工具样式"概念和 SASS (SCSS)
样式重置
网站色彩和字体定义 (colors, text)
通用flex布局样式定义 (flex)
常用边距定义 (margin, padding)
主页框架和顶部菜单
首页顶部轮播图片 (vue swiper)
使用精灵图片 (sprite)
使用字体图标 (iconfont)
卡片组件 (card)
列表卡片组件 (list-card, nav, swiper)
首页新闻资讯-数据录入(+后台bug修复)
首页新闻资讯-数据接口
首页新闻资讯-界面展示
首页英雄列表-提取官网数据
首页英雄列表-录入数据
首页英雄列表-界面展示
新闻详情页
新闻详情页-完善
英雄详情页-1-前端准备
英雄详情页-2-后台编辑
英雄详情页-3-前端顶部
英雄详情页-4-完善
四、发布和部署 (阿里云)
生产环境编译
购买域名和服务器
域名解析
Nginx 安装和配置
MongoDB数据库的安装和配置
git 安装、配置ssh-key
Node.js 安装、配置淘宝镜像
拉取代码，安装pm2并启动项目
配置 Nginx 的反向代理
迁移本地数据到服务器 (mongodump)
```

## 3.npm使用国内淘宝镜像的方法

    一.通过命令配置

    1. 命令

```
npm config set registry https://registry.npm.taobao.org
```

    2. 验证命令

```
npm config get registry
如果返回https://registry.npm.taobao.org，说明镜像配置成功。
```

    二、通过使用cnpm安装  

    1. 安装cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

    2. 使用cnpm

```
cnpm install xxx
```


## 4.下载mangodb  

```
https://www.mongodb.com/download-center
```

    选择msi 下载

    下载完配置环境变量  因为mondgdb 不像是node 下载完就直接配置了环境

    右键点击计算机 然后点属性 =   高级系统设置 =   环境变量 =   path =   把下载的mongodb 的bin 全目录新建到环境变量中 然后保存  (D:\MongoDB\bin)

    然后就可以在全局cmd 内测试 直接输入 mongod

    在c盘根目录下创建 data 内创建文件夹 db (默认的数据库的目录)

    然后cmd 命令行全局 mongod 就可以开启了


## 5.CRUD 通用接口

    把服务器后端页面的接口 第四个参数换成动态路径

    1.子路由挂载的路径 加前缀改动态

    2.把前面的所有发送请求的路径 都把 categories 删掉

    3.加入中间键 自定义中间键

```
  app.use('/admin/api/rest/:resource', async (req,res,next) =   { /* 中间键 */
    const modelName = require('inflection').classify(req.params.resource)
    /* 利用插件转换 接口路径的参数的格式 */
    /* return res.send ({ modelName }) */
    req.Model = require(`../../models/${modelName}`) 
    next()
  },router) 
```

      4.然后把所有的请求加前缀为 req.Model
```
  const model = await req.Model.findById(req.params.id)  //示例
```

## 6.引起报错 sockjs

    首先 sockjs-node 是一个JavaScript库，提供跨浏览器JavaScript的API，创建了一个低延迟、全双工的浏览器和web服务器之间通信通道。

    服务端：sockjs-node（https://github.com/sockjs/sockjs-node）
    客户端：sockjs-clien（https://github.com/sockjs/sockjs-client）


    如果你的项目没有用到 sockjs，vuecli3 运行 npm run serve 之后 network 里面一直调研一个接口：http://localhost:8080/sockjs-node/info?t=1462183700002

    作为一个有节操的程序猿，实在不能忍受，特意自己研究了下源码，从根源上关闭这个调用

    1. 找到/node_modules/sockjs-client/dist/sockjs.js 
    2.找到代码的 1605行  

```
  try {
  //  self.xhr.send(payload); 把这里注掉
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
```

    3.刷新，搞定。

## 7.element ui 自带插件 上传功能

    上传图片是我们选择图片之后 他会要发起一个异步请求 把图片传给某一个接口

    然后在后端接口保存这张图片 保存后并返回给客户端一个图片的整个url网址是什么

    最终前端拿到响应之后 把地址展示出来

```
参数:
:action:地址 类似表单地址form active  上传的借口地址
:on-success  : 表示成功之后做什么
:before-upload : 上传之前做什么
```

    把服务端返回的一堆东西 把其中表示图片地址的 赋值给model.icon 就能展示图片了 同时model.icon也赋值了

    file 字段名 (binary) 二进制

    服务端上传接口:

    1.安装中间键插件 专门用来上传数据的  npm i multer

    2.服务端 后台界面 admin/index.js

```
  const multer = require('multer')
  const upload = multer({dest: __dirname + '../../uploads'}) /* 绝对地址 */
  app.post('/admin/api/upload', upload.single('file') , async(req,res) =   {
    const file = req.file
    file.url = `http:localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
```

    3.把上传文件夹使用静态文件托管  服务端 index

```
app.use('/uploads' , express.static(__dirname + '/uploads'))
```

    4.就会多一个url 然后前端展示出来

```
  afterUpload(res){
    this.model.icon = res.url
  },
```

    会发现无法赋值问题 vue内显示赋值

    5.前端界面

```
<el-input v-model="model.name"  </el-input  
  </el-form-item  
  <el-form-item label="图标"  
    <el-input v-model="model.icon"  </el-input  
    <el-upload
      class="avatar-uploader"
      :action="$http.defaults.baseURL + '/upload'"
      :show-file-list="false"
      :on-success="afterUpload"
      
      <img v-if="model.icon" :src="model.icon" class="avatar"  
      <i v-else class="el-icon-plus avatar-uploader-icon"  </i  
    </el-upload  
  </el-form-item  
  <el-form-item  
    <el-button type="primary" native-type="submit"  保存</el-button  

<script  
export default {
  props:{
    id:{}
  },
  data(){
    return {
      model: {}
    }
  },
  methods:{
    afterUpload(res){
      this.$set(this.model, 'icon', res.url) /* VUE提供的上传 set方法 */
      // this.model.icon = res.url
    },
    async save(){
      let res 
      /* 如果有id 用 put方法提交 否则 用post */
      if(this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else{
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      /* 发接口请求 请求英文名称*/
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created(){
    this.id && this.fetch();  /* 如果有this.id 才执行 fetch()方法 */
  }
}
</script  
```

```
<el-table :data="items"  
      <el-table-column prop="_id" label="ID" width="240"  </el-table-column  
      <el-table-column prop="name" label="物品名称"  </el-table-column  
      <el-table-column prop="icon" label="图标"  
        <template slot-scope="scope"  
          <img :src="scope.row.icon" style="height:3rem;"  
        </template  
      </el-table-column  
      <el-table-column fixed="right" label="操作" width="180"  
        <template slot-scope="scope"  
<el-button  </el-button  
```

## 8.后台管理员权限

    1. 密码不能用明文保存

```
  1.1 在后端模型里面安装 npm i bcrypt 用于做密码的散列
  1.2 每次都会生成不一样的值 比md5 更安全
```

```
    password: { 
      type: String , 
      select: false,  =  用于显示或者隐藏密码明文 用户密码留空
      set ( val ) {
      return require('bcrypt').hashSync( val, 10 )
    }}
```
      select 如为false 则不显示 不管怎么保存也不会把原来的改变

## 9.登录

    1.创建登录路由 引入登录界面

    2.给登录界面 定义 model 然后绑定model username password

    3.@submit.native.prevent 表单阻止默认提交 绑定到from 实现点击登录 提交model username password 数据

    4.写后台接口

```
  请求到后台login接口 把用户名传到login接口 然后在后台校验 最终得到数据 
  返回给前端一个token密钥 然后前端通过密钥来证明自己是哪一个用户
```

    5.跟后台约定好 如果服务端发生报错 统一返回一个json 里面有个message表示要让客户端显示什么文字
     通用的处理方案 当服务端返回一个错误代码 里面有个message的话 就弹出来
```
/* 给整个请求加一个拦截器 */
http.interceptors.response.use( res =   {
  return res
}, err =  {
  /* 如果message有内容才弹出内容 */
  if ( err.response.data.message ){
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  return Promise.reject(err)
})
```

    6.用户存在的话 就要在后台校验密码是否正确

    7.服务端安装返回token 做web token验证 先安装插件 npm i jsonwebtoken

```
sessionStorage.token = res.data.token   -关闭浏览器将不做保存
localStorage.token = res.data.token     -关闭浏览器后还会保存
```

    8.服务端登录校验

```
8.1 服务端做限制 如果没有token的话 就不允许访问
8.2 更改服务器index 在显示列表之前 加个前置的处理函数 加中间键
8.3 在前端传来数据的 headers 请求头里面加一个东西
8.4 在http.js 里面给所有的前端接口 加一个请求头
8.5 然后在后端获取在请求头加的东西
8.6 然后在后端 进行解密 然后通过 findbyId 找数据库内是否存在这个用户
8.7 然后进行判断
```

    9.服务端安装插件 http-assert   npm i http-assert 
    用于测试的时候判断确保这个东西是否存在  顶替if判断 发错误码

```
9.1 先引用  const assert = require('http-assert')
9.2 用 assert(user, 422, '用户不存在') 抛出异常 直接用一行代替之前的if 判断抛出错误
9.3 让整个nodejs程序去报错 然后在最后捕获异常 然后自己选择怎么处理
9.4 判断如果后台抛出错误401 前端就跳转登录页面
```

    10.封装校验中间件 把判断的中间键写成一个函数形式
    在服务端创建新文件夹 然后里面写中间件
    用函数形式 module.exports = options =   { return 中间件内容 }
    通过options 调用
    每一个创建的中间件文件里面都必须引入 使用到的插件

```
10.1 使用中间件 const authMiddleware = require("../../middleware/auth")
10.2 调用中间件 app.use('/admin/api/rest/:resource', authMiddleware() , resourceMiddleware,router) 
```

    11.前端客户端路由限制

```
11.1 给允许公开访问的页面 路由添加 
  meta : { isPublic: true },
11.2 加导航守卫 beforeEach
  const router = new Router({

  })

router.beforeEach((to, from ,next) =   {    //去哪个页面 来自哪个页面 接下来怎么处理
  if (!to.meta.isPublic && !localStorage.token) { //如果不是公开页面 同时也没有token
    return next('/login')   //那么跳转登录页
  }
  next()      //否则进入此页面
})
export default router 
```

## 10.vue 手机端官网

    1. SASS(SCSS) css都是直接在main.js内引入
    进入web页面安装插件 npm i -D sass sass-loader

    2. 开发网站第一步重置样式

    3. 网站色彩和字体定义 colors 定义变量 

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

    4. 更改设置 px to rem  改为 html的px

    5.定义flex布局

    6.运用3重嵌套 嵌套出各种边距

   7.先安装路由插件 vue add router 写单页面应用

```
  se history mode for router?  //使用的是普通的模式 地址栏会加上#
  (Requires proper server setup for index fallback in production) No
```

    8.创建个新 Main.vue 页面 把主页面路由改为新页面 scaffold
   Main编写头部

    9.编写Home 内容 

```
9.1 首页幻灯片 swiper 前端页面 安装插件 npm install vue-awesome-swiper --save
9.2 引入配置  github上 和 npm 官网都有 分是全局使用 还是局部使用
```

    10.精灵图片(雪碧图) sprite 一张图片内有很多小图片 通过css背景定位方式决定显示哪个图标
     借助 www.spritecow.com 图片传上去 自动定位

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

    11.字体图标  用文字画出来的图标 可以用文字控制 也可以加颜色

    12.卡片布局 组件 card 图标 名称 都可以算是卡片布局 封装到全局

```
  12.1 封装组件 创建 components/Card.vue
  12.2 把通用的放进去 把数据改成动态传值
```

    13.封装一个带分类 带列表的组件 list-card 列表卡片

```
13.0 components 内创建 listCard.vue
13.1 main.js 内 引用list-card组件
13.2 把原有的card 内容部分全写成 <slot  </slot  
13.3 编辑新listcard 编辑数据类型
  props:{
    icon: {type:String , required:true},
    title: {type:String , required:true},
    categories:{type:Array, required:true}
  },
13.4 从home中请求数据
13.5 给home <m-list-card  </m-list-card  绑定数据 :categories="newsCats"
13.6.在listcard 内 循环数据 newsCats
13.7 在listcard内 <slot name="items" :category="category"  </slot   给数据绑定回去
13.8 在home中 <template #items="{category}"  </template   引入数据 然后循环
```

## 11.首页新闻资讯后台数据对接

    1. 做一个功能从原网站直接录入分类新闻
```
  1.1 通过js 选中原网站所有 $$('.news_list .title')
  1.2 得到标题 内容 $$('.news_list .title').map(el =   el.innerHTML)
  1.3 去掉前面热门5条 $$('.news_list .title').map(el =   el.innerHTML).slice(5)
  1.4 放到js内直接使用 写个接口去录入这些数据 省得一个个录入
  1.5 在数据库 db.js 内直接先把所有模型全部引用一遍 npm i require-all 把某一个文件夹下所有文件使用一遍
       require('require-all')(__dirname + './../models')
  1.6 然后创建 routers/web/index.js 编写接口然后返回给页面
  1.7 做新闻接口展示出来
```

    2. 安装插件 npm i axios 用于做接口请求 把原有的写页面的数据 改为一个空数组接受数据

```
    data(){
      return {
        active: 0
      }
    }
  }
  swiper 点击关联 
  <div class="nav-item" :class="{active: active === i}"
  @click="$refs.list.swiper.slideTo(i)"  

  swiper 滑动关联 
  <swiper ref="list" @slide-change="() =   active = $refs.list.swiper.realIndex"   
```

    3. 安装插件 npm i dayjs 格式化时间 改成任意格式

## 12.首页英雄列表 抓取数据导入对接

   1.先在后台接口抓取数据

```
$$('.hero-nav    li').map((li,i) =   {
    return {
    name:li.innerText,
      heroes:$$('li', $$('.hero-list')[i]).map(el =  {
        return {
        name:$$('h3',el)[0].innerHTML,
        avatar:$$('img',el)[0].src
      }
    })
  }
})
```

    2. 导入服务器

    3. 设置点击获取自动高度 <swiper ref="list" :options="{autoHeight:true}"

    4  新闻详情页

    5. 英雄详情页

## 13.部署和发布

    1.生产环境下的编译

```
1.1 生产环境下就不会有这些端口了 不需要在服务器上运行 npm run serve 这种命令了
1.2 只会当成纯粹的 html 访问
1.3 把admin web 都编译到server里面的某一个静态文件夹 让他可以访问到
    当访问localhost:3000的时候就访问web端
    当访问localhost:3000/admin 的时候就访问后台
1.4 在admin 输入命令 npm run build 生产模式
    会压缩代码 在源文件生成一个dist文件夹 里面会生成纯粹的html css js
1.5 安装插件 npm i -g serve
    就可以启动 serve dist 直接启动admin 端口 可以登录可以查看 只要开启了数据库
    dist文件夹复制到任何地方 启动一个web服务器就可以访问
1.6 接口地址需要根据开发和编译来进行替换 不然访问的3000本地域名
    更改http.js 静态写死的localhost:3000接口地址  改成动态/绝对地址(不能包含主机名)
    baseURL: process.env.VUE_APP_API_URL || 'admin/api',
1.7 在admin根文件目录 添加一个环境变量文件 
    .env.development (开发环境下用的vue变量) 本地访问的地址添加
    然后再编译 js文件内就不会有 localhost:3000的字节了
1.8 直接把 admin/dist 文件夹 复制到 server 然后改名为admin
    然后更改 server/index.js 静态托管
    更改html内应用生成css js 的地址 admin/vue.config.js 创建vue cli的配置文件
1.9 在前端 main.js 内更改baseURL 更改接口地址
    同样创建 web/vue.config.js    web/.env.development 
```

    2 . 购买域名和服务器

```
    买好域名服务器后
   mac 直接终端 ssh rouut@47.75.79.126
   windows 直接官网远程连接 远程密码复制好 不出现第二次
  logon root  然后输入 password 
```

    3.域名解析
     同样就可以访问公共ip 和域名

    4.Nginx 安装和配置
