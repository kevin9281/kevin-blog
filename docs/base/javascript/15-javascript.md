---
title: 15.Promise
---

## Promise

Promise 将异步操作队列化，按照期望的顺序执行，返回符合预期的结果。可以通过链式调用多个`Promise`达到我们的目的。

Promise 在各种开源库中已经实现，现在标准化后被浏览器默认支持。

## 问题探讨

下面我们来看一个发送多个异步请求，且每个请求依赖前一个请求的结果，这种业务代码的实现。

## 回调地狱

传统异步请求需要嵌套大量异步操作

```text
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

<script>
  let user;
  $.get("https://api.github.com/users", users => {
    user = users[0].login;
    console.log(user);
    $.get(`https://api.github.com/users/${user}/repos`, repos => {
      console.log(repos);
    });
  });
</script>
```

## 生成器处理

使用生成器解决上面的问题

```text
//任务管理器
function task(generator) {
  const iterator = generator();
  let result = iterator.next();
  function run() {
    if (result.done === false) {
      result.value(function(data) {
        result = iterator.next(data);
        console.log(data);
        run();
      });
    }
  }
  run();
}

//执行任务队列
task(function*() {
  yield callback => {
    //异步操作
    setTimeout(() => {
      callback(1);
    }, 2000);
  };
  yield callback => {
    //异步操作
    setTimeout(() => {
      callback(2);
    }, 1000);
  };
});
```

## promise

下面使用支持`promise` 的库 `axios` 实现后的效果，是不是简洁清晰了很多。

```text
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
  let promise = axios.get("https://api.github.com/users");
  promise
    .then(response => {
      let user = response.data[0].login;
      return axios.get(`https://api.github.com/users/${user}/repos`);
    })
    .then(response => {
      console.log(response.data);
    });
</script>
```

## 使用起步

Promise 可以理解为承诺，就像我们去KFC点餐服务员给我们一引取餐票，这就是承诺。如果餐做好了叫我们这就 就是成功，如果没有办法给我们做出食物这就是失败。

## 状态说明

Promise包含三种状态

- `pending` 指初始状态，初始化Promise时状态
- `resolve` 指操作成功将状态设置为`fulfilled`
- `reject` 指操作失败将状态设置为`rejected`

## 基本使用

下面是异步请求随机获取名小于六位字符的名子

```text
//随机获取名小于六位字符的名子
function username(resolve, reject) {
  const names = ["houdunren", "hdcms"];
  let pos = Math.floor(Math.random() * names.length);
  setTimeout(() => {
    let username = names[pos];
    if (username.length < 6) {
      resolve(username);
    } else {
      reject(username);
    }
  }, 1000);
}
let promise = new Promise(username);
promise.then(
  msg => {
    console.log(`取名成功：${msg}`);
  },
  msg => {
    console.error(`取名失败：${msg}`);
  }
);
```

理论上调用`resolve`与`reject`后`Promise`即执行完成，所以`resolve`后面的语句不应该执行，所以可以在前面加上`return`。

```text
let promise = new Promise((resolve, reject) => {
  resolve("Promise Done");
  console.log("这里不应该执行");
});
promise
  .then(msg => {
    console.log(msg);
  })
  .catch(msg => {
    console.error(msg);
  });
```

## then

- `resolved`状态执行的回调函数，即`return`具体值或调用`resolve`时，使用`then`来处理成功的回调函数
- `rejected`状态执行的回调函数，调用`reject`函数时为失败状态，使用`catch`处理失败的回调函数

下面来体验各种状态

```text
const promise = new Promise((resolve, reject) => {
  resolve("Promise Begin");
});

promise.then(msg => {
  console.log(msg); //Promise Begin
  return "hdcms";
})
.then(msg => {
  return new Promise((resolve, reject) => {
    resolve(`接收值：${msg}，成功状态`); //接收值：hdcms，成功状态
  });
})
.then(msg => {
  console.log(`${msg}`);
  return new Promise((resolve, reject) => {
    reject(`失败状态`); //
  });
})
.catch(msg => {
  console.log(msg); //失败状态
});
```

## catch

catch用于失败状态的处理

```text
const promise = new Promise((resolve, reject) => {
  reject(new Error("Notice: Promise Exception"));
}).catch(msg => {
  console.error(msg);
});
```

错误要交给`catch`处理而不是在`then`中完成，下面是处理是错误的示范

```text
const promise = new Promise((resolve, reject) => {
  resolve("hdcms");
}).then(result => {
  if (result == "hodunren") {
    console.log(`操作成功`);
  } else {
    console.log(`操作失败`);
  }
});
```

## finally

无论状态是`resolve` 或 `reject` 都会执行此动作。

```text
const promise = new Promise((resolve, reject) => {
  reject("hdcms");
})
  .then(msg => {
    console.log("resolve");
  })
  .catch(msg => {
    console.log("reject");
  })
  .finally(() => {
    console.log("resolve/reject状态都会执行");
  });
```

## 应用技巧

所以 `promise` 把执行代码和处理结果代码分开，类似于上面的点餐操作。

## 链式操作

如果`then`返回的是一个`Promise`对象，就可以采用链式写法，之后的`then`处理前一个`then`返回的`Promise`状态。

下面是对获取到的名子前添加`后盾人-`

```text
//随机获取名小于六位字符的名子
function username() {
  return new Promise((resolve, reject) => {
    const names = ["houdunren", "hdcms"];
    let pos = Math.floor(Math.random() * names.length);
    setTimeout(() => {
      let username = names[pos];
      if (username.length < 6) {
        resolve(username);
      } else {
        reject(username);
      }
    }, 1000);
  });
}
function addStr(username) {
  return new Promise((resolve, reject) => {
    resolve(` 后盾人-${username}`);
  });
}
let promise = new Promise((resolve, reject) => resolve());
promise
  .then(username)
  .then(addStr)
  .then(msg => console.log(`操作成功:${msg}`))
  .catch(msg => {
    console.log(`操作失败: ${msg}`);
  });
```

## 并行异步

使用`Promise.all` 方法可以同时执行多个异步操作，比如同进获取课程列表与推荐课程场景

- 任意Promise失败时执行`catch`方法
- 适用于一次发送多个异步操作
- 参数必须是可以迭代的如Array/Set
- 成功后返回Promise结果的有序数组

下例中把参数换成可迭代对象 `new Set().add(hdcms).add(houdunren)` 也是可以的

下例中`hdcms/houdunren`两个Promise状态都为`fulfilled`时，hd状态才为`fulfilled`。

```text
const hdcms = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第一个Promise");
  }, 1000);
});
const houdunren = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第二个异步");
  }, 1000);
});
const hd = Promise.all([hdcms, houdunren])
  .then(results => {
    console.log(results);
  })
  .catch(msg => {
    console.log(msg);
  });
```

## 容错异步

使用`Promise.race()` 处理容错异步，和`race`单词一样哪个Promise快用哪个，比如使用多个接口获取用户资料，哪个先返回用哪个。

- 以最快返回的为准
- 如果最快返加的状态为`rejected` 那整个`promise`为`rejected`执行cache

下面将第一次请求的异步时间调整为两秒，这时第二个先返回就用第二人。

```text
const hdcms = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第一个Promise");
  }, 2000);
});
const houdunren = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("第二个异步");
  }, 1000);
});
Promise.race([hdcms, houdunren])
  .then(results => {
    console.log(results);
  })
  .catch(msg => {
    console.log(msg);
  });
```

## Promise.any

与`Promise.race` 很像但不同是只要有一个状态为`rejected`整个`Promise`即为`rejected`。