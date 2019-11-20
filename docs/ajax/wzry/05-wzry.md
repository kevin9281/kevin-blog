---
title: 跨域
---

## 5.跨域

```
1. 先写个服务端 
 1.1 npm init -y
 1.2 npm add koa
 1.3 touch app.js
 
2. app.js

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} url:${ctx.request.url}`);
  await next();
})

app.use((ctx) => {
  ctx.body = {
    user:{
      name:"mox",
      url:"https://docs.yankb.top"
    }
  }
})

app.listen(3000);

// nodemon app.js 启动

3.vue create xx 


```

```
1. 配置代理 devServer.proxy

module.exports = {
  devServer: {
    proxy: { // 配置代理 将api 代理到 这个target 这个服务器
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

2. <template>
  <div id="app">
    <template v-if="user">
      <h1>{{user.name}}</h1>
      <a :href="user.url" >点击跳转1</a>
      <span class="a-inner" @click="jump">
        <i class="el-icon-document"></i>
        点击跳转2
      </span>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  methods:{
    jump(){
      window.location.href = 'http://www.baidu.com'; 
    }
  },
  mounted() {
    // fetch 请求
    const url = "/api/user";
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
      });
    // axios 请求
    this.axios.get("/api/user").then(res => {
      this.user = res.data.user;
      console.log(res.data.user);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
</style>

```

