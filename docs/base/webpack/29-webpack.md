---
title: tapable SyncHook 同步钩子
---

## tapable SyncHook 同步钩子

##  tapable 介绍

>  Webpack 本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是 tapable，Webpack 中最核心的，负责编译的 Compiler 和负责创建 bundles 的 Compilation 都是 tapable 构造函数的实例。打开 Webpack 4.0 的源码中一定会看到下面这些以 Sync、Async 开头，以 Hook 结尾的方法，这些都是 tapable 核心库的类，为我们提供不同的事件流执行机制，我们称为 “钩子”。

>  上面的实现事件流机制的 “钩子” 大方向可以分为两个类别，“同步” 和 “异步”，“异步” 又分为两个类别，“并行” 和 “串行”，而 “同步” 的钩子都是串行的。

>  安装模块

```
yarn add tapable
```

>  SyncHook 为串行同步执行，不关心事件处理函数的返回值，在触发事件之后，会按照事件注册的先后顺序执行所有的事件处理函数。

>  创建根目录 1.start.js

```
let {SyncHook} = require('tapable');

class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncHook(['name']),
    }
  }
  tap(){  //注册 监听函数
    this.hooks.arch.tap('node',function (name) {
      console.log('node',name)
    });
    this.hooks.arch.tap('react',function (name) {
      console.log('react',name)
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();   //注册这两个时间
l.start(); //启动钩子
```

>  创建根目录 2.case.js

```
class SyncHook {
  constructor(args){    //args => ['name]
  this.tasks = [];
  }
  tap(name,task){ 
    this.tasks.push(task);
  }
  call(...args){
    this.tasks.forEach((task)=> task(...args));
  }
}

let hook = new SyncHook(['name']);
hook.tap('react',function(name){
  console.log('react',name);
});
hook.tap('node',function(name){
  console.log('node',name);
});
hook.call('jw');

```

>  webpack.config,js

```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode:'production',
  entry:{  //多入口
    index:'./src/index.js'
  },
  devServer:{
    hot:true, //启用热更新
    port:3000,
    open:true,
    contentBase:'./dist'
  },
  module:{
    noParse:/jquery/,   //可以不去解析某些包 不去解析jquery中的依赖库
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,  //排除
        include:path.resolve('src'),  //包含
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new webpack.NamedModulesPlugin(), //打印更新的模块路径 告诉我们哪个模块更新
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    //从moment 中如果引入了 .locale 就忽略掉不打包 节省空间
    new HtmlWebpackPlugin({
      template:'./public/index.html'
    })
  ]
}
```

##  SyncBailHook

>  SyncBailHook 同样为串行同步执行，如果事件处理函数执行时有一个返回值不为空（即返回值为 undefined），则跳过剩下未执行的事件处理函数（如类的名字，意义在于保险）。


>  1.start.js

```
let {SyncBailHook} = require('tapable');

class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncBailHook(['name']),
    }
  }
  tap(){  //注册 监听函数
    this.hooks.arch.tap('node',function (name) {
      console.log('node',name);
      return '想停止学习'
      //return undefined 
      //只要有任何一个监听函数 返回一个非 undefined 结果 那么就停止继续执行
    });
    this.hooks.arch.tap('react',function (name) {
      console.log('react',name)
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();   //注册这两个时间
l.start(); //启动钩子
```

>  2.case.js

```
class SyncBailHook {
  constructor(args){    //args => ['name]
  this.tasks = [];
  }
  tap(name,task){ 
    this.tasks.push(task);
  }
  call(...args){
    let ret;   //当前这个函数的返回值
    let index = 0; //当前要执行第一个
    do{
      ret = this.tasks[index++](...args)
    }while(ret === undefined && index < this.tasks.length);
  }
}

let hook = new SyncBailHook(['name']);
hook.tap('react',function(name){
  console.log('react',name);
  return '停止向下执行'
  //只要有任何一个监听函数 返回一个非 undefined 结果 那么就停止继续执行
});
hook.tap('node',function(name){
  console.log('node',name);
});
hook.call('jw');
```

##  SyncWaterfallHook

>  SyncWaterfallHook 为串行同步执行，上一个事件处理函数的返回值作为参数传递给下一个事件处理函数，依次类推，正因如此，只有第一个事件处理函数的参数可以通过 call传递，而 call 的返回值为最后一个事件处理函数的返回值。

>  1.start.js

```
let {SyncWaterfallHook } = require('tapable');
//Waterfall 瀑布
class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncWaterfallHook (['name']),
    }
  }
  tap(){  //注册 监听函数
    this.hooks.arch.tap('node',function (name) {
      console.log('node',name);
      return 'node学得还不错'
    });
    this.hooks.arch.tap('react',function (data) {
      console.log('react',data)
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();   //注册这两个时间
l.start(); //启动钩子
```

>  2.case.js

```
class SyncWaterfallHook {
  constructor(args){    //args => ['name]
  this.tasks = [];
  }
  tap(name,task){ 
    this.tasks.push(task);
  }
  call(...args){
    let [first,...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a,b)=>{
      return b(a);
    },ret);
  }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react',function(name){
  console.log('react',name);
  return 'reactOk'
});
hook.tap('node',function(data){
  console.log('node',data);
  return 'node Ok'
});
hook.tap('webpack',function(data){
  console.log('node',data);
});
hook.call('jw');
```

##  SyncLoopHook

>   SyncLoopHook 为串行同步执行，事件处理函数返回 true 表示继续循环，即循环执行当前事件处理函数，返回 undefined 表示结束循环，SyncLoopHook 与 SyncBailHook 的循环不同，SyncBailHook 只决定是否继续向下执行后面的事件处理函数，而 SyncLoopHook 的循环是指循环执行每一个事件处理函数，直到返回 undefined 为止，才会继续向下执行其他事件处理函数，执行机制同理。

>  1.start.js

```
let {SyncLoopHook } = require('tapable');
//同步遇到某个不返回undefined的监听函数会多次执行
class Lesson {
  constructor(){
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook (['name']),
    }
  }
  tap(){  //注册 监听函数
    this.hooks.arch.tap('node', (name) => {
      console.log('node',name);
      return ++this.index === 3? undefined : '继续学'
    });
    this.hooks.arch.tap('react', (data) => {
      console.log('react',data)
    });
  }
  start(){
    this.hooks.arch.call('jw');
  }
}
let l = new Lesson();
l.tap();   //注册这两个时间
l.start(); //启动钩子

```


>  2.case.js

```
class SyncLoopHook {
  constructor(args){    //args => ['name]
  this.tasks = [];
  }
  tap(name,task){ 
    this.tasks.push(task);
  }
  call(...args){
    this.tasks.forEach(task=>{
      let ret;
      do{
        ret = task(...args)
      } while (ret!=undefined)
    })
  }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react',function(name){
  console.log('react',name);
  return ++total == 3? undefined : '继续学'
});
hook.tap('node',function(name){
  console.log('node',name);
});
hook.tap('webpack',function(name){
  console.log('webpack',name);
});
hook.call('jw');

```