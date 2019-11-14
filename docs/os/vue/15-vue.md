---
title: vue 组件间传参

---



## 1.父给子

### 原理

```
vue当中子组件无权直接访问父组件数据
1:父组件内数据 tasks
2:在子组件中定义属性 props:['tasks'] 自定义的
3:父组件用冒号语法将data中的属性绑定到子元素  

```

  

![image11](https://raw.githubusercontent.com/kevin9281/-/master/parent to child.png)

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="js/vue.js"></script>
</head>
<body>

<template id="tplTodoAdd"> <!-- html片段 -->
	<div>
		<input><button>添加</button>
	</div>
</template>
<script>
var todoAdd={/* 赋值给todoAdd */
		template:"#tplTodoAdd" /* html片段 */
	}
</script>

<template id="tplTodoItem">
		<li>{{i+1}} - {{task}}</li>
	</template>
	<script>
	var todoItem={
			template:"#tplTodoItem",
			props:["task","i"] //props:内的对象是两用 //对外:父组件可绑定数据 
			//对内:data:{task:XX,i:XX}
		}
	</script>

<template id="tplTodoList">
	<ul>
		<todo-item v-for="(task,i) of tasks" :task="task" :i="i"></todo-item>
	</ul>
</template>
<script>
var todoList={ //赋值给todoList
		template:"#tplTodoList", //id为tplTodoList的html片段
		props:["tasks"], //对外:父组件可绑定数据
		//对内:相当于data:{tasks}
		components:{ //里面放组件名/标签名
			todoItem //Vue会自动转为todo-item
		}
	}
</script>

<template id="tplTodo"> <!-- html片段 -->
		<div> <!-- 此处必须有一个共同的父元素包裹 -->
			<h1>待办事项列表</h1>
			<todo-add></todo-add>
			<todo-list :tasks="tasks"></todo-list>
		</div>
	</template>
	<script> /* 封装一个名为todo的组件 模板指向上方template里面的div */
		Vue.component("todo",{
			template:"#tplTodo", /* template 等于html片段模板 */
			data:function () {
				return { //data
					tasks:["吃饭","睡觉","打亮亮"]
				}
			},
			components:{
				todoAdd, //Vue简化会自动转为todo-add
				todoList	//Vue简化会自动转为todo-list
			}
		})
	</script>

<div id="app"><!-- 主界面 -->
	<todo></todo>
</div>

<script> /* 空的用来监控#app */
	var vm = new Vue({
		el:"#app",
		data:{}
	})
</script>
</body>
</html>

```



## 2. 子给父

### 原理

```
1: 在父组件中给子组件绑定一个事件 @按铃="方法名()"
2: 父组件methods:{  方法名(实参){ } }
3: 给子组件一个触发事件 this.$emit("按铃",实参)
```

  





![img222](https://raw.githubusercontent.com/kevin9281/-/master/子 to 父.png)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="js/vue.js"></script>
</head>
<body>

<template id="tplTodoAdd">       //  子
  <div>
    <input v-model="new_task"><button @click="add()">添加</button>
  </div>
</template>
<script>
var todoAdd={
  template:"#tplTodoAdd",
  data:function(){
    return { new_task:"" }
  },
  methods:{
    add(){
      this.$emit("add",this.new_task); 
      /* 按钮 给自定义事件add的do_add方法 把当前的new_task传到 do_add方法中的形参*/
      this.new_task="";
    }
  }
}
</script>

<template id="tplTodoItem">    //   子
  <li>{{i+1}} - {{task}} <button @click="remove()">x</button></li>
</template>
<script>
var todoItem={
  template:"#tplTodoItem",
  props:["task","i"],//对外:父组件可绑定数据
  //对内: data:{ task:xx, i:x }
  methods:{
    remove(){
      //告诉爹！要删除第i项 this.$emit('按铃',实参) 当前的 i
      this.$emit("remove",this.i); 
    }
  }
}
</script>

<template id="tplTodoList">     //   父
  <ul>         //@按铃='方法'
    <todo-item @remove="do_remove" v-for="(task,i) of tasks" :task="task" :i="i"></todo-item>
  </ul>
</template>
<script>
var todoList={
  template:"#tplTodoList",
  props:["tasks"],//对外: 父组件可绑定数据
  //对内: 相当于data:{tasks}
  components:{ todoItem },
  methods:{
    do_remove(i){  // 方法(实参)  等待子组件传过来然后处理 
      this.tasks.splice(i,1);
    }
  }
}
</script>


<template id="tplTodo">    //   父
  <div>
    <h1>待办事项列表</h1>
    <todo-add @add="do_add"></todo-add>
    <todo-list :tasks="tasks"></todo-list>
  </div>
</template>
<script>
Vue.component("todo",{
  template:"#tplTodo",
  data:function(){
    return {//data
      tasks:["吃饭","睡觉","打亮亮"]
    }
  },
  components:{
    todoAdd,//Vue自动转为todo-add
    todoList//Vue自动转为todo-list
  },
  methods:{
    do_add(new_task){  /* 方法do_add 拿到一个新任务 */
      this.tasks.push(new_task); /* 把新任务名追加到自己的任务中去 */
    }
  }
})
</script>

<div id="app">
  <todo></todo>
</div>
<script>
new Vue({
  el:"#app",
  data:{}
})
</script>
</body>
</html>
```

## 3. 漫骆驼参数跳转接收

##### 1:先测试跳转是否正常 是否正常传参

###### 传递参数 this.$router.push("/NewsList?pid=6")

###### 接受参数 var pid = this.$route.query.pid

###### 通常情况下接受参数在 created( )

```
1.编程式跳转
① home.vue
<img src='../../XXX'  @click='jumpNew'/>
② home.vue
jumpNew(){
  this.$router.push("/NewsList?pid=6")
},
③ Newslist.vue
created(){
  console.log(this.$route.query.pid);
},

<button @click="jumpCart" :data-pid="newlist.pid"></button>

methods:{
  jumpCart(e){
  var pid = e.target.dataset.pid;
  console.log(pid);
  this.$router.push("/Cart?pid="+pid);
},
```

```
2. 标签式跳转
① 在循环的下面写下跳转标签再绑定变量
<van-cell v-for="(item,i) in prolist" :key="i">
  <router-link :to="'/Newslist?pid='+item.pid">
   <van-card :price="item.price | keepTwoNum" :desc="item.brand" :title="item.title">
    <img :src='item.img_url' alt="" slot="thumb" class="itemimg"/>
   </van-card>
  </router-link>
</van-cell>
```





##  4.父子组件间传值三种方式

```
父子组件传值
1. props / $emit
2. $parent / children
3. $ref
```

```
1. 先创建项目 创建文件 实现 父子传值 demo
  views / Parent.vue  Children.vue
  
2. 在app.vue 中引入 Parent.vue  

<template>
  <div id="app">
    <m-parent/>
  </div>
</template>


<script>
import MParent from "./views/Parent";

export default {
  components: {
    MParent,
  },
}
</script>

3. 在Parent.vue 中引入 Children.vue

<template>
  <div>
    <h1>Parent</h1>
    <m-children />
  </div>
</template>

<script>
import MChildren from "./Children";

export default {
  components: {
    MChildren
  }
};
</script>
```

**第一种 props / $emit**

**通过props父组件传递到子组件**

```
1. 通过绑定属性实现父组件传递到子组件 <m-children :msg="'from Parent msg'"></m-children>
:msg 相当于使用 v-bind:msg="'from Parent msg'" 赋值的是一个变量存储值 可以在子组件调用
```

```
2. 使用props 接收父组件传来的值
<script>
export default {
  props: {
    msg: {  // 定义一个数据
      type: String, // 定义类型
      default: "" //默认值
    }
  }
};
</script>
```

**通过自定义事件 子组件传递到父组件**

```
1. 在子组件中写上 button 并绑定事件

<button @click="passMsg">揍你!</button>

  methods: {
    passMsg() {
      this.$emit('showMsg','i am from Children')
    }
  },
```

```
2. 在父组件中接收

<m-children @showMsg="showMsg"></m-children>  // 自定义事件

export default {
  data() {
    return {
      msg: ""  // 在父组件中接收 也必须要先在data中给初始值定义
    }
  },
  components: {
    MChildren
  },
  methods: {
    showMsg(val) {  // 此方法showMsg 就是子组件中的第一个参数 val 就是子组件中的第二个参数
      this.msg = val
    }
  },
};

然后当在父组件中 点击button 的时候 就会出现
```

**第二种 $parent / children**

**子组件传递给父组件**

```
1. 先在子组件中定义

  data() {
    return {
      childMsg: 'child msg'
    }
  },
  
2. 就可以直接在父组件中获取 同时也可以拿到子组件的方法

 <h3>{{mms}}</h3>
    
  mounted () {
    console.log(this.$children[0].childMsg);
    this.mms = this.$children[0].childMsg
  },
```

**第三种 $ref**

```
1. 在子组件定义

  data() {
    return {
      childMsg: 'child msg'
    }
  },
  
2. 在父组件中 

<m-children ref="children"></m-children>

  mounted() {
    console.log("ref", this.$refs.children);
  }

```

## 5.非父子组件传值的方式

**1.通过事件总线**

```
通过事件总线 进行非父子间传值
// 原理上就是建立一个公共的js文件 , 专门用来传递消息
// bus.js
import Vue from 'vue'
export default new Vue

// 在需要传递消息的地方引入
import bus from './bus.js'
// 传递消息
bus.$emit('msg',val)
// 接收消息
bus.$emit('msg',val => {
	console.log(val)
})
```

```
1. 先在 src目录下 创建 util工具类文件夹 然后创建 bus.js 文件

import Vue from 'vue'

export default new Vue

2. 然后在 需要传递的两个组件 都引入 bus.js 
import bus from './util/bus.js'  

3. 然后就可以在传值的组件中 使用一个事件绑定 

<button @click="passMsg">传你</button>

  methods: {
    passMsg() {
      bus.$emit('msg','i am from App')
    }
  },
  
4. 在接收组件中通过$on 监听这个事件

  mounted() {
    bus.$on("msg", ( val ) => {
      this.childMsg = val
    });
  }
  
  <h5>{{childMsg}}</h5>
```

**2.  attrs / ​listeners **

```
$attrs / $listeners

// 解决多级组件间传值的问题

// 在传值的组件统一传值
// 使用$attrs 传值的话 还需要在 接收值的组件 的 父组件上面绑定 v-bind="$attrs" 属性

// $attrs 将父组件中不包含props的属性传入子组件, 通常配合 interitAttrs 选项一起使用
// $listeners 监听子组件中的数据变化 传递给父组件

// $listeners  包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on=”$listeners” 传入内部组件——在创建更高层次的组件时非常有用。
```

```
1. 现在传值组件中定义数据

export default {
  data() {
    return {
      a: 'msga',
      b: 'msgb',
      c: 'msgc',
      d: 'msgd',
    }
  },
 methods: {
   ev1() {}
  }
}
  
然后利用自定义指令传递过去  传递方法的话 需要在前面加上个 @ 同时在传值组件中定义方法
<m-parent :msg1="a" :msg2="b" :msg3="c" :msg4="d" @event2="ev2"></m-parent>

2. 在接收组件的父组件中 
	<m-children v-bind="$attrs" v-on="$listeners"></m-children>

3. 在接收组件中定义
  mounted() {
    console.log('attrs',this.$attrs);
  }
  
  attrs 
  {msg1: "msga", msg2: "msgb", msg3: "msgc", msg4: "msgd"}
  msg1: "msga"
  msg2: "msgb"
  msg3: "msgc"
  msg4: "msgd"
  __proto__: Object
```

