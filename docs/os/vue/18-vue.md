---
title: vue vuex

---

## 说明

每一个 Vuex 应用的核心就是 store（仓库）



##  State

```
存放公共数据的地方
```



## Getter

```
vuex 中的计算属性 
```



## Mutation

```
定义同步方法
提交 Mutation 才能改变 State 里面公共数据 
页面通过 commit 使用
```



## Action

```
定义异步方法  类似于 Mutation 
Action 可以进行异步的操作 而Mutation 只能进行同步的操作
Action 利用异步操作改变 State
页面通过 dispatch 使用
```



## Module





## 简单实用方式-1

```
1. 在store / index.js 在创建store仓库

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    // vuex 所有mutations里面都默认获取state形参
    add(state) {
      state.count++
    },
    decrease(state) {
      state.count--
    }
  },
  actions: {
    delayAdd(context) {
      setTimeout(() => {
        context.commit('add') // 通过commit 触发 add 事件
      },1000)
    }
  },
  modules: {}
})

2. 在页面 computed 计算属性中使用

export default {
  // 计算属性能及时监听vuex的变化 来显示在视图里面
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
}

<h5>vuex <span style="color:red">{{count}}</span></h5>
```



## 简单使用方式-2

```
在页面中如果有多个vuex里面的数据要使用的话 就在mapState这个辅助函数里面写 : 

import { mapState } from "vuex";

export default {
  computed: mapState({
    count: "count",
  }),
```

```
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      count: "count"
    })
  },
```



## 触发改变 state

```
1. 通过 commit 触发 mutations

<button @click="add">增加</button>
<button @click="decrease">减少</button>

  methods: {
    add(){
      this.$store.commit('add')
    },
    decrease(){
      this.$store.commit('decrease')
    },
  }
```

```
2. 触发 actions 通过 dispatch 触发

<button @click="delayAdd">过一秒后增加</button>

    delayAdd(){
      this.$store.dispatch('delayAdd')
    }
```



## 使用 Getters

```
1. 先在 store / index.js 中定义

  getters:{
    doubleCount(state){
      return state.count * 2
    }
  },

2. 在页面中使用 

  computed: {
    doubleCount(){
      return this.$store.getters.doubleCount
    }
  },
  
<h5>Getters<span style="color:blue">{{doubleCount}}</span></h5>

页面中 add 增加改变 count 那么getters里面的 count就*2
```



## 模块化 分开优化

```
1. 在 store 下创建 text.js // 数据模块 添加 减少

export default {
  state: {
    count: 0,
  },
  getters:{
    doubleCount(state){
      return state.count * 2
    }
  },
  mutations: {
    // vuex 所有mutations里面都默认获取state形参
    add(state) {
      state.count++
    },
    decrease(state) {
      state.count--
    }
  },
  actions: {
    delayAdd(context) {
      setTimeout(() => {
        context.commit('add') // 通过commit 触发 add 事件
      },1000)
    }
  },
}

2. 然后在 store / index.js 中引入 导出

import Vue from 'vue'
import Vuex from 'vuex'
import text from './text'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    text
  }
})

3. 页面中 使用箭头函数形式使用辅助函数

import { mapState } from "vuex";

  computed: {
    ...mapState({
      count: state => state.text.count
    }),
  },

模块化 各自模块 负责各个部分的开发
```



