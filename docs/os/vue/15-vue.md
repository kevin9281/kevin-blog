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

