---
title: Vue资金管理
---

## 前言: 

后端接口使用 node.js   
后端框架使用 express + mongodb数据库  
前端框架 vue/cli 3.x  
前端ui框架 element-ui  



```
安装  vue ui
使用 Babel Router Vuex
使用 history
使用 package.json
选择不保存预设模板

```



在public 目录下创建 css 再创建 reset.css (初始化样式)

```
https://meyerweb.com/eric/tools/css/reset/  (也可以自己在里面设置加样式根据设计图定全局样式)
```



在public 下 index.html 中引入

```
<link rel="stylesheet" href="css/reset.css">
```



安装 element-ui 开发依赖

```
npm i element-ui -S

直接在main.js 中引入注册:

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
```



##  1.404页面

404页面

```
<template>
  <div class="nofind">
    <img src="../assets/404.gif" alt="">
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.nofind {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.nofind img {
  width: 100%;
  height: 100%;
}
</style>
```

配置404页面路由

```
import NotFound from "../views/404.vue";

  {
    path: '*',
    name: '/404',
    component: NotFound 
  }
```



##  2.注册页面表单element

> 页面结构

```
<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">流光资金后台管理</span>

        <!-- model 数据 rules 校验规定 ref 帮助获取表单内容 表单宽度 80px-->
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <!-- 先确认一个 然后复制即可 -->
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请再次输入密码"></el-input>
          </el-form-item>

          <!-- select 下拉框 -->
          <el-form-item label="选择身份" prop="password2">
            <el-select v-model="registerUser.identity" placeholder="请选择身份" class="up">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <!-- 当前的button 当点击的注册的时候 需要传递过去整个表单 就是form 绑定的ref-->
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>


 样式: 
<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

.up {
  padding-right: 30px;
}
</style>

```

**数据初始化 **  data( )

```
export default {
  name: "register",
  components: {},
  // data return 里面 返回初始化值
  data() {
    return {
      // 初始值
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
    };
  }
};
```



***element 表单验证 rules***

> 先定义表单验证规则 rules 

```
export default {
  name: "register",
  components: {},
  data() {
    // 创建一个变量保存规则 判断当前的密码 是否和第一次输入的密码一致
    // 然后需要在第二次规则中引入此自定义规则
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 初始值
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      // element 校验规则
      rules: {
        // 姓名input 验证规则:
        // required: 是否必填 必填会在input前面加上* message: 提示语 trigger: 在什么时候触发 blur 失去焦点时候触发
        // 最小长度2 最大长度30 在失去焦点的时候触发校验 (字段长度需分开写入)
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30个字符之间",
            trigger: "blur"
          }
        ],
        // email 校验规则: 类型必须是email 必填 在失去焦点时触发校验
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        // 第一个密码 校验规则:
        // 必填 最小长度6 最大长度30 在失去焦点时候触发 (字段长度需分开写入)
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30之间",
            trigger: "blur"
          }
        ],
        // 确认密码的规则 还需要多自己定义规则 写在当前 data 里面 return 之上 就可以在这里面使用validatePass2
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30之间",
            trigger: "blur"
          },
          {
            validator: validatePass2, // 校验规则: 自定义的规则
            trigger: "blur"
          }
        ]
      }
    };
  },
```



> 先写一个提交的方法 验证当前的注册按钮是否合格

```
  // 当点击的时候 传入一个形参 判断当前是否通过校验
  // 如果通过 弹出 submit
  // 如果没通过 打印 err 
  methods: {
    submitForm(formName) {
      // console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    }
  }
```

**当点击注册按钮的时候发送请求 注册内容  提示对应提醒语和加载动画loading**

>  先安装 axios   然后在main.js中引入

```
npm i axios 
```

```
import axios from "./http";
Vue.prototype.$axios = axios;
```



> src 下创建一个 http.js 用于 axios 请求的文件 

```
// 专门请求的文件
//引入
import axios from "axios";
// 引入 element ui 的 loading效果 和 Message提示语句
import {
  Message,
  Loading
} from 'element-ui';
import router from './router/index'

// 定义开始加载动画的方法
let loading

function startLoading() {
  loading = Loading.service({
    lock: true, // 是否锁定
    text: "拼命加载中...", // 提示语句
    background: 'rgba(0,0,0,0,7)' // 背景颜色
  });
}

// 定义结束加载动画的方法
function endLoading() { //使用Element loading-close 方法
  loading.close()
}

// 在请求的时候调用加载动画 请求完了 响应了 就调用结束动画


// 请求拦截 设置统一header
axios.interceptors.request.use(config => {
  // 调用加载动画
  startLoading();
  return config;
}, error => { // 错误提醒
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
  // 调用结束加载动画
  endLoading();
  return response;
}, error => { // 错误提醒
  endLoading();
  Message.error(error.response.data);
  return Promise.reject(error);
})


// 导出
export default axios;
```

**然后在main.js 中引入 和注册原型 然后就可以在各个页面中使用  $axios**

```
import axios from "./http";
Vue.prototype.$axios = axios
```

**vue 3.0以上的跨域请求 必须创建 vue.config.js**

> 使用的 proxy 跨域 请求的接口是 http://localhost:5001/api/

```
const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    baseUrl: '/', // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
        // Object.assign(config, { // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             'vue$': 'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:5001/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
}

```

在前端注册页面发起请求

```
  // 方法
  methods: {
    submitForm(formName) {
      // console.log(formName);
      // 当前的验证规则 所有绑定的数据 去验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 如果所有值验证都通过的话 就发起post请求 传递过去当前的数据信息
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              //如果成功的话 就.then
              //注册成功
              this.$message({
                message: "账号已经注册成功啦!!",
                type: "success"
              });
            });
          // 发完请求就跳转到login
          this.$router.push("/login");
        }
      });
    }
  }
```

**总结**

> 页面的data中定义初始数据 然后定义验证方法 在工具文件http.js 中设置加载动画 然后在请求拦截 和响应拦截中使用它 就当你发送请求的时候 就会加载动画 请求完了 就关闭 然后还配置了跨域请求 proxy







## 3.登录页面储存token



**页面结构**

> 定义数据 定义规则 绑定点击事件 发送请求拿到token 储存token 到localStorage 注册成功后跳转登录页面
>
> 处理token :  发送请求后 返回值res里面拿到toke 然后使用解构赋值

```
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) { //如果通过验证
        // 通过 http.js 发送post请求 第一个参数为请求路径 第二个参数为发送过去当前的所有数据
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            //console.log(res);  // 此处打印是登录成功后 拿到的返回值 data 里面就有服务端传来的token
            const { token } = res.data;  //把返回值data 里面的token 解构出来
            // 然后把token 存储到localStorage里面去 命名为 eleToken
            // 可以在 浏览器Application里面查看验证 登录后是否有token
            localStorage.setItem("eleToken",token);
            // 登录成功后进行页面跳转
            this.$router.push("/index");
          });
        }
      });
    }
  }
```



**设置路由**

> 在router里面 引入 注册路由



**路由守卫和token过期的处理**

> 实现在没有登录之前 能访问的页面只有 登录和注册 其他页面都无法访问

```
1. 在路由 index.js 中 调整路由实例router 使用router 调用 beforeEach

// 添加路由守卫
// 三个参数 (从哪里来 到哪里去 继续跳转)
// 创建一个变量(类似开关) 保存token 如果存在的话 是登录状态 如果不存在是没有登录状态
// 判断 如果当前要访问的是登录页面 或者 是注册页面 都可以继续跳转
// 否则 判断 开关是否为真 如果是真的话 就是登录状态 继续跳转
//                    如果是假的话 就未登录状态 就全部都跳转登录页面
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})
```

```
2. 配置请求拦截和响应拦截 在登录请求之后 
在请求拦截中 应该将当前的token 设置为统一的请求头 
在响应拦截中 利用判断当前状态码是否为401 来判断当前的token是否过期 如果过期了 要把token干掉 然后跳转登录页 如果没有过期的话 那么所有需要token的接口 就可以正常使用

在http.js 中

// 请求拦截 设置统一header
axios.interceptors.request.use(config => {
  // 调用加载动画
  startLoading();
  // 当发送请求后 判断当前的 localStorage里面是否有token 
  if(localStorage.eleToken){
    // 如果有token name要设置统一的请求头 header 的授权Authorization
    config.headers.Authorization = localStorage.eleToken;
  }
  return config;
}, error => { // 错误提醒
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
  // 调用结束加载动画
  endLoading();
  return response;
}, error => { // 错误提醒
  endLoading();
  Message.error(error.response.data);
  // 获取错误状态码 如果是401 代表token已经失效 直接干掉token 然后跳转登录页面
  // token过期时间 在后端api接口中设置
  const {status} = error.response;
  if(status == 401){
    Message.error('token失效,请重新登录!');
    // 清除token
    localStorage.removeItem('eleToken');
    // 跳转登录页面
    router.push("/login");
  }
  return Promise.reject(error);
})
```







## 4.使用vuex



**将localStorage里面的token解析 然后将token里面的数据存储到vuex中**



>  先安装能解析 token 的模块 

```
npm i jwt-decode
```

> 在login.vue 中使用 引入 jwt-decode 模块

```
import jwt_decode from "jwt-decode";
```

> 然后在登录页面的提交方法中 存储token到localStorage之后 解析token

```
// 解析token 
const decoded = jwt_decode(token);
console.log(decoded); // 此处clg 就可以拿到 token的所有属性 已经解析好 然后存储到vuex中
```

```
{id: "5dc2a97acd42f81210199fa2", name: "adanew", avatar: "//www.gravatar.com/avatar/bca1fe6720ea03bb88433445f8088a2f?s=200&r=pg&d=mm", identity: "employee", iat: 1573109515, …}
avatar: "//www.gravatar.com/avatar/bca1fe6720ea03bb88433445f8088a2f?s=200&r=pg&d=mm"
exp: 1573113115
iat: 1573109515
id: "5dc2a97acd42f81210199fa2"
identity: "employee"
name: "adanew"
__proto__: Object
```

>  然后将解析出来的对象 存储到vuex中

```
在store / index.js 中 配置vuex

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个类型 保存这个vuex的名字 方便在浏览器 vuex 中查看判断
const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: "SET_USER" // 用户信息
}

// 设置对应2个名字的 需要维护的状态
const state = {
  isAutnenticated: false, // 是否认证
  user: {} // 存储用户信息
}

// 获取是否是授权状态
const getters = {                 
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user
}

// 更改状态信息 设置一个mutations方法 
// 方法设置了一个类型 类型的名字 和参数(当前的状态 是否授权是true 还是false)
// 判断传入的 isAuthenticated 如果为真 那么state里面的状态改为 true 已授权
// 如果为假 那么state里面的状态改为 false 未授权
const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated) state.isAutnenticated = isAutnenticated;
    else state.isAutnenticated = false;
  },

  // 创建一个方法 传入参数为 state 是否授权状态 和 user 用户信息
  // 判断是否有用户信息 如果有 就把里面的值赋值给 user 用户信息
  // 如果没有 那么赋值一个空对象就行了 
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {}
  }
}

// 异步操作的actions 其实就是调用一下 mutations
const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

```

> 然后就可以在 登录页面中使用 
>
> 将解析的token 再存储到vuex 中

```
// 解析token
const decoded = jwt_decode(token);
// console.log(decoded); // 此处clg 就可以拿到 token的所有属性 已经解析好 然后存储到vuex中
// 解析的存储到vuex 中
this.$store.dispatch("setIsAutnenticated",!this.isEmpty(decoded));  // 判断授权
this.$store.dispatch("setUser",decoded);  // 判断用户
```

> 封装过的判断为空的方法

```
    // 封装过的 判断为空的方法 如果传递过去的东西是空的 返回真值 如果不是空 返回假值
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
```

> 解决刷新过后 vuex 就为空  需要在根组件 App.vue 进行设置

```
<script>
import jwt_decode from "jwt-decode";

export default {
  name: "app",
  // 钩子函数 在页面进入就调用
  // 如果 localStorage 里面有 token 
  // 创建一个常量 来保存解析后的token 对象
  // 解析后的token的对象存储到vuex 中 setIsAutnenticated 和 setUser 两个状态
  created() {
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    // 封装过的 判断为空的方法 如果传递过去的东西是空的 返回真值 如果不是空 返回假值
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
```

**总结**

```
1. 创建button登陆 绑定点击事件 传入参数为当前绑定的数据
2. this.$refs[绑定的数据].validata(valid)=>{} 进行表单校验
3. 将valid 作为参数传入 如果通过校验 就通过 http.js 发送请求
4. 在请求拦截中 应该将当前的token 设置为统一的请求头 
5. 在响应拦截中 利用判断当前状态码是否为401 来判断当前的token是否过期 如果过期了 要把token干掉 然后跳转登录页 如果没有过期的话 那么所有需要token的接口 就可以正常使用
6. 拿到token 然后将token解构
7. 然后将token 存储到localStorage里面去 (此处就可以在浏览器验证 是否有token)
8. 使用插件 jwt_decode 解析token 拿到数据对象
9. 将数据对象存储到 vuex 中
```

**配置vex**

```
1. 创建类型 types 
2. state,getters,mutations,actions 创建4个常量设置4个状态
3. 在根路径也要进行设置 不然刷新后 vuex 就消失
```





## 5.主页面



**主页面分为 头部导航 侧边栏 还有就是主内容**

```
1. 在components 下创建 HeadNav.vue 公用的头部导航
2. 在components 下创建 LeftMenu.vue 公用的侧边栏
3. 将公共的头部导航 / 侧边栏 引入到 index.vue 中
4. 在views 下创建主页面 InfoShow.vue / Home.vue / Login.vue / Register.vue / FoundList.vue / 404.vue / Index.vue
5. 主页面内容使用 router-view 引入 然后需要在父级路由下 设置子路由
```

> 将公共组件 引入 主页面 

```
<template>
  <div class="index">
    <!-- 头部导航栏 -->
    <HeadNav />
    <!-- 侧边栏 -->
    <LeftMenu />
    <!-- 主体 -->
    <div class="rightContainer">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";

export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
```



>  在父级路由下设置子路由 主页面的二级路由

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from "../views/404.vue";
import Home from "../views/Home.vue";
import InfoShow from "../views/InfoShow.vue";
import FoundList from "../views/FoundList.vue";

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index'},
  { path: '/register', name: '/register', component: Register },
  { path: '/login', name: '/login', component: Login },
  { path: '*', name: '/404', component: NotFound },
  { 
    path: '/index', 
    name: '/index', 
    component: Index,
    children: [ 
      { path: "", component: Home },
      { path: "/home", name: 'home', component: Home },
      { path: "/infoshow", name: 'infoshow', component: InfoShow }, //个人信息页面
      { path: "/foundlist", name: 'foundlist', component: FoundList }, //个人信息页面
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加路由守卫
// 三个参数 (从哪里来 到哪里去 继续跳转)
// 创建一个变量(类似开关) 保存token 如果存在的话 是登录状态 如果不存在是没有登录状态
// 判断 如果当前要访问的是登录页面 或者 是注册页面 都可以继续跳转
// 否则 判断 开关是否为真 如果是真的话 就是登录状态 继续跳转
//                    如果是假的话 就未登录状态 就全部都跳转登录页面
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router
```





## 6.主页面的头部导航结构



**实现退出登录**

```
1. store / index.js 中设置一个清除操作 清除当前状态

  // 清除操作 退出操作 清除当前状态
  clearCurrentState: ({ commit })=>{
    commit(tpyes.SET_IS_AUTNENTIATED,false);  // 将授权为flase
    commit(tpyes.SET_USER,null);   // 将用户信息为空
  }
  
2. 点击退出登录 操作清除 token 清除 vuex状态 然后跳转登录页面

    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      // 清除设置vuex store
      this.$store.dispatch('clearCurrentState');
      //跳转登录页面
      this.$router.push('/login');
    }
```

**头部结构**

```
<template>
  <header class="head-nav">
    <!-- 行 -->
    <el-row>
      <!-- 列 分为6等分 左侧logo 网站名-->
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt />
        <span class="title">流光资金后台管理系统</span>
      </el-col>
      <!-- 右侧头像 提示语 用户名 下拉菜单 -->
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 command	指令-->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "head-nav",
  // 使用计算属性 动态拿到 当前保存在vuex 中的用户名
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  // 方法
  methods: {
    // 这个方法表示 当我们点击的是个人信息的话 就返回来个人信息的command 就是info
    // 下拉菜单的方法
    setDialogInfo(cmdItem) {
      // console.log(cmdItem);
      if (cmdItem == "info") {
        this.showInfoList();
      } else if (cmdItem == "logout") {
        this.logout();
      }
    },
    showInfoList() {
      // console.log("个人信息");
      this.$router.push('/infoshow')
    },
    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      // 清除设置vuex store
      this.$store.dispatch('clearCurrentState');
      //跳转登录页面
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
```





## 7.主页面的侧边栏结构

```
1. 侧边栏子级 需要在data return中 设置子级 就可以出来下拉子级 然后使用遍历出来
2. 再遍历要跳转的内容 用citem 遍历 item的children属性 绑定:to 跳转路径
```

```
<!-- 用 item 循环items 数据 -->
<template v-for="item in items">
<!-- 判断 item 的children 里面是否有内容 如果有的话就绑定 item.path 
  <el-submenu v-if="item.children" : index="item.path" :key="item.path">
  <!--  slot title 插糟 -->
    <template slot="title">
       <i :class="'fa fa-margin '+item.icon"></i>
       <span slot="title">{{item.name}}</span>
    </template>
   <!-- 跳转的内容 -->
  <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
    <el-menu-item :index="citem.path">
       <span slot="title">{{citem.name}}</span>
    </el-menu-item>
  </router-link>
 </el-submenu>
</template>
```

```
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          // children 当前里面包含的子级
          children: [{ path: "foundlist", name: "资金流水" }]
        },
        {
          icon: "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>

```







## 8.主内容的 home 内容结构

```
<template>
    <div class="home">
        <div class="container">
            <h1 class="title">流光在线</h1>
            <p class="lead"> 专注于资金管理, 用心做服务! </p>
        </div>
    </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>
```







## 9.主内容的 个人中心 内容结构



**个人信息页面**

```
1. 需要先在 public / index.html 中引入图标
<link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">

```

```
<template>
  <div class="infoshow">
    <!-- 行居中展示 -->
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img src="user.avatar" class="avatar" alt />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <!-- 判断当前的数据 是不是manager 如果是的话 就是管理员老板 不是的话就是普通用户 -->
            <span>{{user.identity == "manager" ? "老总" : "打工仔"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "infoshow",
  computed: { 
    // 获取到user数据
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>

```



## 10.主内容的 资金流水 内容结构



```
1. 创建页面 配置路由 (此处页面属于 index 的子级路由 由于在侧边栏组件中已经定义了 直接使用侧边栏定义的 path )
2. 声明一个请求的方法 在页面进来就调用 方法是拿到所有当前需要的数据 然后将数据 赋值给当前绑定的数据
3. 给table 加个 v-if 判断 如果数据里面长度等于 0 那就是没请求到值 所以就不用接下去操作了
4. 然后实现 添加按钮(弹出组件) 编辑按钮 删除按钮 分页查询 搜索功能
```



**获取数据**

```
<script>
export default {
  name: "fundList",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表格数据
      this.$axios
        .get("/api/profile")
        .then(res => {
           console.log(res); //把拿到的内容赋值给 tableData 当前页面绑定的数据
          this.tableData = res.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

绑定到 el-table 中 :data="tableData" 
```



**添加按钮**

```
1. 使用 element-ui 的对话框功能 弹出一个添加框
2. 在components 里面创建 DialogFound.vue 弹出框组件
3. 使用父组件传值 在父组件 FoundList.vue 中引入 注册 DialogFound.vue 弹出框

import DialogFound from "../components/DialogFound";   // 引入
components:{ DialogFound }  // 注册

4. 在父组件中绑定一个 显示隐藏的开关 初始为隐藏 dialog: { show: false },// true 显示 false 隐藏
5. 给父组件添加按钮上绑定  handleAdd() { this.dialog.show = true } // 当点击添加 就显示
6. 父组件中引用 <DialogFound :dialog="dialog"></DialogFound>
```



**添加弹出框页面结构**

```
<template>
  <div class="logfound">
    <!-- :title 弹出框的标题 -->
    <!-- :visible 显示和隐藏 -->
    <!-- :close-on-click-modal 是否可以点击其他地方 关闭弹出框 -->
    <!-- :close-on-press-escape 是否可以按esc 关闭弹出框-->
    <el-dialog
      title="添加资金信息"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "logfound",
  props:{
    dialog: Object
  },
};
</script>

<style scoped>

</style>
```





**将添加和编辑写到一起**

```
1.将数据提交到DialogFound.vue 的父级 FoundList.vue 中去
2.将form 传递到 DialogFound.vue 中去  :form="form" 传过去
3.之后在DialogFound.vue 中接收 form : Object
4.在 DialogFound.vue 组件中 当表单数据验证完成之后 判断当前是 添加还是修改 
5.如果是添加 进入add  如果不是添加 那么其他的都进edit 编辑
```

```
编辑的方法:
	获取当前的页面的数据然后进行修改

    onEditMoney(row) {
      // 编辑的方法
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
```

```
 添加的方法: 
 	 当前数据全为空 没有值 自由添加
   
   onAddMoney() {
      // 添加的方法
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
```

```
子组件动态进入 添加 还是 编辑 方法 

    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，动态提交数据;
          // 判断是添加 还是 修改
          // 如果是 add 的话 那就是添加 如果不是add的话 那就是进入编辑
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profile/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    }
```



**删除按钮**

```
 <template slot-scope="scope">
   <el-button
   type="warning"
   icon="edit"
   size="small"
   @click="onEditMoney(scope.row)"
   v-if="user.identity =='manager'"
   >
   编辑
   </el-button>
   <el-button
   type="danger"
   icon="delete"
   size="small"
   v-if="user.identity =='manager'"
   @click="onDeleteMoney(scope.row,scope.$index)"
   >
     删除
   </el-button>
 </template>
</el-table-column>
```

```
// 删除的方法传入一个id 就直接删除当前id

    onDeleteMoney(row, index) {
      // 删除的方法
      this.$axios.delete(`/api/profile/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
```



**分页查询**

```
1. 都是动态绑定 所以到data里面设置一个对象 paginations: 保存需要给分页组件传递的信息
2. 然后在el-pagination 标签上全部定义的信息都进行动态绑定 
3. 实现 handleSizeChange 方法 和 handleCurrentChange 方法
4. 创建  allTableData: [], 保存数据 在页面进来获取数据的时候 就把所有数据都放入allTableData 中
5. 然后拿到数据后 就可以设置分页数据 实现 setPaginations 方法
```

```
分页页面结构: 

      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
```

```
分页方法: 

// 点击哪页 就跳转哪页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1); 
      // 数据的总数
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    
// 点击每页多少条 切换size 页大小是会变动的 
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;   //页码
      this.paginations.page_size = page_size;  //页大小
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    
// 总页数
    setPaginations() {
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;   //页码
      this.paginations.page_size = 5;    //页大小
      // 设置默认分页数据 将数据过滤
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
```



**筛选页面结构**

```
<!-- 按照时间筛选 -->
<el-form :inline="true" ref="search_data" :model="search_data">
<el-form-item label="投标时间筛选:">
  <!-- 开始时间 -->
  <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
  <!-- 结束时间 -->
  <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
</el-form-item>
<el-form-item>
  <!-- 筛选按钮 -->
  <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
</el-form-item>
```

```
筛选方法:

    onScreeoutMoney() {
      // 筛选
      // 判断 !this.search_data.startTime 或者是 !this.search_data.endTime 任何一个为空的话
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime(); // 获取当前的 startTime
      const etime = this.search_data.endTime.getTime(); // 获取当前的 endTime
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据的调用
      this.setPaginations();
    }
```



**资金流水总页面结构**

```
<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <!-- 按照时间筛选 -->
        <el-form-item label="投标时间筛选:">
          <!-- 开始时间 -->
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <!-- 结束时间 -->
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- 筛选按钮 -->
          <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="onAddMoney()"
            v-if="user.identity =='manager'"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="onEditMoney(scope.row)"
              v-if="user.identity =='manager'"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              v-if="user.identity =='manager'"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <!-- el里面 栅格布局分为24列 24就是撑满整行 -->
        <!-- v-if 判断 -->
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹框页面 -->
    <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
  </div>
</template>

<script>
import DialogFound from "../components/DialogFound";

export default {
  name: "fundlist",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        // total 总数 页数 上一条 页码 下一条 跳转到哪里
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profile").then(res => {
        // this.tableData = res.data;
        this.allTableData = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },
    onEditMoney(row) {
      // 编辑的方法
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    onDeleteMoney(row, index) {
      // 删除的方法
      this.$axios.delete(`/api/profile/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    onAddMoney() {
      // 添加的方法
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    // 分页
    handleCurrentChange(page) {
      // 点击哪页 就跳转哪页
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      // 数据的总数
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 点击每页多少条 切换size 页大小是会变动的
      this.paginations.page_index = 1; //页码
      this.paginations.page_size = page_size; //页大小
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1; //页码
      this.paginations.page_size = 5; //页大小
      // 设置默认分页数据 将数据过滤
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    onScreeoutMoney() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
```

**资金流水中提示框组件总结构**

```
<template>
  <div class="logFund">
    <!-- :title 动态绑定 弹出框的标题 -->
    <!-- :visible 显示和隐藏 右上角的叉-->
    <!-- :close-on-click-modal 是否可以点击其他地方 关闭弹出框 -->
    <!-- :close-on-press-escape 是否可以按esc 关闭弹出框-->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="收支类型:">
            <el-select v-model="form.type" placeholder="收支类型">
              <!-- 此处是循环收支类型 可以下拉选择需要的类型 -->
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="describe" label="收支描述:">
            <el-input type="describe" v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="form.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="form.expend"></el-input>
          </el-form-item>

          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="form.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <!-- 通过改变弹出框的开关 来取消显示 -->
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      // 管理支出 收入的类型
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      // 校验规则
      form_rules: {
        describe: [{ required: true, message: "收支描述不能为空！", trigger: "blur" }],
        income: [{ required: true, message: "收入不能为空！", trigger: "blur" }],
        expend: [{ required: true, message: "支出不能为空！", trigger: "blur" }],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，动态提交数据;
          // 判断是添加 还是 修改
          // 如果是 add 的话 那就是添加 如果不是add的话 那就是进入编辑
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profile/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>


```





## 11.权限功能



> 根据不同的角色有不同的效果 普通员工不允许编辑删除 不允许添加 只有管理员有权限

 ```
1. 先在FoundList.vue 页面中计算属性 因为可以从vuex 中直接获取到user 
2. 在添加 / 编辑 / 删除 / 按钮里面都 加上v-if判断来决定显示隐藏  v-if="user.identity =='manager'" 就实现 只有用户是 管理员才有权限使用
 ```





## 12.时间过滤器

> 因为后台传来的时间格式跟平常不一样 所以需要格式化过滤一下

```
1. 在assets/js 创建 Date.js 写一个过滤器  把这个过滤器暴露出去

// 时间过滤器

var dateFormat = {
  padLeftZero: function (str) {
    return ('00' + str).substr(str.length)
  },
  formatDate: function (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
      }
    }
    return fmt
  }

}

export default dateFormat;
```

```
2. 然后在需要使用的页面引入他
import dateFormat from "../assets/js/Date";

3. 写过滤器
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return dateFormat.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }

4. 就可以在需要使用的数据上使用 
<span style="margin-left: 10px">{{ scope.row.date | formatDate }}</span>
```





## 13.使用 scss

```
npm install node-sass --save-dev
npm install sass-loader --save-dev

就可以使用 <style lang="scss" scoped>
```



## 14. 面包屑导航

```
路由配置文件:
  {
          path: '/Trafficaccidentddetail',
          name: 'Trafficaccidentddetail',
          meta: {
            title: '交通事故详情',
            breadcrumb:[
              {
                name:'事件管理',
                path:'/Trafficaccident'
              },
              {
                name:'交通事故',
                path:'/Trafficaccident'
              },
              {
                name:'详情',
                path:'/Trafficaccidentddetail'
              }
            ]
          },
          component: resolve => require(['../components/page/Trafficaccidentddetail.vue'], resolve) //交通事故详情
        },
        
说明：在这里我们 router 的 meta属性 添加了 自定义的breadcrumb对象，这样做后，在每个需要展示面包屑的组件页面中都可以通过访问
```

```
在面包屑组件中可以不用watch,可以直接使用计算属性，循环计算属性
      
      
      computed:{
        breadcrumb(){
          return  this.$route.meta.breadcrumb;
        }
      },
      
      
      
      <!-- 面包屑 -->
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item 
            :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item 
            :to="{ path: item.path }" 
            v-for="(item,index) in breadcrumb"
            :key="index"
            >
            {{item.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
```



## 15. 完善首页

```
1. 分为8个组件构成
  1.1 四个用户信息
  1.2 echarts 曲线图
  1.3 echarts 六边形图
  1.4 echarts 扇形图
  1.5 echarts 树状图
  1.6 一个表单
  1.7 一个日常记录 list
  1.8 个人页面
  
1.1 先安装 CountTo 指定的持续时间内计入目标数 npm install vue-count-to
 使用 import CountTo from 'vue-count-to'
    再安装 svg-icon 标签
 使用 npm install vue-svg-icon --save-dev
```





##  总结

