---
title: 登录
---

## 登录

>  1.创建登录路由 引入登录界面

>  2.给登录界面 定义 model 然后绑定model username password

>  3.@submit.native.prevent 表单阻止默认提交 绑定到from 实现点击登录 提交model username password 数据

>  4.写后台接口

```
  请求到后台login接口 把用户名传到login接口 然后在后台校验 最终得到数据 
  返回给前端一个token密钥 然后前端通过密钥来证明自己是哪一个用户
```

>  5.跟后台约定好 如果服务端发生报错 统一返回一个json 里面有个message表示要让客户端显示什么文字
>   通用的处理方案 当服务端返回一个错误代码 里面有个message的话 就弹出来
```
/* 给整个请求加一个拦截器 */
http.interceptors.response.use( res => {
  return res
}, err =>{
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

>  6.用户存在的话 就要在后台校验密码是否正确

>  7.服务端安装返回token 做web token验证 先安装插件 npm i jsonwebtoken

```
sessionStorage.token = res.data.token   -关闭浏览器将不做保存
localStorage.token = res.data.token     -关闭浏览器后还会保存
```

>  8.服务端登录校验

```
8.1 服务端做限制 如果没有token的话 就不允许访问
8.2 更改服务器index 在显示列表之前 加个前置的处理函数 加中间键
8.3 在前端传来数据的 headers 请求头里面加一个东西
8.4 在http.js 里面给所有的前端接口 加一个请求头
8.5 然后在后端获取在请求头加的东西
8.6 然后在后端 进行解密 然后通过 findbyId 找数据库内是否存在这个用户
8.7 然后进行判断
```

>  9.服务端安装插件 http-assert   npm i http-assert 
>  用于测试的时候判断确保这个东西是否存在  顶替if判断 发错误码

```
9.1 先引用  const assert = require('http-assert')
9.2 用 assert(user, 422, '用户不存在') 抛出异常 直接用一行代替之前的if 判断抛出错误
9.3 让整个nodejs程序去报错 然后在最后捕获异常 然后自己选择怎么处理
9.4 判断如果后台抛出错误401 前端就跳转登录页面
```

>  10.封装校验中间件 把判断的中间键写成一个函数形式
>  在服务端创建新文件夹 然后里面写中间件
>  用函数形式 module.exports = options => { return 中间件内容 }
>  通过options 调用
>  每一个创建的中间件文件里面都必须引入 使用到的插件

```
10.1 使用中间件 const authMiddleware = require("../../middleware/auth")
10.2 调用中间件 app.use('/admin/api/rest/:resource', authMiddleware() , resourceMiddleware,router) 
```

>  11.前端客户端路由限制

```
11.1 给允许公开访问的页面 路由添加 
  meta : { isPublic: true },
11.2 加导航守卫 beforeEach
  const router = new Router({

  })

router.beforeEach((to, from ,next) => {    //去哪个页面 来自哪个页面 接下来怎么处理
  if (!to.meta.isPublic && !localStorage.token) { //如果不是公开页面 同时也没有token
    return next('/login')   //那么跳转登录页
  }
  next()      //否则进入此页面
})
export default router 
```