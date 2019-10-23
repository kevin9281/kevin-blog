---
title: tapable AsyncHook 异步钩子
---

## tapable AsyncHook 异步钩子

## AsyncParallelHook

>  AsyncParallelHook 为异步并行执行，通过 tapAsync 注册的事件，通过 callAsync 触发，通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）

>  1.start.js

```
let {AsyncParallelHook } = require('tapable');
//异步的钩子 (串行) (并行) 需要等待所有并发的异步时间执行后在执行回调方法
// 同时发送多个请求
//注册方法 分为 tap注册 tapAsync注册
class Lesson {
  constructor(){
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook (['name']),
    }
  }
  tap(){  //注册 监听函数
    this.hooks.arch.tapAsync('node', (name,cb) => {
      setTimeout(() => {
        console.log('node',name);
        cb();
      }, 1000);
    });
    this.hooks.arch.tapAsync('react', (name,cb) => {
      setTimeout(() => {
        console.log('node',name);
        cb();
      }, 1000);
    });
  }
  start(){
    this.hooks.arch.callAsync('jw',function ( ) {
      console.log('end');
    });
  }
}
let l = new Lesson();
l.tap();   //注册这两个时间
l.start(); //启动钩子
```

>  2.case.js

```
class AsyncParallelHook {
  constructor(args){    //args => ['name]
  this.tasks = [];
  }
  tapAsync(name,task){ 
    this.tasks.push(task);
  }
  callAsync(...args){
    let finalCallback = args.pop();  //拿出最终的函数
    let index = 0;
    let done = () => { //Prommmise.all
      index++;
      if(index == this.tasks.length) {
        finalCallback();
      }
    }
    this.tasks.forEach(task=>{
      task(...args,done);
    })
  }
}

let hook = new AsyncParallelHook(['name']);
let total = 0;
hook.tapAsync('react',function(name,cb){
  setTimeout(() => {
    console.log('react',name);
    cb();
  }, 1000);
});
hook.tapAsync('node',function(name,cb){
  setTimeout(() => {
    console.log('node',name);
    cb();
  }, 1000);
});

hook.callAsync('jw',function () {
  console.log('end');
});
```