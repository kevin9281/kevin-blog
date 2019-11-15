---
title: 14.生成器
---

## 生成器

生成器是返回遍历器的函数

- 调用一个生成器会返回一个迭代器，然后向生成器取值
- 全部代码执行完成，或遇到`return`时生成器执行完毕
- 学习生成器前需要掌握前面章节的迭代器

##  (http://houdunren.gitee.io/note/js/13 生成器.html#原始实现)原始实现

下面使用以往掌握的知识实现生成器，有助于更好的理解生成器。

```text
function generator(arr) {
  let i = 0;
  return {
    next() {
      let done = arr.length >= i;
      return {
        value: arr[i++],
        done: done
      };
    }
  };
}
let gen = new generator([1, 2, 3]);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#声明定义)声明定义

- `*` 可以挨着`function* hd()`或中间留空格`function * hd()`
- yied 关键字指调用迭代器的`next()` 函数的返回值
- yield类似return都是返回值，但return停止函数执行，yield是暂停停止函数
- 每执行一次`yield` 后函数即暂停
- 没有可迭代数据时返回值为 {value:undefined,done:true}

```text
function* hd() {
  yield "hdcms";
  yield "houdunren";
}
generator = hd();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

下面使用函数表达式创建生成器并迭代数组

```text
const hd = function*(arr) {
  do {
    yield arr.shift();
  } while (arr.length != 0);
}
generator = hd([1, 2, 3]);
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

对象方法中使用时，在函数前加上`*`即可以。

```text
const hd = {
  data: [],
  *generator() {
    for (let i = 0; i < this.data.length; i++) {
      yield this.data[i];
    }
  }
};
hd.data = ["houdunren", "hdcms"];
const iterator = hd.generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#基本操作)基本操作

操作调用生成器后生成的迭代器

```text
function* generator() {
  yield "后盾人";
  yield "houdunren.com";
}

const iterator = generator();
console.log(iterator.next()); //{value: "后盾人", done: false}
console.log(iterator.next()); //{value: "houdunren.com", done: false}
console.log(iterator.next()); //{value: undefined, done: true}
```

使用`for/of` 对迭代器进行迭代，获取生成器的值

```text
for (const value of generator()) {
  console.log(value);
}
```

使用`whilte` 获取生成器值

```text
while (!(item = iterator.next()).done) {
  let { value, done } = item;
  console.log(value, done);
}
```

生成器嵌套

```text
function* generator() {
  yield "后盾人";
  yield* hd();
  yield "houdunren.com";
}
function* hd() {
  yield "hdcms";
}
const iterator = generator();
console.log(iterator.next()); //{value: "后盾人", done: false}
console.log(iterator.next()); //{value: "hdcms", done: false}
console.log(iterator.next()); //{value: "houdunren.com", done: false}
```

使用生成器创建编号

```text
function* randomNum() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const iterator = randomNum();
console.log(iterator.next().value); //0
console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
```

遍历DOM树

```text
function* treeDom(elem) {
  yield elem;
  elem = elem.firstElementChild;
  while (elem) {
    yield* treeDom(elem);
    elem = elem.nextElementSibling;
  }
}
const subTree = treeDom(document.body);
for (const iterator of subTree) {
  console.log(iterator.nodeName);
}
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#遍历数组)遍历数组

```text
function* generator(arr) {
  for (const iterator of arr) {
    yield iterator;
  }
}
let gen = generator([5, 3, 2, 6]);
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#迭代对象)迭代对象

默认情况下对象是不可以迭代的，当添加`[Symbol.iterator]`生成品后，就会变为可迭代对象。

```text
let object = {
  data: [],
  *[Symbol.iterator]() {
    for (const iterator of this.data) {
      yield iterator;
    }
  },
  push(item) {
    this.data.push(item);
  }
};
object.push("hdcms");
object.push("houdunren");
for (const iterator of object) {
  console.log(iterator);
}
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#参数传递)参数传递

如果向`next()` 函数传递参数将替换`yield`的返回值

- 第一次调用`next` 传递参数无效

下例中的`next("hdcms")` 就是向第一次的等待的 `let res=...` 值入了值。

```text
function* hd(arg) {
  let res = yield "is" + arg;
  yield res;
}
const generator = hd("houdunren");
console.log(generator.next()); //{value: "ishoudunren", done: false}
console.log(generator.next("hdcms")); //{value: "hdcms", done: false}
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#返回语句)返回语句

当生成器函数执行完毕或遇到`return`时 `done` 为 true

```text
function* hd() {
  yield 1;
  return;
  yield 2;
}
const generator = hd();
console.log(generator.next()); //{value: 1, done: false}
console.log(generator.next("hdcms")); //{value: undefined, done: true}
```

return值会为最后返回的 `value` 值

```text
function* hd() {
  yield 1;
  yield 2;
  return 5;
}
const generator = hd();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next()); //{value: 5, done: true}
```

##  (http://houdunren.gitee.io/note/js/13 生成器.html#异步执行)异步执行

生成器最主要的应用特性是异步操作，因为 `next` 特性是等待操作非常适合异步处理。

下面是取得指定用户最小点赞数的项目

> 后面章节的 `promise` 处理异步更加方便

```text
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  function request(url) {
    axios.get(url).then(response => generator.next(response.data));
  }
  // 取得点赞最小的库;
  function* repos(username) {
    //获取所有库
    let repos = yield request(
      `https://api.github.com/users/${username}/repos`
    );

    repos = repos.sort((a, b) => a.stargazers_count - b.stargazers_count);
    //获取用户资料
    user = yield request(`https://api.github.com/users/${username}`);

    console.log({
      name: user["name"],
      repos: repos[0]["name"],
      star: repos[0]["stargazers_count"]
    });
  }

  const generator = repos("houdunwang");
  generator.next();
</script>
```