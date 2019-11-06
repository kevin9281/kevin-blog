---
title: Vue青光后台管理系统
---

##  1.开始创建项目

   安装node 

```
node -V
npm -V
```

   安装vue-cli

```
mac 系统下只有要 -g 的全局插件 就需要使用sudo  
sudo npm i -g @vue/cli  

测试vue-cli vue-V
```

    使用vue-cli 创建vue项目

   使用vue ui创建

   选择使用

```
babel
typescript
router
vuex
css pre-processors

下一步
使用 class-style
使用 Jsx
使用 router history
使用 sass/scss (with node-sass)
```

   然后就可以运行项目

   .gitignore 就是上传github的时候 需要忽略什么东西

   babel.congif.js 设置babel

   package.json 模块依赖管理模块设置启动方式

   tsconfig.json 设置ts用到的东西

   src 目录

```
/assets 静态 图片 css

/components 封装的组件

/views 视图 也是组件 可见的组件

App.vue 根组件

main.ts 入口函数文件

router.ts 设置路由

store.ts vueX存储的

shime-tsx.d.ts  
告诉你当前项目可以识别以ts结尾的文件 在vue项目中可以使用js代码去写  

shims-vue.d.ts  
当前的ts 可以识别vue文件 告诉ts导入vue
```

   使用ts 带@符号的就是装饰器

```
装饰器就是对现有的函数或者类进行扩展或者补充
```

   在public目录下创建css 然后里面复制初始化css文件 reset.css

```
http://meyerweb.com/eric/tools/css/reset/
```

   然后在public /index.html 中引入

```
<link rel="stylesheet" href="css/reset.css"  

设置样式
<style  
  html,body{
    height: 100%;
    overflow: hidden;
  }
</style  
```

   Home.vue

```
<template  
  <div class="home"  home</div  
</template  

<script lang="ts"  
//引入组件 
import { Component, Vue } from "vue-property-decorator";
//ts装饰器 给组件再加组件
@Component({
  components: {}
})
//导出class为home的组件 继承vue
export default class Home extends Vue {}
</script  

<style lang="scss" scoped  
</style  
```

   app.vue

```
<template  
  <div id="app"  
    <router-view /  
  </div  
</template  

<style lang="scss"  
#app {
  width: 100%;
  height: 100%;
}
</style  

```


##  2.登录界面

   添加element ui 引入之后 使用Vue.use()把这个中间件模块使用一下

```
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
```

   在scr / views 创建一个Login 文件夹 

   Login文件夹下创建两个文件 写完结构

```
Login.vue 登录页面
Password.vue 找回密码页面
```

   router/ index.ts 中添加路由

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/login.vue';
import Password from '../views/Login/password.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () =   import("@/views/Login/Login.vue")
  },
  {
    path: '/password',
    name: 'password',
    component: () =   import("@/views/Login/Password.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

```

   页面中的插槽 因为有些地方是共享的 所以用一个插槽控制样式 插槽的位置就是放登录和找回密码页面的表单的

```
<template  
  <!-- 登录页面和密码找回页面里面的头部样式 --  
  <div class="login-page"  
    <div class="page-center"  
      <div class="info"  
        <div class="title"  
          <img src="@/assets/logo.png" alt /  
          <span  青光在线</span  
        </div  
        <div class="detail"  
          <span  青光在线,让管理更加便利</span  
        </div  
      </div  
      <!-- 插槽 --  
      <div class="container"  
        <slot name="container"  </slot  
      </div  
    </div  
  </div  
</template  

<script lang="ts"  
/* vue-property-decorator 在Vue中使用TypeScript时，非常好用的一个库，使用装饰器来简化书写。 */
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
/* export defalut 在是输出，在vue里面的用法是用来输出组件，相当于把接口暴露在外部，供所有文件用import来调用 */
export default class LayoutHeader extends Vue {}
</script  

<style lang="scss" scoped  
.login-page {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-back.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .page-center {
    position: absolute;
    width: 400px;
    height: 540px;
    margin: auto;
    top: 60px;
    right: 0;
    left: 0;
    .info {
      text-align: center;
      height: 150px;
      .title {
        display: flex;
        justify-content: center;
        align-items: Center;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        img {
          width: 200px;
          padding-bottom: 3px;
        }
      }
      .detail {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 40px;
        line-height: 1.5;
      }
    }
    .container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
  }
}
</style  
```


   在登录页面中引入 LoginHeader 公共部分

```
<template  
  <!-- 登录页面 --  
  <div class="login"  
    <LoginHeader  
      <!-- 插糟 在此处写东西 就是相当于写在slot内 slot参数和header中一致--  
      <el-form slot="container"  
        <div class="title"  
          <h3  账号密码登录</h3  
        </div  
      </el-form  
    </LoginHeader  
  </div  
</template  

<script lang="ts"  
import { Component, Vue } from "vue-property-decorator";
import LoginHeader from "./LoginHeader.vue";

@Component({
  components: {
    LoginHeader
  }
})
export default class Login extends Vue {}
</script  

<style lang="scss" scoped  
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style  
```

##  3.登录表单和验证

   使用ts装饰器 Provide 装饰器: 强调 ruleForm 存储数值的类型 = 当前的值  
   Provide 装饰器的作用就不需要把数据放入data了 可以通过装饰器修改当前的属性 属性也有扩展性  
   就可以绑定初始值 然后在标签内用:v-model 进行双向绑定

```
export default class Login extends Vue {
  @Provide() ruleForm: {
    username: String;
    pwd: String;
    autoLogin: boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true //是否自动登录
  };

```


   当页面需要图标的时候 直接可以到 public/ index.html 中 引入bootstrap的图标

```
<link
  href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  rel="stylesheet"
/  
```

   然后在页面中使用

```
<i slot="prefix" class="fa fa-user-o"  </i  
<i slot="prefix" class="fa fa-lock"  </i  
```

   忘记密码路由跳转

```
<el-button @click="$router.push('/password')" type="text" class="forget"  
```

   单选框绑定初始值 使用v-model双向绑定

```
<el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin"   7天内自动登录 </el-checkbox  
```

   表单验证规则 rule:{}

```
  /* 表单验证规则 rules 需要绑定到表单 el-form 上 */
  /* 然后在每一个 el-form-item 上绑定 prop  */
  @Provide() rules = {
    /* 是否必填:true,消息文字:"请输入账号" 触发:'当失去焦点触发消息文字'*/
    username:[{ required:true, message:'请输入账号', trigger:'blur' }],
    pwd:[{ required:true, message:'请输入密码', trigger:'blur' }]
  }
  
<el-form  :rules='rules' 
<el-form-item prop="username"  
<el-form-item prop="pwd"  

```

   给登录按钮绑定点击事件(阻止默认行为)

```
<el-form-item  
  <!-- @submit.native.prevent是用来阻止默认行为的 --  
  <el-button @click.native.prevent="handleSubmit" 
  type="primary" style="width:100%"  
    登录
  </el-button  
</el-form-item  
```

   给登录按钮绑定方法

```
/* ts的形式写方法 没有返回值就给void 要获取到当前的from 要给from添加个ref */
/* Javascript中void是一个操作符，该操作符指定要计算一个表达式但是不返回值 */
/* 在此处就可以直接使用 */
/* validate 是element-ui 的方法 任一表单项被校验后触发 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）*/
/* 因为ts规定.validate前面的值必须定义类型 所以加个括号 as any */
handleSubmit():void{
(this.$refs["ruleForm"] as any).validate((valid:boolean) =  {
  if(valid){
    console.log("校验通过!")
  }
})
}
```

##  4.封装axios 实现登录拦截

   在根路径下 创建 vue.config.js文件

   在文件中配置反向代理
   配置 proxy 跨域

```
module.exports = {
  // 反向代理
  devServer: {
    open: true,  //开启
    host: 'localhost', //域名
    port: 8080,  //端口号
    https: false, //https
    hotOnly: false,
    proxy: { 
      // 配置跨域
      '/api': {
        target: 'https://vuets-api.herokuapp.com/api/', //请求的接口地址
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''  //使用api 代替全路径
        }
      }
    },
    before: app =   {}
  }
};

```

   安装axios
   当在vue中使用ts 都要装2个东西 在ts下使用的axios 和 axios

```
npm i axios @types/axios --save  
 /* save会自动修改package.json 是运行依赖*/
```

   在scr / utlis(工具) / http.ts 文件

```
/* 引入 axios 和 { axios提供的响应的类型, axios提供的请求的类型 } */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
/* 引入Message提醒  用途是如果有报错 会发出提醒字体 */
import { Message } from 'element-ui';

/**
 * http请求工具类
 *
 * 请求拦截器 负责将客户端标识token值存储并放置在头部提交给服务端
 *
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */
```
   创建axios实例

```
// 创建axios的实例
const service = axios.create({
  timeout: 10000 //请求如果是这个时间就超时了
});
```

   请求拦截

```
// 请求拦截
// request 是我们的请求 请求里面会有config 他的类型是AxiosRequestConfig
// 如果请求成功直接把当前的config 返回
// 如果失败的话就会把错误信息 返回
service.interceptors.request.use(
  (config: AxiosRequestConfig) =   {
    return config;
  },
  (err: any) =   {
    Promise.reject(err);
  }
);
```

   响应拦截

```
// 响应拦截
// response 是我们的请求 请求里面会有response 他的类型是 AxiosResponse
// 如果请求成功 会返回 response
// 如果失败的话 判断当前的 err
// 如果有err 与当前的err的状态也存在 
// 再判断当前的err 的err.response.status也存在的话 
// 返回401 返回消息登录失败请重新登录
// 如果err不存在 那就把 err 赋值给 errMsg 
service.interceptors.response.use(
  (response: AxiosResponse) =   {
    return response;
  },
  (err: any) =   {
    let errMsg = '';
    if (err && err.response.status) {
      switch (err.response.status) {
        case 401:
          errMsg = '登录状态失效，请重新登录';
          break;
        case 403:
          errMsg = '拒绝访问';
          break;

        case 408:
          errMsg = '请求超时';
          break;

        case 500:
          errMsg = '服务器内部错误';
          break;

        case 501:
          errMsg = '服务未实现';
          break;

        case 502:
          errMsg = '网关错误';
          break;

        case 503:
          errMsg = '服务不可用';
          break;

        case 504:
          errMsg = '网关超时';
          break;

        case 505:
          errMsg = 'HTTP版本不受支持';
          break;

        default:
          errMsg = err.response.data.msg;
          break;
      }
    } else {
      errMsg = err;
    }
    // 把errMsg响应出来
    Message.error(errMsg);
    return Promise.reject(errMsg);
  }
);
```

```
// 为了让外部可以正常使用
export default service;
```

##  5.实现登录拿到token

   已经拥有账号密码 和登录按钮了

   实现登录功能

   在main.ts 中引入封装的axios

```
import axios from "./utils/http"; // 引入封装的axios
Vue.prototype.$axios = axios // 添加封装的axios

此时就可以在任何一个组件中使用axios
```

   在方法中写请求

```
handleSubmit():void{
(this.$refs["ruleForm"] as any).validate((valid:boolean) =  {
  if(valid){
    // console.log("校验通过!")
    // 通过post发起请求 如果请求成功的话 会得到一个response
    (this as any).$axios.post("/api/users/login",
    this.ruleForm).then((res:any) =   {
      console.log(res.data);
    })
  }
})
}
```

   优化防抖:使得点击的登录之后直到得到响应前 按钮是不能点击的 一直是灰色旋转状态

   先改button的 :loading = "isLogin"

```
<!-- 登录的button --  
<el-form-item  
  <!-- :loading 绑定一个 isLogin --  
  <!-- @submit.native.prevent是用来阻止默认行为的 --  
  <el-button
    :loading="isLogin"
    @click.native.prevent="handleSubmit"
    type="primary"
    style="width:100%"
    登录</el-button  
</el-form-item  
```

   然后再定义初始值

```
export default class Login extends Vue {
  // 定义 isLogin 是布尔类型 默认是false
  @Provide() isLogin: boolean = false;
```

   然后再当发起请求前 isLogin 状态改为true 之后 把isLogin改为false

```
  /* ts的形式写方法 没有返回值就给void 要获取到当前的from 要给from添加个ref */
  /* 在此处就可以直接使用 */
  /* validate 是element-ui 的方法 任一表单项被校验后触发 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）*/
  /* 因为ts规定.validate前面的值必须定义类型 所以加个括号 as any */
  /* Javascript中void是一个操作符，该操作符指定要计算一个表达式但是不返回值 */
  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) =   {
      if (valid) {
        // console.log("校验通过!")
        // 当发请求前 把islogin状态改为true
        this.isLogin = true;
        // 通过post发起请求 如果请求成功的话 会得到一个response
        (this as any).$axios
          .post("/api/users/login", this.ruleForm)
          .then((res: any) =   {
            this.isLogin = false; // 当请求成功改回来
            //console.log(res.data);
            //存储token
            localStorage.setItem("tsToken",res.data.token);
          })
          .catch(() =   {
            this.isLogin = false;
          });
      }
    });
  }
```

   此处当在页面中输入admin 123456 就会返回服务端传来的token (服务端通过依赖jsonwebtoken)

```
{state: "suc", msg: "登录成功", token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC…5NzB9.82T_-QrOpeEKv6MytdMyGGBVJDC-vNGkHK55RjGtM7k"}
```

   拿到token 再通过localStorage存储token

```
localStorage.setItem("tsToken",res.data.token);
```

   然后在请求拦截里面 加上判断

```
// 请求拦截
// request 是我们的请求 请求里面会有config 他的类型是AxiosRequestConfig
// 如果请求成功直接把当前的config 返回
// 如果失败的话就会把错误信息 返回
// 在请求拦截里面return之前加个判断 
// 先判断localStorage.tsToken是否存在 如果存在
// 就把token值放到header里面就拥有一个授权
service.interceptors.request.use(
  (config: AxiosRequestConfig) =   {
    if (localStorage.tsToken) {
      config.headers.Authorization = localStorage.tsToken;
    }
    return config;
  },
  (err: any) =   {
    Promise.reject(err);
  }
);
```

   同时在响应拦截里面也加上判断 如果token过期了 那就是跳401 然后跳转登录页 (此处确保引入router)

```
switch (err.response.status) {
case 401:
  errMsg = '登录状态失效，请重新登录';
  localStorage.removeItem("tsToken");
  router.push("/login");
  break;
```

   在路由里面设置路由守卫

```
// router.beforeEach 全局前置守卫 有三个参数(to,from,next)
// 判断 isLogin是否登录进去 = 是否有tsToken ? 如果有返回true : 如果没有返回false
// 判断 如果to.路径是登录页的话 那就正常访问 || 或者是to.路径是找回密码页面的话 正常访问继续跳转
// 否则 判断isLogin是否为真 如果为真 继续跳转 否则 全跳转到 登录页面
router.beforeEach((to: any, from: any, next: any) =   {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == "/login" || to.path == "/password") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})
```

##  6.token

    token


   1.先需要在登录post请求里面拿到token  

   2.然后将token 存储到 localStorage 里面  

   3.请求拦截器   
   负责将客户端标识token值存储并放置在头部提交给服务端  

   4.响应拦截器  
   负责全局处理业务请求的网络或者业务错误

```
在axios请求拦截里面判断localStorage里面是否有token 如果有的话 就把token放到headers.Authorization  header里面的授权  
```

``` 
在axios响应拦截里面判断localStorage里面是否存在token 如果token过期了 那么就跳转401页面
```

    5.定义路由守卫 

 ```
 通过router.beforeEach  
 然后判断 localStorage是否有toen 如果有就继续跳转 如果没有 全都到登录页面
 ```


 ##  7.实现找回密码页面

    点击忘记密码 点bottom会把你的账号密码发送到邮箱

   先在页面引入 Provide

```
import { Component, Vue, Provide } from "vue-property-decorator";
```

   使用@Provide 定义 loading

```
// 是否发起网络请求

export default class Password extends Vue {
  @Provide() loading:boolean = false;
}
```

   使用@Provide 定义初始数据 因为等会要把数据发邮箱的 

```
@Provide() ruleForm: { username: string; email: string } = {
    username: "",
    email: ""
};
```

   使用@Provide 定义表单验证规则 rules 

```
  /* 表单验证规则 rules 需要绑定到表单 el-form 上 */
  /* 然后在每一个 el-form-item 上绑定 prop  */
  @Provide() rules = {
    /* 是否必填:true,消息文字:"请输入账号" 触发:'当失去焦点触发消息文字'*/
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      {
        required: true,
        message: "请输入正确的邮箱地址",
        trigger: "blur"
      }
    ]
  };
```

    在el-form 元素标签上用 

```
:model 双向绑定数据
:rules 验证规则
ref="ruleForm" ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：
label-position 表单域标签的位置，如果值为 left 或者 right 时，则需要设置  
label-width 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。

```

   写一个form-item 来验证username  
prop 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的

```
<!-- username --  
<!-- 因为要验证username 所以加一个prop --  
<el-form-item prop="username"  
  <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"  
    <i slot="prefix" class="fa fa-user-o"  </i  
  </el-input  
</el-form-item  
```

```
<!-- email --  
<el-form-item prop="email"  
  <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱"  
    <i slot="prefix" class="fa fa-envelope-o"  </i  
  </el-input  
</el-form-item  
```

```
<!-- 确定找回 --  
<el-form-item  
  <el-button
    @click.native.prevent="handleSubmit"
    :loading="loading"
    type="primary"
    style="width:100%"
    确定</el-button  
</el-form-item  
```
   给email 校验多加一个规则

```
  /* 表单验证规则 rules 需要绑定到表单 el-form 上 */
  /* 然后在每一个 el-form-item 上绑定 prop  */
  @Provide() rules = {
    /* 是否必填:true,消息文字:"请输入账号" 触发:'当失去焦点触发消息文字'*/
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      {
        required: true,
        message: "请输入正确的邮箱地址",
        trigger: "blur"
      },
      /* 再多添加一个校验 校验配型是email */
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: "blur,change"
      }
    ]
  };
```

   给确定button change 绑定事件写方法

```
  /* 当前的ref 有个ruleForm validate 里面可以得到valid 给个类型 */
  /* 然后判断 如果valid校验成功的话 那是已经通过了 此处就有两个校验了*/
  /* this.loading = true; 表示点击button后 button变成不可用圈圈 */
  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) =   {
      if (valid) {
        this.loading = true;
      }
    });
  }
```

    如果valid为真表示验证通过 发起post请求 找回密码

 ```
   /* 当前的ref 有个ruleForm validate 里面可以得到valid 给个类型 */
  /* 然后判断 如果valid校验成功的话 那是已经通过了 此处就有两个校验了*/
  /* this.loading = true; 表示点击button后 button变成不可用圈圈 */
  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) =   {
      if (valid) {
        this.loading = true;
        // 网络请求
        (this as any).$axios
          .post("/api/users/findPwd", this.ruleForm)
          .then((res: any) =   {
            this.loading = false;
            // console.log(res.data);
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.$router.push("/login");
          })
          .catch(() =   {
            this.loading = false;
          });
      }
    });
  }
 ```

##  8.token存储到vuex

   在src / store /index.ts 

   main.ts 中有引入store

   在store 文件夹中创建4个文件

```
1. state.ts 用于管理 state 状态
2. getters.ts 用于获取状态的
3. mutations.ts 用于更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
4. actions.ts Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
```

   在store / index.ts 中引入模块

   将token 存储到vuex里面

   1. 在views / Login / Login.vue中 当执行点击登录方法的时候 会在localStorage中存储 也会在vuex中存储

   需要安装 npm i vuex-class --save 然后在Login.vue中引入

```
import { State, Getter, Mutation, Action }from 'vuex-class'
```

```
this.setUser(res.data.token);
```

   当点击登录的时候 浏览器里面的vuex插件 就可以得到一个 SET_USER

```
SET_USER 就是 mutation的方法
然后就拿到token
```

   解析token

```
得到的token 也可以到 jwt.io 网站中解析一下 也可以得到用户的信息
```

```
用代码的方式解析 token 的话 需要安装两个模块   
npm i jwt-decode @types/jwt-decode --save
```

```
在Login.vue 中已经将token 提交到了actions.ts 页面  
所以在这个页面已经可以拿到user 将user 进行解析

在 actions.ts 中   

import jwt_decode from 'jwt-decode'

const actions: ActionTree<any, any   = {
  async setUser({ state, commit }, user: any) {
    const decoded = jwt_decode(user);
    commit('SET_USER', decoded);
  }
};
```

   然后要让页面刷新完之后 token依然存在 直到过期  

```
在 app.vue中     

<script lang="ts"  
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class App extends Vue {
  // 存储用户信息
  // setUser 是在 actions.ts 中设置的方法
  @Action("setUser") setUser: any;

  created() {
    this.setUser(localStorage.tsToken);
  }
}
</script  

就可以达到效果 除非token过期 不然vuex的 SET_USER 一直都在
```

##  9.导航内容

   在登录button方法中写入登录成功跳转首页

```
//登录成功 跳转首页 /
this.$router.push("/")
```

   创建 views / Layout文件夹 

   创建 Layout / index.vue

```
index.vue 就是根文件的展示
```

   更改路由 把根路径 / 改为Layout/index.vue  就成为首页

```
import Layout from '../views/Layout/Index.vue';

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout
  },
 ]
```

   创建一个首页的头部导航栏组件

```
在 views / Layout / 创建 LayoutHeader.vue 组件

然后将组件引入到 Index.vue 里面去

<template  
  <div class="layout"  
    <!-- 头部 --  
    <LayoutHeader /  

    <!-- 内容 --  
  </div  
</template  

<script lang="ts"  
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "./LayoutHeader.vue";

@Component({
  components: { LayoutHeader }
})
export default class Layout extends Vue {}
</script  

就可以在根页面看到头部导航的组件了
```

   左侧是个logo 和网页名字 右侧是个用户头像 和 用户id

   如右侧需要需要使用到登录的用户id 那就先需要将vuex的内容拿到头部导航栏组件中 拿到store / state 中定义的user  

```
在 viwes / Layout / LayoutHeader.vue 中 就可以拿到vuex中的信息

import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action }from 'vuex-class'

@Component({
  components: {}
})
export default class LayoutHeader extends Vue {
  @Getter("user") getUser:any;
  created(){
    console.log(this.getUser);
  }
}

```

   然后编辑页面

   根据不同的身份 展示不同的id 和头像

```
<span class="userinfo-inner"  
<!-- 图片绑定 根据登录的身份 不同的id 展示图像和id --  
    <img :src="require('@/assets/' + getUser.key + '.jpg')" alt /  
    {{getUser.username}}
</span  
```

   下拉列表

```
<el-dropdown @command="userCommand" class="system-user"  
  <span class="userinfo-inner"  
    <!-- 图片绑定 根据登录的身份 不同的id 展示图像和id --  
    <img :src="require('@/assets/' + getUser.key + '.jpg')" alt /  
    {{getUser.username}}
  </span  
  <!-- 鼠标移入出现下拉 --  
  <el-dropdown-menu slot="dropdown"  
    <el-dropdown-item command="usercenter"  个人中心</el-dropdown-item  
    <el-dropdown-item divided command="logout"  注销登录</el-dropdown-item  
  </el-dropdown-menu  
</el-dropdown  
```

   给 个人中心 和 注销登录做跳转

```
直接在 dropdown 下拉上面给它个方法 @command="userCommand" 

实现方法 : 
如果点击的是 注销登录 就直接干掉 tsToken 然后跳转到登录页面 

再判断 
如果点击的是个人中心 那就先打印出个人中心四个字在控制台

  userCommand(command:string):void{
    if(command == "logout"){
      localStorage.removeItem("tsToken");
      this.$router.push("/login");
    }
  }

```

##  10.侧边栏和面包屑导航

   直接在 Layout 下创建一个组件 Content

```
<template  
  <el-container class="layout-content"  
    <!-- 左侧菜单 --  
    <el-aside width="200px"  
      <!-- vue当中提供的slot插槽 相当于一个大容器占位 --  
      <slot name="left"  </slot  
    </el-aside  

    <!-- 右侧页面 --  
    <el-main  
      <!-- 面包屑 --  
      <div class="top"  
        <i class="fa fa-reorder"  </i  
        <!-- breadcrumb 面包屑 --  
        <el-breadcrumb class="breadcrumb" separator="/"  
          <el-breadcrumb-item  活动管理</el-breadcrumb-item  
          <el-breadcrumb-item  活动列表</el-breadcrumb-item  
          <el-breadcrumb-item  活动详情</el-breadcrumb-item  
        </el-breadcrumb  
      </div  
      <!-- 页面内容 --  
      <div class="content"  
        <slot name="content"  </slot  
      </div  
    </el-main  
  </el-container  
</template  

<script lang="ts"  
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Content extends Vue {}
</script  
```

    直接在 Index.vue中引入

```

<!-- 内容 --  
<Content  </Content  

import Content from "./Content.vue"

@Component({
  components: { LayoutHeader, Content }
})
```

   在Content中写了2个插槽 

```
此处是面包屑的插槽
<Content  
  <router-view slot="content"  </router-view  
</Content  
```

   左侧的侧边栏 占位插槽已经有了 所以新建一个组件 Layout / Sidebar.vue 

```
<template  
  <!-- el-scrollbar 滚动容器 --  
  <el-scrollbar class="el-scrollbar"  
    <el-menu class="el-menu-slide"  
      <el-menu-item index="1"  
        <i class="el-icon-menu"  </i  
        <!-- 此处slot 表示占位 --  
        <span slot="title"  首页</span  
      </el-menu-item  
    </el-menu  
  </el-scrollbar  
</template  
```

   然后在index.vue 中引入 然后加入页面

```
Sidebar.vue

<template  
  <!-- el-scrollbar 滚动容器 --  
  <el-scrollbar class="el-scrollbar"  
    <el-menu class="el-menu-slide"  
      <el-menu-item index="1"  
        <i class="el-icon-menu"  </i  
        <!-- 此处slot 表示占位 --  
        <span slot="title"  首页</span  
      </el-menu-item  
    </el-menu  
  </el-scrollbar  
</template  

Content.vue

    <!-- 左侧菜单 --  
    <el-aside width="200px"  
      <!-- vue当中提供的slot插槽 相当于一个大容器占位 --  
      <slot name="left"  </slot  
    </el-aside  


Index.vue

    <!-- 内容 --  
    <Content  
      <!-- 在Sidebar中插槽命名为left 使用就需要加上left --  
      <Sidebar slot="left"  </Sidebar  
      <router-view slot="content"  </router-view  
    </Content  

import Content from "./Content.vue"
import Sidebar from "./Sidebar.vue"

@Component({
  components: { LayoutHeader, Content, Sidebar }
})
```


##  11.路由整理-实现首页和错误页面

   创建 views / DataManage 

   创建 DataManage / ChartsData.vue 图标管理组件  
   创建 DataManage / TableData.vue 表格管理组件  
   创建 DataManage / FormData.vue 表单管理组件  

   创建 views / UserManage  

   创建 UserManage / AccountData.vue 账户管理  
   创建 UserManage / UserInfo.vue 个人中心  


   创建 views / 404.vue 错误页面  

```
先把组件都初始化好 

<template  
  <div class="home"  FormData</div  
</template  

<script lang="ts"  
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class FormData extends Vue {}
</script  

<style lang="scss" scoped  
</style  
```

   然后设置路由 为了让路由能够被外部能获取到 所以再来创建个整理的路由

```
export const asyncRouterMap = [
  {  // home 路由
    path: '/',
    name: 'dashboard',
    component: Layout,  // 组件
    redirect: "/home",  // redirect 重定向
    children: [   // 子路由
      {
        path: "/home",
        name: "home",
        component: () =   import("@/views/Home.vue")  // 动态加载 
      }
    ]
  },
  {  // 数据管理 路由
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,  // 组件
    redirect: "/tableData",  // redirect 重定向
    children: [   // 子路由
      {
        path: "/tableData",
        name: "tableData",
        component: () =   import("@/views/DataManage/TableData.vue")  // 动态加载 
      },
      {
        path: "/chartsData",
        name: "chartsData",
        component: () =   import("@/views/DataManage/ChartsData.vue")  // 动态加载 
      },
      {
        path: "/formData",
        name: "formData",
        component: () =   import("@/views/DataManage/FormData.vue")  // 动态加载 
      }
    ]
  },
  {  // 账户管理 路由
    path: '/userManage',
    name: 'userManage',
    component: Layout,  // 组件
    redirect: "/accountData",  // redirect 重定向
    children: [   // 子路由
      {
        path: "/accountData",
        name: "accountData",
        component: () =   import("@/views/UserManage/AccountData.vue")  // 动态加载 
      }
    ]
  },
  { //个人中心 路由
    path: '/user',
    component: Layout,
    redirect: '/userInfo',
    hidden: false,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () =   import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () =   import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/login',
    name: 'login',
    component: () =   import("@/views/Login/Login.vue")
  },
  {
    path: '/password',
    name: 'password',
    component: () =   import("@/views/Login/Password.vue")
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap   // 将自己创建的路由 挂载到 routes下
})
```

##  12.动态渲染侧边栏

   如果想动态渲染到侧边栏的话 一定要让 侧边栏页面 动态获取到路由

```
1. 因为我们已经是export 这整个路由 所以在外部也可以使用它  
2. 在state.ts中 直接把路由存储到 vuex state的状态中  

// 引入自己整理的路由
import { asyncRouterMap } from '../router';

const state: any = {
  user: null,   //用于存储用户信息的状态
  routers: asyncRouterMap //定义状态等于自己创建的路由
};

3. 在getters.ts中 获取

  routers(state: any): any {
    return state.routers;
  }
  
4. 当调整这个状态 需要到 mutation 触发这个方法 

  SET_ROUTERS(state: any, routers: any): void {
    state.routers = routers;
  },
  
5. 在侧边栏页面引入vuex 

import { State, Getter, Mutation, Action }from 'vuex-class'

6. 使用@Getter 获取到routers

export default class Sidebar extends Vue {
  @Getter("routers") getRouters:any;

  created(){
    console.log(this.getRouters);
  }
}

7. 想要在左侧显示出来的话 也要在当前路由里面加入条件

/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
**/

8. 在侧边栏页面中 遍历获取到的 getRouters 对遍历的数据做判断当前遍历的路由下面有没有hidden hidden是否为真 判断是否有子路由 判断自路由长度大于0

<template  
  <el-scrollbar class="el-scrollbar"  
    <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path" router  
      <template v-for="item in getRouters"  
        <template v-if="item.hidden&&item.children&&item.children.length  0"  
          <el-menu-item
            v-if="item.children.length==1"
            :index="item.children[0].path"
            :key="item.name"
            
            <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"  </i  
            <span slot="title"  {{item.children[0].meta.title}}</span  
          </el-menu-item  
          <!-- 多个子元素 --  
          <el-submenu v-else :index="item.children[0].path" :key="item.name"  
            <template slot="title"  
              <i v-if="item.meta.icon" :class="item.meta.icon"  </i  
              <span v-if="item.meta&&item.meta.title" slot="title"  {{item.meta.title}}</span  
            </template  
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name"  
              <i v-if="child.meta.icon" :class="child.meta.icon"  </i  
              <span v-if="child.meta&&child.meta.title" slot="title"  {{child.meta.title}}</span  
            </el-menu-item  
          </el-submenu  
        </template  
      </template  
    </el-menu  
  </el-scrollbar  
</template  

```

##  13.动态显示路由和面包屑导航

   在内容页面 先引入 Provide Watch

```
// Provide 定义数据 Watch 监听数据
import { Component, Vue, Provide, Watch } from "vue-property-decorator";

  // 定义数据
  @Provide() breadCrumbItems: any; // 面包屑的数组
  
  //让页面一进来就使用这个方法 然后就打印当前的路由
  created() {
    this.initBreadCrumbItems(this.$route);
  }

  //定义initBreadCrumbItems方法 用router参数来接收
  initBreadCrumbItems(router: any) {
    // console.log(router);
    // 定义根路由 title
    let breadCrumbItems: any = [
      {
        path: "/",
        title: "后台管理系统"
      }
    ];

    // 遍历父级到当前子路由的页面的title和path 存储到数组里
    for (const index in router.matched) {
      if (router.matched[index].meta && router.matched[index].meta.title) {
        breadCrumbItems.push({
          path: router.matched[index].path ? router.matched[index].path : "/",
          title: router.matched[index].meta.title
        });
      }
    }

    this.breadCrumbItems = breadCrumbItems;
    console.log(this.breadCrumbItems);
  }
  
  这样就打印出来当前的路由
  
```

   然后使用Watch

```
  @Watch("$route") handleRouteChange(to:any){
    this.initBreadCrumbItems(to);
  }
```

   完整代码

```
<script lang="ts"  
// Provide 定义数据 Watch 监听数据
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Content extends Vue {
  // 定义数据
  @Provide() breadCrumbItems: any; // 面包屑的数组

  @Watch("$route") handleRouteChange(to:any){
    this.initBreadCrumbItems(to);
  }

  //让页面一进来就使用这个方法 然后就打印当前的路由
  created() {
    this.initBreadCrumbItems(this.$route);
  }

  //定义initBreadCrumbItems方法 用router参数来接收
  initBreadCrumbItems(router: any) {
    // console.log(router);
    // 定义根路由 title
    let breadCrumbItems: any = [
      {
        path: "/",
        title: "后台管理系统"
      }
    ];

    // 遍历父级到当前子路由的页面的title和path 存储到数组里
    for (const index in router.matched) {
      if (router.matched[index].meta && router.matched[index].meta.title) {
        breadCrumbItems.push({
          path: router.matched[index].path ? router.matched[index].path : "/",
          title: router.matched[index].meta.title
        });
      }
    }

    this.breadCrumbItems = breadCrumbItems;
    console.log(this.breadCrumbItems);
  }
}
</script  
```

   实现展示

```
<!-- breadcrumb 面包屑 --  
<el-breadcrumb class="breadcrumb" separator="/"  
  <el-breadcrumb-item
    v-for="(item,index) in breadCrumbItems"
    :key="index"
    :to="{path:item.path}"
    {{item.title}}</el-breadcrumb-item  
</el-breadcrumb  
```

##  14.实现个人中心-修改密码

   先把header里面的方法改为跳转/user路由  

```
userCommand(command:string):void{
if(command == "logout"){
  localStorage.removeItem("tsToken");
  this.$router.push("/login");
}

if(command == "usercenter") this.$router.push("/user");
}
```

   在 UserInfo.vue 页面引入 vuex 就可以Getter 获取到登录信息

```
import { State, Getter, Mutation, Action } from "vuex-class";

export default class UserInfo extends Vue {
  @Getter("user") getUser: any;

  created() {
    console.log(this.getUser);
  }
}
```

   调整页面结构

```
<!-- 个人中心左侧 --  
<div class="img-box"  
  <h2 class="title"  关于我</h2  
  <!-- 绑定图片地址 拼接的名字 --  
  <img :src="require('@/assets/'+getUser.key+'.jpg')" alt /  
  <!-- Getter 拿到的vuex username --  
  <h4  {{getUser.username}}</h4  
</div  
```

   加个 Provide 定义数据

```
import { Component, Vue, Provide } from "vue-property-decorator";

  // 定义数据
  @Provide() userData: { username: string; pwd: string } = {
    username: "",
    pwd: ""
  };

  // 设置一个开关 控制发起网络请求
  @Provide() loading: boolean = false; //是否发起网络请求
```

   调整结构 form

```
  <el-form :model="userData" class="form-box"  
    <el-form-item label="用户名"  
      <!-- 此处绑定的是 Getter 拿到的 username 然后设置只读 --  
      <el-input v-model="getUser.username" readonly  </el-input  
    </el-form-item  
    <el-form-item label="密码"  
      <el-input type="password" v-model="userData.pwd"  </el-input  
    </el-form-item  
    <el-form-item  
      <!-- :disabled 如果当前没有userData.pwd这个值没有的话 是禁用的 --  
      <el-button
        @click="onSubmit"
        :disabled="!userData.pwd"
        type="primary"
        :loading="loading"
        修改密码</el-button  
    </el-form-item  
  </el-form  
```

   给修改密码的按钮绑定点击事件

```
  // 点击修改密码的按钮的方法
  onSubmit() {
    this.userData.username = this.getUser.username;
    // console.log(this.userData);
    this.loading = true; // 这样就实现开始转圈

    // 发起请求
    (this as any).$axios
      .post("/api/users/changePwd", this.userData)
      .then((res: any) =   {
        // console.log(res); 打桩验证返回值是否请求成功
        this.loading = false; // 实现停止转圈
        this.$message({    // 把返回的消息 绑定到页面的提示消息
          message: res.data.msg,
          type: "success"
        });
      })
      .catch(() =   {  //不管请求成功与失败 这个loading 都停止旋转
        this.loading = false;
      });
  }
```


##  15.实现表格管理

   定义数据类型

```
<script lang="ts"  
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: {}
})
export default class TableData extends Vue {
  //定义接收搜索的变量属性数据
  @Provide() searchVal: string = ""; //搜索框
  //定义表格的可视高度
  @Provide() tHeight: number = document.body.offsetHeight - 270;
  //获取所有展示出来的数据 存储到此数组
  @Provide() tableData: any = []; //表格数据
  //定义页码
  @Provide() page: number = 1; //请求数据从第几页数据开始
  //定义页大小
  @Provide() size: number = 5; // 请求数据的个数 默认是5
  //定义当请求数据的时候 一共告诉我们总共有多少条
  @Provide() total: number = 0; //总数据条数
}
</script  
```

   发送请求 测试接口

```
<script lang="ts"  
  //测试接口
  created() {
    this.loadData();
  }

  //加载数据
  //发送axios get请求 传递页码 页大小过去 得到数据
  loadData() {
    (this as any)
      .$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
      .then((res: any) =   {
        console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
  }
}
</script  
```

   页面结构渲染

```
<template  
  <div class="table-data"  
    <!-- 搜索框 双向绑定的 searchVal--  
    <div class="search-box"  
      <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"  </el-input  
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch"  搜索</el-button  
    </div  

    <!-- 表格绑定的数据data 边框border 样式宽度撑满 高度动态绑定可视高度 --  
    <el-table :data="tableData" border style="width:100%" :height="tHeight" class="table-box"  
      <!-- el-table-column 列 --  
      <el-table-column type="index" label="序号" width="60"  </el-table-column  
      <el-table-column label="课程名称" prop="title"  </el-table-column  
      <el-table-column width="120" label="课程等级" prop="level"  </el-table-column  
      <el-table-column width="120" label="技术栈" prop="type"  </el-table-column  
      <el-table-column width="120" label="报名人数" prop="count"  </el-table-column  
      <el-table-column width="160" label="上线日期" prop="date"  </el-table-column  
      <!-- 操作编辑 删除的列 绑定点击事件 --  
      <el-table-column v-if="getUser.key != 'visitor'" label="操作" width="160"  
        <template slot-scope="scope"  
          <el-button @click="handleEdit(scope.$index,scope.row)" size="mini"  编辑</el-button  
          <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger"  删除</el-button  
        </template  
      </el-table-column  
    </el-table  

    <!-- 分页 当需要调整的时候 需要用到ref--  
    <div class="pages" ref="page-box"  
      <!-- size 是表示分页的条数 layout:布局显示的所有 total:总条数 --  
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,20]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
        </el-pagination  
    </div  
    <!-- 编辑页面组件 --  
    <EditDialog :dialogVisible="dialogVisible" :form="formData" @closeDialog="closeDialog"  </EditDialog  
  </div  
</template  
```

##  16.分页和搜索

   分页 页面结构

```
<!-- 分页 当需要调整的时候 需要用到ref--  
<div class="pages" ref="page-box"  
  <!-- size 是表示分页的条数 layout:布局显示的所有 total:总条数 --  
  <!-- size-change 更改页大小 current-change 更改页码 --  
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[5,10,20]"
    :page-size="size"
    layout="total,sizes,prev,pager,next,jumper"
    :total="total"
    </el-pagination  
</div  
```

   分页请求数据方法

```
  /* 页大小 */
  handleSizeChange(val: number): void {
    this.size = val;
    // console.log(this.size);
    this.page = 1;
    this.searchVal ? this.loadSearchData() : this.loadData();
  }

  /* 页码 */
  handleCurrentChange(val: number): void {
    this.page = val;
    // console.log(this.page);
    this.searchVal ? this.loadSearchData() : this.loadData();
  }
```

   搜索 页面结构

```
<!-- 搜索框 双向绑定的 searchVal--  
<div class="search-box"  
  <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"  </el-input  
  <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch"  搜索</el-button  
</div  
```

   搜索请求方法

```
  /* 搜索 */
  handleSearch(): void {
    // 当点击搜索的时候 page是第一页
    this.page = 1;
    // 如果输入的搜索值存在的话 执行搜索 如果不存在 执行 loadData()
    this.searchVal ? this.loadSearchData() : this.loadData();
  }
  
  /* 当点击搜索的时候 发送的请求数据的方法 */
  loadSearchData() {
    // 加载搜索数据
    (this as any)
      .$axios(
        `/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`
      )
      .then((res: any) =   {
        // console.log(res.data);
        this.tableData = res.data.datas.list;
        this.total = res.data.datas.total;
      });
  }
  
   //加载数据
  //发送axios get请求 传递页码 页大小过去 得到数据
  loadData() {
    (this as any)
      .$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
      .then((res: any) =   {
        // console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
  }
  
```

##  17.编辑和删除

   新建一个组件 EditDialog.vue 编辑组件

   在表格页面 引入 注册

```
import EditDialog from "./EditDialog.vue";

@Component({
  components: {
    EditDialog
  }
})

<!-- 编辑页面组件 dialogVisible 是否显示出来 form 数据--  
<EditDialog :dialogVisible="dialogVisible" :form="formData" @closeDialog="closeDialog"  </EditDialog  
    
```

   给表格页面一个开关是否展示编辑页面

```
@Provide() dialogVisible: Boolean = false; // 是否展示编辑页面
```

   给表格页面定义编辑的数据

```
  @Provide() formData: object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: ""
  };
```

   给表格页面编辑button绑定方法 当点击的哪一行 就应该把这一行的数据拿到

```
<template slot-scope="scope"  
  <el-button @click="handleEdit(scope.$index,scope.row)" size="mini"  编辑</el-button  
  <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger"  删除</el-button  
</template  

  // 点击编辑的方法 接收2个参数
  handleEdit(index: number, row: any) {
    // console.log(index, row);
    this.formData = row;
    this.dialogVisible = true; //让编辑页面可以展示出来
  }
```

   在编辑页面 接收父级传来的数据 prop provide

```
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

export default class EditDialog extends Vue {
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) form!: {
    title: string;
    type: string;
    level: string;
    count: string;
    date: string;
    _id: string;
  };

```

    编辑页面结构

```

<template  
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    title="编辑课程"
    :visible.sync="dialogVisible"
    
  <!-- rules 规则 ref表单数据  model接收到的数据 --  
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="form"
      label-width="100px"
      size="small"
      class="form-box"
      
      <el-form-item label="课程名称" prop="title"  
        <el-input v-model="form.title" placeholder="请输入课程名称"  </el-input  
      </el-form-item  
      <el-form-item label="课程等级" prop="level"  
        <el-select v-model="form.level" placeholder="请选择课程等级"  
          <el-option label="初级" value="初级"  </el-option  
          <el-option label="中级" value="中级"  </el-option  
          <el-option label="高级" value="高级"  </el-option  
        </el-select  
      </el-form-item  
      <el-form-item label="报名人数" prop="count"  
        <el-input v-model="form.count" placeholder="请输入报名人数"  </el-input  
      </el-form-item  
      <el-form-item label="上线时间" prop="date"  
        <!-- picler 就是el可以选择时间 把数据绑定到form..data --  
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          value-format="yyyy-MM-dd"
          </el-date-picker  
      </el-form-item  
      <el-form-item label="技术栈" prop="type"  
        <!-- 单选框 --  
        <el-radio-group v-model="form.type"  
          <el-radio label="vue" name="type"  </el-radio  
          <el-radio label="react" name="type"  </el-radio  
          <el-radio label="node" name="type"  </el-radio  
          <el-radio label="小程序" name="type"  </el-radio  
          <el-radio label="angular" name="type"  </el-radio  
        </el-radio-group  
      </el-form-item  
    </el-form  
    <!-- 编辑取消 和确定  --  
    <span slot="footer" class="dialog-footer"  
      <el-button @click="$emit('closeDialog')" size="small"  取消</el-button  
      <el-button @click="submitForm('ruleForm')" type="primary" size="small"  确定</el-button  
    </span  
  </el-dialog  
</template  

```


   取消编辑

```
<!-- 编辑取消 和确定  --  
<span slot="footer" class="dialog-footer"  
  <!-- 取消这个事件需要到父级中实现 --  
  <el-button @click="$emit('closeDialog')" size="small"  取消</el-button  
  <el-button @click="submitForm('ruleForm')" type="primary" size="small"  确定</el-button  
</span  
```

   取消编辑 需要到父级中实现 所以在表格管理页面中

```
<!-- 编辑页面组件 dialogVisible 是否显示出来 form 数据 @closeDialog 取消编辑--  
<EditDialog :dialogVisible="dialogVisible" :form="formData" @closeDialog="closeDialog"  </EditDialog  

// 取消编辑
closeDialog() {
    this.dialogVisible = false;
}
```

   确定修改的方法

```  
<el-button @click="submitForm('ruleForm')" type="primary" size="small"  确定</el-button  

 //确定修改的方法
  submitForm(formName: any) {
    (this.$refs[formName] as any).validate((valid: boolean) =   {
      if (valid) {
        (this as any).$axios
          .post(`/api/profiles/edit/${this.form._id}`)
          .then((res: any) =   {
            // console.log(res.data);
            this.$emit("closeDialog"); // 执行自动关闭窗口
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          });
      }
    });
  }

```

   表格的删除方法

```
  <!-- 操作编辑 删除的列 绑定点击事件 --  
  <el-table-column v-if="getUser.key != 'visitor'" label="操作" width="160"  
    <template slot-scope="scope"  
      <el-button @click="handleEdit(scope.$index,scope.row)" size="mini"  编辑</el-button  
      <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger"  删除</el-button  
    </template  
  </el-table-column  

  // 点击删除的方法 接收2个参数
  handleDelete(index: number, row: any) {
    // console.log(row._id);
    (this as any).$axios
      .delete(`/api/profiles/delete/${row._id}`)
      .then((res: any) =   {
        this.$message({
          message: res.data.msg,
          type: "success"
        });

        this.tableData.splice(index, 1);
      });
  }
```

##  18.echarts图标管理

   安装依赖 echarts

```
npm i echarts @types/echarts --save
```

   在components 中新建组件 Charts.vue

   然后拿到父组件传来的数据和显示类型

    为了不让图表高度宽度写死 使用方法计算出来高度宽度

   


```
<template  
  <div ref="mychart" class="chart" :style="{width:chartWidth,height:chartHeight}"  </div  
</template  

<script lang="ts"  
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
// 引入 echarts
import echarts from "echarts";

@Component({
  components: {}
})
export default class Charts extends Vue {
  /* 接收父组件传来的类型 chartType */
  @Prop({ type: String, default: "line" }) readonly chartType!: string; // 图表类型 line/bar/pie
  // 接收父组件传来的数据 chartData
  @Prop(Object) chartData!: string | null;

  // 设置当前图形的高度 宽度
  @Provide() chartWidth: string = "";
  @Provide() chartHeight: string = "";

  // 使得页面一进来就调用这个宽度高度函数
  created() {
    this.generatorWidthAndHeight();
  }

  generatorWidthAndHeight() {
    // 图表生成宽度和高度 将 charWidth chartHeight 动态绑定到图表的样式
    this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
  }

  mounted() {
    this.drawChart();
  }

  drawChart() {
    // 1 实例echarts对象
    let chart = echarts.init((this as any).$refs.mychart as HTMLCanvasElement);
    if (chart == undefined) {
      console.log(`echarts init dom is failed`);
      return;
    }
    switch (this.chartType) {
      case "line":
        chart.setOption((this as any).generatorLineOption());
        break;
      case "bar":
        chart.setOption((this as any).generatorBarOption());
        break;
      case "pie":
        chart.setOption((this as any).generatorPieOption());
        break;
      // default:
      //   console.log(`chartType ${this.chartType} is invalid`);
      //   break;
    }
  }

  generatorLineOption() {
    // 绘制折线图
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "line",
          smooth: true
        }
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      }
    };
  }

  generatorBarOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "bar",
          barWidth: "20%"
        }
      ],
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%"
      }
    };
  }

  generatorPieOption() {
    // 处理数据
    let pieData = [];
    for (const index in (this as any).chartData.xAxisData) {
      pieData.push({
        value: (this as any).chartData.yAxisData[index],
        name: (this as any).chartData.xAxisData[index]
      });
    }

    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/  {b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: (this as any).chartData.xAxisData
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
}
</script  

<style  
</style  


```

   在图标管理页面 引入 注册 charts 定义数据撑开高度

```
<template  
  <div class="charts-data"  
    <!-- tabbar 切换 el 卡片式切换 绑定数据 --  
    <el-tabs type="border-card" v-model="tabPosition"  
      <el-tab-pane label="折线图" name="line"  
        <Charts :chartData="chartData" chartType="line"  </Charts  
      </el-tab-pane  
      <el-tab-pane label="柱状图" name="bar"  
        <Charts :chartData="chartData" chartType="bar"  </Charts  
      </el-tab-pane  
      <el-tab-pane label="饼图" name="pie"  
        <Charts :chartData="chartData" chartType="pie"  </Charts  
      </el-tab-pane  
    </el-tabs  
  </div  
</template  
```


```
// 引入 charts
import Charts from "../../components/Charts.vue";
@Component({
  components: { Charts }
})

export default class ChartsData extends Vue {
  // 定义数据 默认显示 折线图
  @Provide() tabPosition: string = "line";
  // 定义数据 然后把数据传入到 charts组件中
  @Provide() chartData: any = {
    xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // 横向轴
    yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]   // 纵向轴
  };
}


<!-- charts 的数据绑定  还有显示的类型为 折线图 --  
<Charts :chartData="chartData" chartType="line"  </Charts  

```

##  19.表单管理页面-添加

    页面结构 

```
<template  
  <div class="form-data"  
    <el-form :rules="rules" ref="ruleForm" :model="form" label-width="100px"  
      <el-form-item label="课程名称" prop="title"  
        <el-input v-model="form.title" placeholder="请输入课程名称"  </el-input  
      </el-form-item  
      <el-form-item label="课程等级" prop="level"  
        <el-select v-model="form.level" placeholder="请选择课程等级"  
          <el-option label="初级" value="初级"  </el-option  
          <el-option label="中级" value="中级"  </el-option  
          <el-option label="高级" value="高级"  </el-option  
        </el-select  
      </el-form-item  
      <el-form-item label="报名人数" prop="count"  
        <el-input v-model="form.count" placeholder="请输入报名人数"  </el-input  
      </el-form-item  
      <el-form-item label="上线时间" prop="date"  
        <!-- 日期 --  
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          value-format="yyyy-MM-dd"
          </el-date-picker  
      </el-form-item  
      <el-form-item label="技术栈" prop="type"  
        <!-- 单选框 --  
        <el-radio-group v-model="form.type"  
          <el-radio label="vue" name="type"  </el-radio  
          <el-radio label="react" name="type"  </el-radio  
          <el-radio label="node" name="type"  </el-radio  
          <el-radio label="小程序" name="type"  </el-radio  
          <el-radio label="angular" name="type"  </el-radio  
        </el-radio-group  
      </el-form-item  
      <el-form-item  
        <!--  添加方法 和 全部填写的重置 --  
        <el-button @click="submitForm('ruleForm')" type="primary"  创建课程</el-button  
        <el-button @click="resetForm('ruleForm')"  重置</el-button  
      </el-form-item  
    </el-form  
  </div  
</template  
```

    定义数据 定义校验 和 添加 和 重置button 方法

```
<script lang="ts"  
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: {}
})

export default class FormData extends Vue {
  // 定义 from 数据
  @Provide() form: object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: ""
  };

  // 定义校验规则
  @Provide() rules: any = {
    title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
    level: [{ required: true, message: "请选择课程等级", trigger: "change" }],
    count: [{ required: true, message: "请输入报名人数", trigger: "blur" }],
    date: [
      {
        type: "string",
        required: true,
        message: "请选择日期",
        trigger: "change"
      }
    ],
    type: [
      {
        required: true,
        message: "请选择技术栈",
        trigger: "change"
      }
    ]
  };

  // 实现添加 
  submitForm(formName: string) {
    (this as any).$refs[formName].validate((valid: boolean) =   {
      // 如果校验成功 就发起请求
      if (valid) {
        (this as any).$axios
          .post(`api/profiles/add`, this.form)
          .then((res: any) =   {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.resetForm(formName);
          });
      }
    });
  }

  // 实现所有填写的内容 重置
  resetForm(formName: string) {
    (this as any).$refs[formName].resetFields();
  }
}
</script  

```

##  20.账户管理

   实现超级管理员账号是不可编辑删除 其他账号可以编辑删除

   先实现账户结构布局

   让页面一进来 post 方法 拿到所有用户数据 定义数据属性初始化

   

```
<template  
  <div class="account-data"  
    <div class="add-box"  
      <el-button @click="addAccount" type="primary"  新增账户</el-button  
    </div  
    <el-table :data="tableData" border style="width:100%"  
      <!-- 列 --  
      <el-table-column label="角色" width="180"  
        <template slot-scope="scope"  
          <el-select
            @change="selectChange(scope.row)"
            v-if="scope.row.edit"
            v-model="scope.row.role"
            
            <el-option
              v-for="option in options"
              :label="option.role"
              :value="option.role"
              :key="option.key"
              </el-option  
          </el-select  
          <span v-else  {{scope.row.role}}</span  
        </template  
      </el-table-column  
      <el-table-column label="账号" width="180"  
        <template slot-scope="scope"  
          <el-input v-model="scope.row.username" v-if="scope.row.edit"  </el-input  
          <span v-else  {{scope.row.username}}</span  
        </template  
      </el-table-column  
      <el-table-column prop="des" label="描述"  </el-table-column  
      <el-table-column label="操作" width="180"  
        <template slot-scope="scope" v-if="scope.row.username != 'admin'"  
          <el-button
            @click="handleEdit(scope.$index,scope.row)"
            v-if="!scope.row.edit"
            size="mini"
            编辑</el-button  
          <el-button
            @click="handleSave(scope.$index,scope.row)"
            v-else
            type="success"
            size="mini"
            完成</el-button  

          <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger"  删除</el-button  
        </template  
      </el-table-column  
    </el-table  
    <AddAccount
      @update="getData"
      @closeDialog="closeDialog"
      :dialogVisible="dialogVisible"
      :options="options"
      </AddAccount  
  </div  
</template  

import { Component, Vue, Provide } from "vue-property-decorator";

@Component({
  components: {  }
})
export default class AccountData extends Vue {
  // 定义数据类型 让post请求拿到的数据 返回给这里
  @Provide() tableData: any = [];

  // 让页面一进来就调用 getData 方法拿到用户数据
  created() {
    this.getData();
  }
  
```

   新增账户 新建组件 在账户管理中引入 注册 使用

```
页面使用
<AddAccount
  @update="getData"
  @closeDialog="closeDialog"
  :dialogVisible="dialogVisible"
  :options="options"
  </AddAccount  

引入
import AddAccount from "./AddAccount.vue";

注册
@Component({
  components: { AddAccount }
})

```

   当点击新增账户的时候 

```
// 定义一个开关控制显示隐藏
@Provide() dialogVisible: Boolean = false;
```

   新增账户的时候 需要传值 先定义好 

```
  // 定义select数据
  @Provide() options: any = [
    {
      key: "admin",
      role: "管理员",
      des: "Super Administrator. Have access to view all pages."
    },
    {
      key: "editor",
      role: "客服",
      des: "Normal Editor. Can see all pages except permission page"
    },
    {
      key: "visitor",
      role: "游客",
      des: "Just a visitor. Can only see the home page and the document page"
    }
  ];
```

   AddAccount.vue 组件

```
<template  
  <el-dialog
    title="新增账户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
    
    <el-form :rules="rules" ref="ruleForm" :model="account" class="form-box" label-width="100px"  
      <el-form-item label="请选择角色" prop="role"  
        <el-select @change="selectChange" v-model="account.role" placeholder="请选择角色"  
          <el-option
            v-for="option in options"
            :label="option.role"
            :value="option.role"
            :key="option.key"
            </el-option  
        </el-select  
      </el-form-item  
      <el-form-item label="请输入账号" prop="username"  
        <el-input v-model="account.username" placeholder="请输入账号"  </el-input  
      </el-form-item  
    </el-form  
    <span slot="footer" class="dialog-footer"  
      <el-button @click="$emit('closeDialog')"  取消</el-button  
      <el-button @click="handleAdd" type="primary"  确定</el-button  
    </span  
  </el-dialog  
</template  

<script lang="ts"  
import { Component, Vue, Prop, Provide, Emit } from "vue-property-decorator";
 // 接收父级传递的数据
@Component({
  components: {}
})
export default class AddAccount extends Vue {
  // prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Array) options!: any;

  // 定义当前的数据
  @Provide() account: object = {
    key: "",
    role: "",
    username: "",
    des: ""
  };

  @Provide() rules: any = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "change" }]
  };

  selectChange(select: string) {
    this.options.map((option: any) =   {
      if (option.role == select) {
        (this as any).account.key = option.key;
        (this as any).account.des = option.des;
      }
    });
  }

  @Emit("closeDialog")
  handleAdd() {
    // console.log(this.account);
    (this as any).$refs["ruleForm"].validate((valid: boolean) =   {
      if (valid) {
        (this as any).$axios
          .post("/api/users/addUser", this.account)
          .then((res: any) =   {
            this.$emit("update");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          });
      }
    });
  }
}
</script  

<style lang="scss" scoped  
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style  


```

##  21.管理员编辑删除功能

   当点击编辑的时候 input 变成可编辑的 

```
v-if v-else 判断 如果scope.row.edit 为false 就是正常状态 当为ture 的时候就是可编辑状态


  <el-button
    @click="handleEdit(scope.$index,scope.row)"
    v-if="!scope.row.edit"
    size="mini"
    编辑</el-button  
  <el-button
    @click="handleSave(scope.$index,scope.row)"
    v-else
    type="success"
    size="mini"
    完成</el-button  
  
  
  编辑方法 和 完成方法:
  
  
    handleEdit(index: number, row: any): void {
    // 编辑
    row.edit = true;
  }
  
    handleSave(index: number, row: any): void {
    // 完成
    row.edit = false;
    (this as any).$axios
      .post(`/api/users/editUser/${row._id}`, row)
      .then((res: any) =   {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      });
  }
```

     用 scope.row.edit 状态 控制可编辑与完成

  ```
    <el-table-column label="角色" width="180"  
    <template slot-scope="scope"  
      <!-- 如果 scope.row.edit为真 就显示为可编辑下拉列表 --  
      <!-- 如果为假 显示正常的文本 --  
      <el-select
        @change="selectChange(scope.row)"
        v-if="scope.row.edit"
        v-model="scope.row.role"
        
        <el-option
          v-for="option in options"
          :label="option.role"
          :value="option.role"
          :key="option.key"
          </el-option  
      </el-select  
      <span v-else  {{scope.row.role}}</span  
    </template  
  </el-table-column  
  
        <el-table-column label="账号" width="180"  
    <template slot-scope="scope"  
      <!-- 如果 scope.row.edit为真 就显示为input 可编辑 --  
      <!-- 如果为假 就显示为正常的文本 --  
      <el-input v-model="scope.row.username" v-if="scope.row.edit"  </el-input  
      <span v-else  {{scope.row.username}}</span  
    </template  
  </el-table-column  
  
  ```


   完整 AddAccount.vue

```
<template  
  <el-dialog
    title="新增账户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
    
    <el-form :rules="rules" ref="ruleForm" :model="account" class="form-box" label-width="100px"  
      <el-form-item label="请选择角色" prop="role"  
        <el-select @change="selectChange" v-model="account.role" placeholder="请选择角色"  
          <el-option
            v-for="option in options"
            :label="option.role"
            :value="option.role"
            :key="option.key"
            </el-option  
        </el-select  
      </el-form-item  
      <el-form-item label="请输入账号" prop="username"  
        <el-input v-model="account.username" placeholder="请输入账号"  </el-input  
      </el-form-item  
    </el-form  
    <span slot="footer" class="dialog-footer"  
      <el-button @click="$emit('closeDialog')"  取消</el-button  
      <el-button @click="handleAdd" type="primary"  确定</el-button  
    </span  
  </el-dialog  
</template  

<script lang="ts"  
import { Component, Vue, Prop, Provide, Emit } from "vue-property-decorator";
 // 接收父级传递的数据
@Component({
  components: {}
})
export default class AddAccount extends Vue {
  // prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Array) options!: any;

  // 定义当前的数据
  @Provide() account: object = {
    key: "",
    role: "",
    username: "",
    des: ""
  };

  @Provide() rules: any = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    role: [{ required: true, message: "请选择角色", trigger: "change" }]
  };

  selectChange(select: string) {
    this.options.map((option: any) =   {
      if (option.role == select) {
        (this as any).account.key = option.key;
        (this as any).account.des = option.des;
      }
    });
  }

  @Emit("closeDialog")
  handleAdd() {
    // console.log(this.account);
    (this as any).$refs["ruleForm"].validate((valid: boolean) =   {
      if (valid) {
        (this as any).$axios
          .post("/api/users/addUser", this.account)
          .then((res: any) =   {
            this.$emit("update");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          });
      }
    });
  }
}
</script  

<style lang="scss" scoped  
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style  


```

##  22.控制路由权限

   实现 除了超级管理员登录 有表单管理 和账户管理 其他用户登录 都没有权限

   在 router.ts 中 表单管理 和账户管理加上 roles 条件

```
表单管理:

  {
    path: "/formData",
    name: "formData",
    meta: {
      title: "表单管理", icon: "fa fa-file-text-o", roles:
        ["admin", "editor"]   //只有这两个用户 才有权限显示表单管理
    },
    component: () =   import("@/views/DataManage/FormData.vue")  // 动态加载 
  }
  
账户管理:
  
  
  {
    path: "/accountData",
    name: "accountData",
    meta: {
      title: "账户管理", icon: "fa fa-user-plus", roles:
        ['admin']   // 只有用户admin 才有权限显示账户管理
    },
    component: () =   import("@/views/UserManage/AccountData.vue")  // 动态加载 
  }
```

   然后在 store 状态文件夹 state.ts中

```
const state: any = {
  user: null,   //用于存储用户信息的状态
  //routers: asyncRouterMap //定义状态等于自己创建的路由
  routers: []   // 做权限管理 不能放出所有路由
};
```

   然后在 store 状态文件夹 actions.ts中把所有路由进行处理 判断用户是什么职位

```
import { ActionTree } from 'vuex';
import jwt_decode from 'jwt-decode'
import { asyncRouterMap } from "../router/index";

const actions: ActionTree<any, any   = {
  async setUser({ state, commit }, user: any) {
    const decoded: any = jwt_decode(user);
    commit('SET_USER', decoded);

    // 从 decoded 中拿到 key 解构出来
    const { key } = decoded;
    // 返回当前用户拥有权限的路由 比如 如果是admin 就返回所有
    let accessedRouters = filterAsyncRouter(asyncRouterMap, key);
    commit('SET_ROUTERS', accessedRouters);
  }
};

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param roles 当前角色
 */

function filterAsyncRouter(asyncRouterMap: Array<any  , roles: string) {
  const accessedRouters = asyncRouterMap.filter(route =   {
    //  console.log(route);  // 打印当前得到的所有路由的单个路由
    // 判断把所有路由和当前角色传过去
    // roles = 当前角色 route = 每一个路由
    if (hasPerssion(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

/**
 * 判断路由是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPerssion(roles: string, route: any) {
  // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((role: string) =   role.indexOf(roles)   = 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}

export default actions
```


    在router / index.ts 中判断

```

import jwt_decode from 'jwt-decode';


// router.beforeEach 全局前置守卫 有三个参数(to,from,next)
// 判断 isLogin是否登录进去 = 是否有tsToken ? 如果有返回true : 如果没有返回false
// 判断 如果to.路径是登录页的话 那就正常访问 || 或者是to.路径是找回密码页面的话 正常访问继续跳转
// 否则 判断isLogin是否为真 如果为真 继续跳转 否则 全跳转到 登录页面
router.beforeEach((to: any, from: any, next: any) =   {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == "/login" || to.path == "/password") {
    next();
  } else {
    // 如果已经登录进来了 
    if (isLogin) {
      const decoded: any = jwt_decode(localStorage.tsToken);
      const { key } = decoded;
      // 权限判断
      if (hasPermission(key, to)) {
        next();
      } else {
        next('/404'); // 没有权限进入
      }
    } else {
      next('/login');
    }
  }
})

/**
 * 判断路由是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPermission(roles: string, route: any) {
  // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((role: string) =   role.indexOf(roles)   = 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}
```

   让游客用户 不能编辑表格管理 编辑删除

   先在tableData 页面中


```
  <!-- 操作编辑 删除的列 绑定点击事件 --  
  <!-- 判断 如果当前用户不等于 游客visitor 就显示 意思是游客看不到编辑删除 --  
  <el-table-column v-if="getUser.key != 'visitor'" label="操作" width="160"  
    <template slot-scope="scope"  
      <el-button @click="handleEdit(scope.$index,scope.row)" size="mini"  编辑</el-button  
      <el-button @click="handleDelete(scope.$index,scope.row)" size="mini" type="danger"  删除</el-button  
    </template  
  </el-table-column  
```

```
import { State, Getter, Mutation, Action } from "vuex-class";

export default class TableData extends Vue {
  // 使用Getter 获取到当前用户
  @Getter("user") getUser: any;

```

## 总结



```
vue-ts-projects
|
|
└─── .gitignore (告诉Git哪些文件不需要添加到版本管理中)
|
|
└─── LICENSE (产品许可文件)
|
|
└─── vuets-api (后端)
|
|
└─── vuets-app (前端)
	|
	|
	└─── node_modules (所有的模块)
	|
	|
	└─── public (静态文件目录)	
	|				|
	|				|
	|				└─── css 
	|				|		|				
	|				|		|
	|				|		└─── reset.css (初始样式)
	|				|
	|				|
	|				└─── favicon.ico (图标)
	|				|
	|				|
	|				└─── index.html (主静态页面)
	|
	|
	└─── src (主文件目录)
	|		 |
	|		 |
	|		 └─── assets (该项目的资源文件,会被webpack打包进你的代码)
	|		 |    |
	|		 |    |
	|		 |    └─── (所有页面模块中引入的图片)
	|		 |
	|		 └─── components (组件)
	|		 |		|
	|		 |		|
	|		 |		└─── Charts.vue (ECharts 组件配置文件)
	|		 |
	|		 |
	|		 └─── router (路由管理)
	|	   |	 |	
	|	   |	 |	
	|		 |	 └─── index.ts (路由配置文件)
	|		 |
	|		 |
	|		 └─── store (Vuex状态管理)
	|		 |   |
	|		 |   |
	|		 |   └─── actions.ts 
	|		 |   |
	|		 |   |
	|		 |   └─── getters.ts
	|		 |   |
	|		 |   |
	|		 |   └─── index.ts
	|		 |   |
	|		 |   |
	|		 |   └─── mutations.ts
	|		 |   |
	|		 |   |
	|		 |   └─── state.ts
	|		 |
	|		 |
	|		 └─── utils (工具文件)
	|		 |   |
	|		 |   |
	|		 |   └─── http.ts (引入配置 axios 设置请求拦截 响应拦截)
	|		 |
	|		 |
	|		 └─── views (所有页面模块)
	|		 |   |
	|		 |   |
	|		 |   └─── DataManage (管理模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── ChartsData.vue (图标管理模块 折线图/柱状图/饼图)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── EditDialog.vue (表格管理模块中的编辑功能模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── FormData.vue (表单管理模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── TableData.vue (表格管理模块)
	|		 |   |
	|		 |   |
	|		 |   └─── Layout (页面布局的模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── Content.vue (包含面包屑 有两个插槽 侧边栏/右侧内容DataManage)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── Index.vue (页面主体 引入布局头部模块 内容模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── LayoutHeader.vue (布局头部模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── Sidebar.vue (侧边栏模块)
	|		 |   |
	|		 |   |
	|		 |   └─── Login (登录注册页面)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── Login.vue (登录页面 引入登录头部模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── LoginHeader.vue (登录注册页面的头部)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── Password.vue (注册页面 引入注册头部模块)
	|		 |   |
	|		 |   |
	|		 |   └─── UserManage (用户管理模块(包含个人中心页面))
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── AccountData.vue (用户列表管理模块)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── AddAccount.vue (新增账户 弹出层)
	|		 |   |   |
	|		 |   |   |
	|		 |   |   └─── UserInfo.vue (个人中心页面)
	|		 |   |
	|		 |   |
	|		 |   └─── 404.vue (访问错误的页面)
	|		 |   |
	|		 |   |
	|		 |   └─── Home.vue (登录后的首页 显示在内容主体中间的)
	|		 |
	|		 |
	|		 └─── App.vue (所有页面中共同需要的动画或者样式)
	|		 |
	|		 |
	|		 └─── main.ts (入口文件)
	|		 |
	|		 |
	|		 └─── shimtsx.d.ts (ts识别vue)
	|		 |
	|		 |
	|		 └─── shims-vue.d.ts (vue识别ts)
	|
	|
	└─── .gitignor (告诉Git哪些文件不需要添加到版本管理中)
	|
	|
	└─── babel.config.js (配置babel 源代码进行转码)
	|
	|
	└─── package-lock.json (锁定安装时的包的版本号，并且需要上传到git)
	|
	|
	└─── package.json (项目的配置信息)
	|
	|
	└─── README.md
	|
	|
	└─── tsconfig.json (指定了用来编译这个项目的根文件和编译选项)
	|
	|
	└─── vue.config.js (添加代理)
```



```
主要页面分为 登录注册页面 之后就是一个单页面 只有内容改变 头部/侧边栏/面包屑都不改变  
```

> jwt 验证

```
登录验证:
在登录请求里面拿到后台传来的token 
然后把token存储到localStorage里面 并且存储到vuex中
在axios请求拦截中判断localStorage是否有token 
如果有的话 就把token放到头部 headers.Authorization里面 授权 返回给服务器 
在axios响应拦截里面判断localStorage里面是否存在token 
如果token过期了 那么就跳转401页面 
然后在 router/index.ts 路由守卫中定义登录进来后 判断localStorage是否有token 
如果有继续跳转 如果没有 全部都跳转到登录
```

```
路由权限验证:
先设置路由 让外部能获取到 将自己创建的路由 挂载到routes下
在路由里面设置 roles:["admin", "editor"] 表示只有这两个用户 才有权限访问
然后在 store 状态文件夹 state.ts中改为 不能放出所有路由 给路由一个空数组
然后在 store 状态文件夹 actions.ts中把所有路由进行处理 判断用户是什么职位
在router / index.ts 中beforeEach 路由守卫判断 让游客用户 不能编辑表格管理 编辑删除
就可以在页面中 使用Getter 获取当前用户 
然后用v-if判断如果当前用户 不是某某 就不能使用某功能
```

