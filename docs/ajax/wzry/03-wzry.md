---
title: 新建vue请求
---

## 3.vue axios请求



```
1. 安装插件  npm i axios vue-axios
2. 在main.js 中注册引入 让所有组件都可以使用axios库 

	import axios from 'axios'
	import VueAxios from 'vue-axios'
	Vue.use(VueAxios,axios)
	Vue.prototype.$axios = axios;
```



**axios Get请求**

```
<template>
  <div class="hello">
    <div v-for="(item,index) in content" :key="index">{{ item.username }}</div>
    <br />
    <h1>{{ mox.title }}</h1>
    <br>
    <ul>
      <li v-for="(titles,index) in title" :key="'id-'+index">
        <span>{{ titles.title }}</span>
        <p v-if="titles.completed">{{ titles.completed }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      content: [],
      title: [],
      mox:''
    };
  },
  mounted() {
    this.axios.get("http://localhost:3000/users").then(res => {
      this.content = res.data;
      // console.log(content);
    });
    this.axios.get("http://jsonplaceholder.typicode.com/todos").then(res => {
      this.title = res.data;
      // console.log(this.title);
    });
    // 获取一条 id = 1 的数据
    this.axios.get("http://jsonplaceholder.typicode.com/todos/1").then(res => {
      this.mox = res.data;
      // console.log(res.data);
    });
  }
};
</script>


```



**Post请求**

```
<template>
  <div class="hello">
    <h1>Axios请求</h1>
    <div id="vue-app">
      <form @submit.prevent="onSubmit">
        <input type="text" v-model="todo.title" />
        <input type="checkbox" v-model="todo.completed" />
        <input type="submit" value="提交" />
      </form>
    </div>
    <br />
    <ul>
      <li v-for="(titles,index) in title" :key="'id-'+index">
        <span>{{ titles.title }}</span>
        <p v-if="titles.completed">{{ titles.completed }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      content: [],
      title: [],
      mox: "",
      todo: {
        title: "",
        completed: false //单选框
      }
    };
  },
  mounted() {
    this.axios.get("http://jsonplaceholder.typicode.com/todos").then(res => {
      this.title = res.data;
      // console.log(this.title);
    });
  },

  methods: {
    onSubmit() {
      this.axios
        .post("http://jsonplaceholder.typicode.com/todos", this.todo)
        .then(res => {
          // console.log(res.data);
          this.title.unshift(res.data); // 末尾添加
        });
    }
  }
};
</script>


```

