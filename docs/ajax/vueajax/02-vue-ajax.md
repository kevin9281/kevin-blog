---
title: Vue+json-server实现RESTful风格的后台管理
---

## 1.介绍  
   这是用 json-server + postman 实现的RESTful风格的后台管理 增删改查  
   
    跳转可以分为带路由跳转

## 2.介绍json-server  
   json-server可以直接把一个json文件托管成一个具备全RESTful风格的API,并支持跨域、jsonp、路由订制、数据快照保存等功能的 web 服务器。

   app.js配合mockjs库可以很方便的进行生成模拟数据, 比如:  

```
// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () =   {
  // 使用 Mock
  var data = Mock.mock({
    'course|227': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,
        course_name: '@ctitle(5,10)',
        autor: '@cname',
        college: '@ctitle(6)',
        'category_Id|1-6': 1
      }
    ],
    'course_category|6': [
      {
        "id|+1": 1,
        "pid": -1,
        cName: '@ctitle(4)'
      }
    ]
  });
  // 返回的data会作为json-server的数据
  return data;
};
```

    默认的路由json-server为提供GET,POST, PUT,PATCH,DELETE等请求的API,分别对应数据中的所有类型的实体。  

```
# 获取所有的课程信息
GET    /course

# 获取id=1001的课程信息
GET    /course/1001

# 添加课程信息，请求body中必须包含course的属性数据，json-server自动保存。
POST   /course

# 修改课程，请求body中必须包含course的属性数据
PUT    /course/1
PATCH  /course/1

# 删除课程信息
DELETE /course/1

# 获取具体课程信息id=1001
GET    /course/1001
```

## 3.配置环境  
---  

title: Vue vue-resource json-server postman 实现数据请求交互


---  



   先安装过  
   vue node postman  

   RESTful 接口方式实现  
   实现后台增删改查  
   搭建本地数据接口也称为ResTful规范  
   使用 jsonplaceholder.typicode.com 测试请求  

   1.创建全局 json-server  
``` sudo npm install -g json-server ```  

   2.初始化 package.son  
``` npm init ```  

   3.```npm install json-server --save```  

   4.更改启动方式  
```
"scripts": {
    "json:server": "json-server --watch db.json"
  },
```

   5.创建一个db.json数据 
```
{
  "users":[
    {
      "name":"Henry",
      "phone":"333-444-555",
      "email":"henry@gmail.com",
      "id":1,
      "age":30,
      "companyId":1
    },
    {
      "name":"Bucky",
      "phone":"333-444-555",
      "email":"Bucky@gmail.com",
      "id":2,
      "age":30,
      "companyId":2
    },
    {
      "name":"Kevin",
      "phone":"333-444-555",
      "email":"Kevin@gmail.com",
      "id":3,
      "age":30,
      "companyId":3
    },
    {
      "name":"Cony",
      "phone":"333-444-555",
      "email":"Cony@gmail.com",
      "id":4,
      "age":30,
      "companyId":4
    }
  ],
  "companies":[
    {
      "id":1,
      "name":"Apple",
      "description":"Apple is good!"
    },
    {
      "id":2,
      "name":"Microsoft",
      "description":"Microsoft is good!"
    },    
    {
      "id":3,
      "name":"Google",
      "description":"Google is good!"
    }
  ]
}
```

   启动josnserver 完成json-server的搭建  
```npm run json:server```  

   就可以从看到数据  
```
 Resources
  http://localhost:3000/users
  http://localhost:3000/companies
```  
   看到首页可以看到所有数据元
``` 
  Home
  http://localhost:3000  
```

## 4.使用json-server-get请求  
   获取所有用户信息  
```
http://localhost:3000/users
```  

   获取id为1的用户信息  
```
http://localhost:3000/users/1
```

   获取所有companies 数据  
```
http://localhost:3000/companies
``` 

   获取id 为1的 companies信息
```
http://localhost:3000/companies
```

   获取所有公司id为3的用户信息
```
http://localhost:3000/companies/3/users
```  

   获取名字为 Microsoft的公司信息
```
http://localhost:3000/companies?name=Microsoft
```

   同时获取公司名字为 Microsoft 和 Apple 的信息
```
http://localhost:3000/companies?name=Microsoft&name=Apple
```

   获取公司页数 要求数据  
   获取1页中只有两条数据的信息
```
http://localhost:3000/companies?_page=1&_limit=2
```

   根据名字的升序排序找到公司信息(desc降序)
```
http://localhost:3000/companies?_sort=name&_order=asc
```

   根据年龄进行操作
   获取年龄30及以上的人员信息
```
http://localhost:3000/users?age_get=30
```  

   获取年龄30-40之间的人员信息  
```
http://localhost:3000/users?age_get=30&age_lte=40
```

   获取name中包含 k 的人员信息
```
http://localhost:3000/users?q=k
```

## 5.使用postman-post请求  
   当json-server 开启成功后  
   启动postman 然后把json-server启动域名输入input栏  
   点击左边 选择post 然后设置  
   Headers  
```
KEY 输入 Content-Type 
VALUE  输入 application/json
```
   就可以在 Body / row 内写入信息 比如:  
```
{
	"name":"莫相澧",
	"email":"121282320@qq.com",
	"companyId":"3"
}
```

   然后点击 Send 信息就会自动生成到你本地的 db.json文件内 页面中就会多出一条数据

## 6.使用postman-DELETE  
   把input旁边的请求方法 改为DELETE   
   然后把请求的域名改为  
```
http://localhost:3000/users/5
```

   然后点Send 会返回一个 { } 空的  
   然后本地的db.json中的数据就删除了  

## 7.使用postman-PATCH  
   PATCH 更新方法  
   先把请求方法改为 PATCH  
   然后把域名改为  
```
http://localhost:3000/users/2
```
   更新id为2的人员信息(把id为2人员信息的name改为"莫相澧"  

   同样设置好Headers  
   在Body中 改为  
```
{
	"name":"莫相澧"
}
```

   postman 返回数据  
```
{
  "name": "莫相澧",
  "phone": "333-444-555",
  "email": "Bucky@gmail.com",
  "id": 2,
  "age": 30,
  "companyId": 2
}
```
   然后本地数据就改好了  

## 8.添加启动配置(假數據)
   在package.json 中 "scripts":{ 添加
```
"json:server:remote":"json-server http://jsonplaceholder.typicode.com/db"
```

   可以吧placeholder中的所有信息拿到本地  
   终端输入
```
npm run json:server:remote  
 ```

   就可以拿到postman提供的假數據  
```
Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/albums
  http://localhost:3000/photos
  http://localhost:3000/users
  http://localhost:3000/todos

  Home
  http://localhost:3000
```  

## 9.配置 vue-cli  

   全局命令行安装vue 

```
sudo npm install -g vue-cli
```

   在文件夹内安装vue脚手架cli项目

```
vue create vcustomers
```  

   然后进入项目内  

```
npm run serve
```

   更改本地域名端口号  

```
所在目录 node_modules\@vue\cli-service\lib\commands  
   将port 改为其他
```

   更改mode : 'history'  
   route/index 就可以去掉井号  

```
const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes
})
```

   当添加组件的时候 只需要创建好 然后到 route / index.js /const routes = [] 中注册即可  
   一个箭头函数表示既引入了 又注册了  

```
  {
    path:'/customers',
    name:'customers',
    component: () =   import('../components/Customers.vue')
  }
```

## 10.路由配置  
   router / index.js

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =   import( /* webpackChunkName: "about" */ '../components/About.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () =   import('../components/Add.vue')
  },
  {
    path: '/editor/:id',
    name: 'editor',
    component: () =   import('../components/Editor.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () =   import('../components/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

export default router
```  

## 11.使用 element  

   安装  
```
npm i element-ui -S
```

   在main.js中 完整引入  

```
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h =   h(App)
});
```

   以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。  

   在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，具体操作如下：  

```
import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
```

   然后对照组件设计表格

## 12.发送get查询请求  

   然后打开json-server  

   还需要安装vue-resource Vue 要实现异步加载需要使用到 vue-resource 库。Vue.js 2.0 版本推荐使用 axios 来完成 ajax 请求。

```
npm i vue-resource --save
```

   然后在main.js中配置  

```
import VueResource from 'vue-resource'
Vue.use(VueResource)
```

   然后在.vue中发起请求拿到数据  先声明一个空数组 接收返回的数据  

```
export default {
  name: "about",
  data() {
    return {
      customers: []
    };
  },
  methods: {
    fetchCustomers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.customers = response.body;
        console.log(this.customers);
      });
    }
  },
  created() { //页面创建完后调用
    this.fetchCustomers();
  },
  updated(){ //页面更新后调用
    this.fetchCustomers();
  }
};
```

   将页面中:data 改为请求到的数据名字即可实现绑定 

```
<template  
  <div class="about contanter"  
    <h1 style="display:blank" class="page-header"  用户管理系统</h1  
    <el-table :data="customers" style="width: 100%"  
      <el-table-column prop="name" label="姓名" width="180"  </el-table-column  
      <el-table-column prop="phone" label="电话" width="180"  </el-table-column  
      <el-table-column prop="email" label="邮箱"  </el-table-column  
      <el-table-column fixed="right" label="操作" width="100"  
        <template slot-scope="scope"  
          <el-button @click="jump(scope.row.id)" type="text" size="small"  详情</el-button  
        </template  
      </el-table-column  
    </el-table  
  </div  
</template  
```




   遇到的问题 首先sockjs-node是一个JavaScript库，提供跨浏览器JavaScript的API，创建了一个低延迟，全双工的浏览器和web服务器之间通信通道。
如果你的项目没有用到sockjs,vuecli3 运行npm run serve 之后network里面一直调用一个接口:
http://localhost:8080/sockjs-node/info?t=1556418283950
方案：从根源上关闭此调用
1、node_modules/sockjs-client/dist/sockjs.js
2、代码的1605行注释
// self.xhr.send(payload);
ps:可在代码开发完成后关闭，会同步关闭热加载  
   也可以在项目根目录添加 tslint.json 文件  
设置 eslint 代码检测

```
{
    "defaultSeverity": "warning",
    "extends": [
      "tslint:recommended"
    ],
    "rules": {
      "quotemark": [true, "single"],
      "indent": [true, "spaces", 2],
      "interface-name": false,
      "ordered-imports": false,
      "object-literal-sort-keys": false,
      "no-consecutive-blank-lines": false,
      "no-shadowed-variable": false,
      /** 取消reuire禁止检查 */
      "no-var-requires": false,
      "semicolon":false,
      "whitespace":false,
      /** 禁止尾部分号检查 */
      "trailing-comma":false,
      /** 禁止尾部空格检测 */
      "no-trailing-whitespace": false,
      "variable-name":[true, "ban-keywords","check-format", "allow-leading-underscore"],
      "no-console": [true, "log", "error"],
      /** 允许一个文件有多个class */
      "max-classes-per-file":false
    }
  }
```

## 13.发送post添加数据请求  

   使用post 将添加的数据传递到本地接口里面去  

```
export default {
  name: "add",
  data() {
    return {
      customers: {

      } //接收数据
    };
  },
  methods: {
    onSubmit(e) { //传入e 阻止默认事件
    //判断不能为空
      if(!this.customers.name || !this.customers.phone || !this.customers.email){
        console.log("请添加对应的信息!");
      }else{
    //将本地输入的数据赋值给数据库中的数据 
        let newCustomer = {
          name:this.customers.name,
          phone:this.customers.phone,
          email:this.customers.email
        }
    //把数据传入这个域名
        this.$http.post("http://localhost:3000/users",newCustomer).then(function(response){
          alert('添加成功!');
          this.$router.push({ //跳转列表页
            path:'/about'
          })
        })
      }
      e.preventDefault();//阻止默认事件
    }
  }
};
```


   表单格式

```
<template  
  <div class="add contanter"  
    <el-form ref="form" :model="customers" label-width="80px"  
      <el-form-item label="姓名"  
        <el-input v-model="customers.name"  </el-input  
      </el-form-item  
      <el-form-item label="电话"  
        <el-input v-model="customers.phone"  </el-input  
      </el-form-item  
      <el-form-item label="邮箱"  
        <el-input v-model="customers.email"  </el-input  
      </el-form-item  
      <el-form-item  
        <el-button type="primary" @click="onSubmit"  立即添加</el-button  
        <el-button  取消</el-button  
      </el-form-item  
    </el-form  
  </div  
</template  
```  

## 14.点击详情传参跳转详情页与删除  

   列表页面  

```
<template  
  <div class="about contanter"  
    <h1 style="display:blank" class="page-header"  用户管理系统</h1  
    <el-table :data="customers" style="width: 100%"  
      <el-table-column prop="name" label="姓名" width="180"  </el-table-column  
      <el-table-column prop="phone" label="电话" width="180"  </el-table-column  
      <el-table-column prop="email" label="邮箱"  </el-table-column  
      <el-table-column fixed="right" label="操作" width="100"  
        <template slot-scope="scope"  
          <el-button @click="jump(scope.row.id)" type="text" size="small"  详情</el-button  
        </template  
      </el-table-column  
    </el-table  
  </div  
</template  

<script  
export default {
  name: "about",
  data() {
    return {
      customers: []
    };
  },
  methods: {
    fetchCustomers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.customers = response.body;
        //console.log(this.customers);
      });
    },
    jump(id){ //跳转传参
      //console.log(id);
      this.$router.push(`/editor/${id}`);
    }
  },
  created() {
    this.fetchCustomers();
  }
};
</script  


<style scoped  
</style  

```

   在跳转后的详情页面 取到参数  

```
<template  

  <div class="editor contanter"  
    <ul class="uul"  
      <li  
        {{customers.name}}
        <span  
          <router-link v-bind:to="'/edit/'+customers.id" class="blue"  
            编辑
          </router-link  
          <button v-on:click="deleteCustomer(customers.id)" class="red"  
            删除
          </button  
        </span  
      </li  
      <li  {{customers.phone}}</li  
      <li  {{customers.email}}</li  
      <li  {{customers.id}}</li  
    </ul  
   
  </div  
</template  

<script  
export default {
  name: "editor",
  data() {
    return {
      customers: ""
    };
  },
  methods: {
    fetchCustomers(id) {
      this.$http
        .get("http://localhost:3000/users/" + id)
        .then(function(response) {
          this.customers = response.body;
          //console.log(this.customers);
        });
    },
    deleteCustomer(id){
      //console.log(id);
      this.$http.delete("http://localhost:3000/users/" + id)
      .then(function(response){
        alert('删除成功!');
        console.log(response);
        this.$router.push({path:"/about"})
      })
    }
  },
  created() {
    this.fetchCustomers(this.$route.params.id);
    //console.log(this.$route.params.id) 拿到点击编辑传来的id值
  }
};
</script  

<!-- Add "scoped" attribute to limit CSS to this component only --  
<style  
.uul{
  list-style: none;

}
.uul li {
  padding: 20px;
}
.blue{
  background: blue;
  color: #fff;
  width: 8px;
  height: 4px;
  border-radius: 50%;
  text-decoration: none;
}
.red{
  background: red;
  color: #fff;
  border-radius: 50%;
}
</style  
```  

## 15.点击编辑跳转新编辑页面  

   编辑的页面  

```
<template  
  <div class="edit contanter"  
    <el-form ref="form" :model="customers" label-width="80px"  
      <el-form-item label="姓名"  
        <el-input v-model="customers.name"  </el-input  
      </el-form-item  
      <el-form-item label="电话"  
        <el-input v-model="customers.phone"  </el-input  
      </el-form-item  
      <el-form-item label="邮箱"  
        <el-input v-model="customers.email"  </el-input  
      </el-form-item  
      <el-form-item  
        <el-button type="primary" @click="updateCustomer"  确定</el-button  
        <el-button  取消</el-button  
      </el-form-item  
    </el-form  
  </div  
</template  

<script  
export default {
  name: "edit",
  data() {
    return {
      customers: {

      }
    };
  },
  methods: {
    fetchCustomer(id){
      this.$http.get("http://localhost:3000/users/"+id).then(function(response){
        //console.log(response);
        this.customers = response.body;
      })
    },
    updateCustomer(e) {
      if(!this.customers.name || !this.customers.phone || !this.customers.email){
        console.log("请添加对应的信息!");
      }else{
        let updateCustomer = {
          name:this.customers.name,
          phone:this.customers.phone,
          email:this.customers.email,
        };
        this.$http.put("http://localhost:3000/users/"+this.$route.params.id,updateCustomer).then(function(response){
          alert('更新成功!');
          this.$router.push({
            path:'/about'
          })
        })
        e.preventDefault();
      }
      e.preventDefault();
    }
  },
  created(){ //页面创建的时候 就会把传来的id 发给 fetchCustomer 这个函数的参数
    this.fetchCustomer(this.$route.params.id);
  }
};
</script  

<!-- Add "scoped" attribute to limit CSS to this component only --  
<style scoped  
.add {
  margin-left: 175px;
}
</style  
```

