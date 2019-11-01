---
title: Vue cors express 
---

## 1.选型  
> element + node.js  后台博客管理系统

> element 是个 vue.js 的组件 很多后台的组件

> element 重要的是个 Table 表格 可以做表格查看

> 前端使用vue 开发 后端使用 node.js express+mogodb的形式对接数据  

## 2.开始创建vue  
> 创建vue   
```vue create element-admin```  

> 选择手动 Manually select features  
> 先选择Babel Router Linter / Formatter  

> 是否启用 history mode(地址栏不加#号形式, 默认加#号的形式)  
选择加#号 选N  

> es6的格式化 报错警告  
>选择最基础的  
```ESLint with error prevention only```  
```Lint on save```  
```In dedicated config files```  
最后一个直接确认


> 此项目为了方便 直接在总文件夹下创建了后端server文件夹 然后所有依赖都写在了根目录下的package.json  

## 3.使用element组件  
> 输入  
```vue add element ```  


> 完全引用  
```Fully import```  


> Do you wish to overwrite Element's SCSS variables?  
``` NO ```  


> 使用中文  
``` zh-CN ```  


> 完成引入 运行  
``` npm run serve ```


> 复制官网内的组件 布局容器 https://element.eleme.cn/#/zh-CN/component/container  
> 删掉多余的不需要的  
> 然后把 ```<el-container>```容器高度改为 100vh表示当前页面容器高度 100%  


> 给body 加个 padding:0 margin:0 不要边距 全屏撑满  


> 在官网icon 图标内 可以查看到element提供的图标  
> 然后复制图标下面的英文名称 然后更改 i 标签的 class为英文名称即可更改图标  


> ```<el-submenu></el-submenu>``` 标签里面可以用 ```<el-menu-item></el-menu-item>``` 标签  


```<el-menu router> ``` 标签里面还可以使用路由  
> 可以给此标签里面加个 router参数  
> 然后 里面的 ```<el-menu-item>``` 就可以添加路由指向 直接添加在index属性里面即可跳转  
```<el-menu-item index='/posts'>```  

## 4.添加路由  
```
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入vue页面
import CreateArticle from   '../views/CreateArticle.vue' 
import ListArticle from '../views/ListArticle.vue'
import EditArticle from '../views/EditArticle.vue'

//vue使用router axios 没有 install 就不需要 vue.use
Vue.use(VueRouter)

//创建路由
const routes = [
  {
    path: '/',  //首页路径
    name: 'home',  //名称
    redirect: '/articles/index' //redirect重定向 把首页指向路径index
  },
  {
    path: '/articles/index',   //路径 文章列表页也是首页
    name: 'list-article', //名称
    component: ListArticle //组件
  },
  {
    path: '/articles/create',  //新建文章页面
    name: 'create-article',
    component: CreateArticle
  },
  {
    path: '/articles/:id/edit',  //編輯文章页面
    name: 'edit-article',
    component: EditArticle
  }
]

//创建 路由 实例化 
const router = new VueRouter({
  routes
})

//导出
export default router
```  

> 在app.vue 首页内容上 直接使用  
``` <router-view></router-view> ``` 此标签的意思是会把 views内的文件里面的vue组件都使用到此处首页展示  

> 就会把 views内的文件都放进来到此处
> 此处因为首页就是重定向到列表页 所以在列表页组件里面写东西 首页使用```<router-view></router-view>``` 标签 就会把内容展示出来  

## 5.新建表单页面  
> element 官网里面 From表单  

> W3C 标准中有如下规定：  
```即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent。```

> 还需要把 ```<el-button>```标签内加上 native-type='submit' 表示这是个提交按钮  

> 在 el-form 写了 :model  
> 在 el-input 内写了v-model   
> 所以表单内写的内容会绑定在属性上 表单输入内容后 这个对象的属性也会跟着改变 
```
<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
```
> 如需要使用到数据 还要先给 :model 的对象 创建个初始化空对象 因为是 :model 所以绑定的是对象  
> 当发送请求的时候然后将得到的数据返回
```
export default {
  data() {
    return {
      article: {}
    };
  },
```  

## 6.列表查询页面  
> 列表查询页面 相当于把所有的展示出来  
```
<template>
  <div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="140"></el-table-column>
      <el-table-column prop="body" label="内容" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- {{scope.row}} 此处的scope 就是我们当前行的数据对象 -->
          <!-- 当编辑 删除的时候 我们只需要拿到_id 就可以操作这个对象 -->
          <el-button @click="show(scope.row._id)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
```

> :data 是绑定的数据 同时需要初始化一个空数组 保存请求后返回的数据 然后再绑定到页面  
```
 export default {
  data(){
    return{
      articles:[]
    }
  },
```

## 7.内容编辑页面  
> 内容编辑页面 是由列表查询页面 经过点击button 编辑 跳转过来 跳转过来 需要带参数 此处是利用created 在页面创建后 立即发送请求 查询数据 返回给页面  

```
<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="goback">取消</el-button>
    </el-form-item>
  </el-form>
</template>
```

> 同时 此处需要数据也要初始化  
```
export default {
  data() {
    return {
      article: {}
    };
  },
```  

## 8.后端接口  
> 首页创建 server / index.js   

> 下载插件  
```npm i express@next mongoose cors```  
> express 创建服务器  
> mongoose 数据库  
> cors 允许跨域  


> 启动服务器   
```nodemon server```  
> 因为node.js 会默认去找如果这是一个文件它就会执行它,如果他是个文件夹 就会找文件夹中的index.js  

> cors 我们的后端接口就允许任意的域名访问 哪怕端口不一样 哪怕主机名不一样都可以 因为我们后端接口启动在 3001 前端界面启动在 8080 所以是不同的域 就会跨域 如果没有cors 就不能被访问的 就出现跨域问题  

```
//展示数据接口get
app.get('/', async (req, res) => {
  res.send('index')
})

//录入数据 由于需要提交使用 post
app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})

//它们两虽然地址一样 但是请求方法不同 所以是不同的接口
//文章列表 由于是显示数据获取数据 使用get
app.get('/api/articles', async(req,res)=>{
  const articles = await Article.find()
  res.send(articles)
})

//删除文章  注意删除用的 article 单数
app.delete("/api/article/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({
      status: true
  });
});

//文章詳情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article);
})

//文章修改 put覆蓋性的修改
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article);
}) 
```

> mongodb启用方法 cmd mongod


> 完整利用 node.js + mongodb 搭建后台   
```
const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json()) // 表示让express识别客户端传来的json

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
})

const Article = mongoose.model('Article', new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
}))

//展示数据接口get
app.get('/', async (req, res) => {
  res.send('index')
})

//录入数据 由于需要提交使用 post
app.post('/api/articles', async (req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})

//它们两虽然地址一样 但是请求方法不同 所以是不同的接口
//文章列表 由于是显示数据获取数据 使用get
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find()
  res.send(articles)
})

//删除文章
app.delete("/api/article/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({
    status: true
  });
});

//文章詳情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.send(article);
})

//文章修改 put覆蓋性的修改
app.put('/api/articles/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send(article);
}) 

app.listen(3001, () => {
  console.log('http://localhost:3001/');
})
```  

## 9.前端调用接口(增)  
> 需要用一个 ajax 的请求库  
>习惯性的我们会用 axios  先安装  
``` npm i axios ```  

> 前端可以用axios 请求接口 后端也同样可以使用 axios   

> 需要在main.js中定义 配置 axios接口请求  
> 在vue 的prototype上添加 axios  
> 创建一个axios实例 同时指定接口和地址是什么  
> 使用axios.create创建一个 axios的请求实例  
> 定义出来之后 为了不重复多次 所以定义到vue的原型上名字由于不希望冲突 所以加个$http  
> 可以在任意的vue页面上 使用 this.$http 访问到这个axios的实例  

``` 
import axios from 'axios'     //引入 axios包

Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3001/api' //把后端接口的根地址放进去
}) 
```  
> 在页面中使用
> 函数内的 this 指向当前调用此函数的对象  
> $http 指: axios的实例  
> 当前调用对象的 axios的 post方法 到 /articles  
这个路径 路径对应的是后端的请求路径 /api/articles  
> 请求方法的第二个参数是 由于是post提交第二个参数就是请求体对象  
> 请求体是在 ```<el-form :model = 'article'>```  
> 请求完了后 有个then 返回响应对象 res  
> res.data 表示响应对象里面的所有数据


```
  methods: {  //Vue实例对象上绑定的方法，供当前Vue组件作用域内使用 未调用不会执行
    saveArticle() { //saveArticle函数
      this.$http.post('/articles',this.article).then(res=>{
        console.log(res.data); //返回值
      })
    }
  }
```

> 当发出请求 会有个OPTIONS请求  
> 这个请求只是尝试去看一下articles这个路径有哪些支持的请求方法  
> 服务端就会告诉他 如果有跨域影响睡眠的就不能请求  
> 然后再发出post请求提交数据   
> Request Payload 就是发出的数据  
> Preview 就是服务端的返回  
> __v表示版本号 __id表示往mongodb里面存的时候会自动添加一个id
> 服务端有返回数据 说明添加成功

> 下面是当点击提交后 vue页面出现文章提交成功 然后跳转到列表页面  
```
export default {
  data() {
    return {
      article: {}
    };
  },
  methods: { //Vue实例对象上绑定的方法，供当前Vue组件作用域内使用 未调用不会执行
    saveArticle() {
      this.$http.post("/articles", this.article).then(res => {
        this.$message({
          message: "文章创建成功",
          type: "success"
        });
        this.$router.push('/articles/index');
        console.log(res.data);
      });
    }
  }
};
</script>
```  

## 10.前端调用接口(查)  
> 同样使用 this.$http 访问到这个axios的实例  
> 当前的articles 发送get请求请求方法不同 虽然路径一样 但是是不同的两个方法  
> 这个路径 路径对应的是后端的请求路径 /api/articles  
> .then返回的 res  
> 把返回的res.data数据 赋值给 当前的 articles 数组完成数据展示



```
<script>
export default {
  data(){
    return{
      articles:[]
    }
  },
  created(){ //页面创建后自动执行
    this.$http.get('articles').then(res=>{
      this.articles = res.data
    })
  }
}
</script>
```  

## 11.前端调用接口(删)  
> 删除 当点击删除时候 触发方法 remove  
> 传入一个形参 id 发送请求  
> 当前的article 对象 的axios 实例 的删除  
> 路径是 后台接口的对应路径 后台是 :id 是传入变量  
> 所以前端需要用ES6 模板字符串  
> 来使用${id} 这个变量(为形参传入的值)  
> 是在绑定点击事件 触发方法 传入的形参
> 返回提示消息栏 然后再查询一次数据 实现刷新  

  
```
methods: {
    remove(id) {
      this.$http.delete(`article/${id}`).then(res => {
        this.$message({
          message: "文章删除成功",
          type: "success"
        });
        this.fetch(); //删除成功后 执行再查询一次数据 实现刷新数据
        console.log(res.data);
      });
    }
  },
}
```   

> 以下完整
```
<script>
export default {
  data() {
    return {
      articles: []
    };
  },
  methods: {
    fetch() {
      //当哪里需要执行数据 查询数据 就直接使用fech就行了
      this.$http.get("articles").then(res => {
        this.articles = res.data;
      });
    },
    edit(id) {
      this.$router.push(`/articles/${id}/edit`)
    },
    remove(id) {
      this.$http.delete(`article/${id}`).then(res => {
        this.$message({
          message: "文章删除成功",
          type: "success"
        });
        this.fetch(); //删除成功后 执行再查询一次数据 实现刷新数据
        console.log(res.data);
      });
    }
  },
  created() {
    //页面创建的时候调用的方法
    this.fetch();
  }
};
</script>
```  

## 12.前端调用接口(改)  
> 当点击编辑的时候 需要带着_id 一起跳转到编辑更改的页面  

```
    edit(id) {
      this.$router.push(`/articles/${id}/edit`)
    },
```  

> 然后在编辑页面 利用put方法 更新 覆盖 实现修改  
> 当前的对象的 axios实例的 put方法  
> 后台接口的路径 当前路由传来的id  
> 第二个参数为本身对象  
> 完成后再跳转首页


```
    saveArticle() {
      this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res => {
        this.$message({
          message: "文章更新成功",
          type: "success"
        });
        this.$router.push('/articles/index');
        console.log(res.data);
      });
    },
```

> 以下完整   
```
<script>
export default {
  data() {
    return {
      article: {}
    };
  },
  methods: {
    saveArticle() {
      this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res => {
        this.$message({
          message: "文章更新成功",
          type: "success"
        });
        this.$router.push('/articles/index');
        console.log(res.data);
      });
    },
    fetch(){
      this.$http.get(`articles/${this.$route.params.id}`).then(res=>{
        this.article = res.data
      })
    },
    goback(){ //跳转上一页
      this.$router.go(-1)
    }
  },
  created(){
    this.fetch()
  },

};
</script>
```



