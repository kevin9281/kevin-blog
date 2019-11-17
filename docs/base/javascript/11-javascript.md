---
title: 11.原型与类
---

## 原型

每个函数都有一个原型`prototype`对象，通过函数创建的对象也将拥有这个原型对象。原型是一个指向对象的指针，类似于面向对象中的class。

- 所有函数的原型默认是 `Object`的实例，所以可以使用`toString/toValues/isPrototypeOf` 等方法的原因
- 使用原型对象为多个对象共享属性或方法
- 如果对象本身不存在属性或方法将到原型上查找
- 使用原型可以解决，通过构建函数创建对象时复制多个函数造成的内存占用问题
- 原型包含 `constructor` 属性，指向构造函数
- 实例对象包含 `__proto__` 属性指向构造函数的原型

![image-20191010023843179](http://houdunren.gitee.io/note/assets/img/image-20191010023843179.58edd59f.png)

## 原型链

通过引用类型的原型，继承另一个引用类型的属性与方法，这也是实现继承的步骤。

![image-20191010012103033](http://houdunren.gitee.io/note/assets/img/image-20191010012103033.3540a960.png)

##  setPrototypeOf & getPrototypeOf

使用`Object.setPrototypeOf` 可设置对象的原型，下面的示例中继承关系为 obj>hd>cms。

`Object.getPrototypeOf` 用于获取一个对象的原型。

```text
let obj = {
  name: "后盾人"
};
let hd = {
  web: "houdunren"
};
let cms = {
  soft: "hdcms"
};
//让obj继承hd
Object.setPrototypeOf(obj, hd);
Object.setPrototypeOf(hd, cms);
console.log(obj.web);
console.log(Object.getPrototypeOf(hd) == cms); //true
```

## 构造函数

下面为 `Stu` 更改了原型为`User` 的实例对象，`lisi`是通过构造函数`Stu`创建的实例对象

- `lisi`在执行`getName` 方法时会从构造函数开始一直向上查找原型，这就是原型链特性
- 当然如果把 `getName` 添加到对象上，就不继续追溯原型链了

```text
"use strict";
function User() {}
User.prototype.getName = function() {
  return this.name;
};

function Stu(name) {
  this.name = name;
}
Stu.prototype = new User();
const lisi = new Stu("李四");

console.log(lisi.__proto__);
console.log(lisi.getName());
```

## instanceof

instanceof 用于检测右边的函数原型是否正在于左侧对象的的原型链上

```text
"use strict";
function User() {}
User.prototype.getName = function() {
  return this.name;
};

function Stu(name) {
  this.name = name;
}
Stu.prototype = new User();
const lisi = new Stu("李四");

console.dir(lisi instanceof Stu); //true
console.dir(lisi instanceof User); //true
```

## 构造函数

构造函数在被`new` 时上下文为对象实例，如果对象中存在方法将执行对象方法，不再原型上查找方法。

```text
function hd() {
  this.show = function() {
    return "show in object";
  };
}
hd.prototype.show = function() {
  return "show in prototype";
};
const obj = new hd();
console.log(obj.show());
```

## 对象原型

对象的原型引用构造函数的原型对象，是在创建对象时确定的，当构造函数原型对象改变时会影响后面的实例对象。

```text
function hd() {}
hd.prototype.name = "hdcms";
const obj1 = new hd();
console.log(obj1.name); //hdcms

hd.prototype = {
  name: "后盾人"
};
const obj2 = new hd();
console.dir(obj2.name); //后盾人
```

## Object.create

创建一个新对象时使用现有对象做为原型

```text
function Person(name) {}
function User(name) {}
User.prototype = new Person();
User.prototype.constructor = User;
const hd = Object.create(new User("后盾人"));
console.log(Object.getPrototypeOf(hd));
```

## super

使用`super`调用父类方法较通过原型调用更方便

```text
const Person = {
  name,
  show() {
    return this.name;
  }
};
const hd = {
  name: "向军大叔",
  show() {
    // return "后盾人：" + Object.getPrototypeOf(this).show.call(this);
    return `后盾人: ${super.show()}`;
  }
};
Object.setPrototypeOf(hd, Person);

console.log(hd.show());
```

## 函数复制

使用构造函数会产生函数复制造成内存占用，及函数不能共享的问题。

```text
<script>
    function User(name) {
        this.name = name;
        this.get = function () {
            return this.name;
        }
    }
    let lisi = new User('小明');
    let wangwu = new User('王五');
    console.log(lisi.get == wangwu.get); //false
</script>
```

体验通过原型定义方法不会产生函数复制

```text
function User(name) {
    this.name = name;
}
User.prototype.get = function () {
    return '后盾人' + this.name;
}
let lisi = new User('小明');

let wangwu = new User('王五');
console.log(lisi.get == wangwu.get); //true
//通过修改原型方法会影响所有对象调用，因为方法是共用的
lisi.__proto__.get = function () {
    return '后盾人' + this.name;
}
console.log(lisi.get());
console.log(wangwu.get());
```

## prototype

为Object原型对象添加方法，将影响所有函数

```text
<body>
    <button onclick="this.hide()">后盾人</button>
</body>
<script>
    function hide() {
        this.style.display = "none"
    }
    Object.prototype.hide = hide;
</script>
```

使用`isPrototypeOf`检测一个对象是否是另一个对象的原型对象

```text
function User() {}
const lisi = new User();
const wangwu = new User();
console.log(User.prototype.isPrototypeOf(lisi)); //true
console.log(User.prototype.isPrototypeOf(wangwu)); //true
```

使用`Object.create` 将别一个对象做为新对象的原型对象

```text
function Person() {
  this.name = "后盾人";
  this.getName = function() {
    return this.name;
  };
}
const person = new Person();
person.name = "hdcms";
const lisi = Object.create(person);
console.log(lisi.getName());

//获取lisi对象的原型
console.log(Object.getPrototypeOf(lisi)); // Person

//lisi对象没有name属性，将向上级原型查找
console.log(lisi.name);
```

下面演示使用原型为多个实例共享属性

```text
function User(name, age) {
  this.name = name;
  this.age = age;
  this.show = () => {
  	return `你在${this.site}的姓名:${this.name}，年龄:${this.age}`;
  }
}
User.prototype.site = '后盾人';
let lisi = new User('李四', 12); 
let xiaoming = new User('小明', 32);

console.log(lisi.show()); //你在后盾人的姓名:李四，年龄:12
console.log(xiaoming.show()); //你在后盾人的姓名:小明，年龄:32
```

将方法定义在原型上为对象共享，解决通过构造函数创建对象函数复制的内存占用问题

```text
function User(name) {
    this.name = name;
}
User.prototype.get = function () {
    return '后盾人' + this.name;
}
let lisi = new User('小明');

let wangwu = new User('王五');
console.log(lisi.get == wangwu.get); //true
//通过修改原型方法会影响所有对象调用，因为方法是共用的
lisi.__proto__.get = function () {
    return '后盾人' + this.name;
}
    console.log(lisi.get());
console.log(lisi.get());
console.log(wangwu.get());
```

一次设置原型方法来复用

```text
function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype = Object.assign(User.prototype, {
    getName() {
        return this.name;
    },
    getAge() {
        return this.age;
    }
});
let lisi = new User('李四', 12);
let xiaoming = new User('小明', 32);
console.log(lisi.getName()); //李四
console.log(lisi.__proto__)
```

了解了原型后可以为系统对象添加方法，比如为字符串添加了一截断函数。

- 不能将系统对象的原型直接赋值

```text
String.prototype.truncate = function (len = 5) {
	return this.length <= len ? this : this.substr(0, len) + '...';
}
console.log('后盾人每天不断视频教程'.truncate(3)); //后盾人...
```

DOM节点不能直接使用数据的`filter` 等方法，但使用原型方法就可以操作了

```text
<body>
    <button message="后盾人">button</button>
    <button message="hdcms">button</button>
</body>
<script>
    let btns = document.querySelectorAll('button');
    Array.prototype.filter.call(btns, (item) => {
        item.style.background = 'red';
    });
</script>
```

原型中保存引用类型会造成对象共享属性，所以一般只会在原型中定义方法。

```text
function User() {}
User.prototype = {
  lessons: ["JS", "VUE"]
};
const lisi = new User();
const wangwu = new User();

lisi.lessons.push("CSS");

console.log(lisi.lessons); //["JS", "VUE", "CSS"]
console.log(wangwu.lessons); //["JS", "VUE", "CSS"]
```

## __proto__

在实例化对象上存在__proto__ 记录了原型，所以可以通过对象访问到原型的属性或方法。

- 建议使用 `Object.setPrototypeOf` 与`Object.getProttoeypOf` 替代 `__proto__`

```text
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function () {
	return `姓名:${this.name}，年龄:${this.age}`;
};
let lisi = new User('李四', 12);
let xiaoming = new User('小明', 32);
console.log(lisi.__proto__ == User.prototype); //true
```

可以使用 `__proto__` 或 `Object.setPrototypeOf` 设置对象的原型，使用`Object.getProttoeypOf` 获取对象原型。

```text
function Person() {
  this.getName = function() {
    return this.name;
  };
}
function User(name, age) {
  this.name = name;
  this.age = age;
}
let lisi = new User("李四", 12);
Object.setPrototypeOf(lisi, new Person());
console.log(lisi.getName()); //李四
```

对象设置属性，只是修改对象属性并不会修改原型属性，使用`hasOwnProperty` 只判断对象是否含有属性不检测原型。

```text
function User() {}
const lisi = new User();
const wangwu = new User();

lisi.name = "小明";
console.log(lisi.name);
console.log(lisi.hasOwnProperty("name"));

//修改原型属性后
lisi.__proto__.name = "张三";
console.log(wangwu.name);

//删除对象属性后
delete lisi.name;
console.log(lisi.hasOwnProperty("name"));
console.log(lisi.name);
```

使用 `in` 会检测原型与对象，而 `hasOwnProperty` 只检测对象，所以结合后可判断属性是否在原型中

```text
function User() {
}
User.prototype.name = "后盾人";
const lisi = new User();
//in会在原型中检测
console.log("name" in lisi);
//hasOwnProperty 检测对象属性
console.log(lisi.hasOwnProperty("name"));
```

## constructor

constructor存在于prototype原型中，用于指向构建函数的引用。

```text
function hd() {
  this.show = function() {
    return "show method";
  };
}
const obj = new hd(); //true
console.log(obj instanceof hd);

const obj2 = new obj.constructor();
console.dir(obj2.show()); //show method
```

修改原型对象时，需要保持constructor属性指向到原构造函数

```text
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype = {
  getName() {
    return this.name;
  },
  getAge() {
    return this.age;
  }
};
//避免 for/in 时遍历到 constructor
Object.defineProperty(User.prototype, "constructor", {
  value: User,
  enumerable: false,
  writable: true
});

let lisi = new User("李四", 12);
let xiaoming = new User("小明", 32);
for (const key in lisi) {
  console.dir(key);
}
console.log(lisi.__proto__);
console.log(User.prototype.constructor == User); //true
```

完全重写构建函数原型，只对后面应用对象有效

```text
function User() {}
const lisi = new User();
User.prototype = {
  show() {
    return "prototype show";
  }
};
const wangwu = new User();
console.log(wangwu.show());

console.log(lisi.show()); // lisi.show is not a function
```

## 构造函数

使用构造函数用于定义初始属性，而使用原型定义对象共用方法。

```text
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype = {
  constructor: User,
  getName() {
    return this.name;
  }
};
const lisi = new User("李四", 28);
const wangwu = new User("王五", 19);
console.log(lisi.getName());
console.log(wangwu.getName());
```

如果构造函数返回对象，实例化后的对象将是此对象

```text
function ArrayObject(...values) {
  const arr = new Array();
  arr.push.apply(arr, values);
  arr.string = function(sym = "|") {
    return this.join(sym);
  };
  return arr;
}
const array = new ArrayObject(1, 2, 3);
console.log(array);
console.log(array.string("-"));
```

## 继承

继承是为了复用代码，JS中的继承就是应用原型链，一个对象的原型是另一个对象的实例。

## 基本继承

## 基本继承

继承的本质是将原型指向到另一个对象，下面在执行 `article.get` 方法时的查找顺序为：article对象 > article的原型request对象 > request的原型对象 。

```text
"use strict";
function Request() {
  this.url = "";
}
Request.prototype.get = function(params) {
  //组合请求参数
  const option = Object.keys(params)
    .map(i => i + "=" + params[i])
    .join("&");

  return `API:${this.url}?${option}`;
};
//文章控制器
function Article() {}
Article.prototype = new Request();

//避免 for/in 时遍历到 constructor
Object.defineProperty(Article.prototype, "constructor", {
  value: Article,
  enumerable: false,
  writable: true
});

const article = new Article();
article.url = `article/index/id/1`;
console.log(
  article.get({
    row: 10,
    start: 3
  })
);
```

## 原型方法

设置原型方法要放在改变原型后面，因为前后是两个不同的原型对象

```text
"use strict";
function Request() {
  this.url = "";
}
Request.prototype.get = function(params) {
  //组合请求参数
  const option = Object.keys(params)
    .map(i => i + "=" + params[i])
    .join("&");

  return `API:${this.url}?${option}`;
};
//文章控制器
function Article() {}
Article.prototype.show = function() {
  return "is show method;";
};
Article.prototype = new Request();
const article = new Article();
article.url = `article/index/id/1`;
article.show(); //article.show is not a function
```

## 引用属性

## 问题分析

在原型的构造函数中声明引用属性，会造成实例属性共用。

```text
"use strict";
function Request() {
  this.url = {};
}
Request.prototype.get = function(params = {}) {
  //组合请求参数
  let option = Object.keys(params)
    .map(i => i + "=" + params[i])
    .join("&");

  return `API:${this.url["article"]}?${option}`;
};

//文章控制器
function Article() {}
Article.prototype = new Request();

const article1 = new Article();
article1.url.article = "article/index/id/1";

const article2 = new Article();
article2.url.article = "article/index/id/2";
console.log(article1.url.article); //文章1的URL与文章2一样了
```

## 解决方法

解决上面的问题是使用 `call/apply` 为每个生成的对象设置属性

```text
"use strict";
function Request() {
  this.url = {};
}
Request.prototype.get = function(params = {}) {
  //组合请求参数
  let option = Object.keys(params)
    .map(i => i + "=" + params[i])
    .join("&");

  return `API:${this.url["article"]}?${option}`;
};

//文章控制器
function Article() {
  Request.call(this);
}
Article.prototype = new Request();
Article.prototype.constructor = Article;

const article1 = new Article();
article1.url.article = "article/index/id/1";

const article2 = new Article();
article2.url.article = "article/index/id/2";
console.log(article1.url.article); //文章1的URL与文章2一样了
```

结合构造函数实现对象属性赋值

```text
"use strict";
function Request(url = {}) {
  this.url = url;
}
Request.prototype.get = function(params = {}) {
  //组合请求参数
  let option = Object.keys(params)
    .map(i => i + "=" + params[i])
    .join("&");

  return `API:${this.url["article"]}?${option}`;
};

//文章控制器
function Article(url = {}) {
  Request.call(this, url);
}
Article.prototype = new Request();

const article1 = new Article({ article: "article/index/id/1" });
const article2 = new Article({ article: "article/index/id/2" });
console.log(article1.url.article); //文章1的URL与文章2一样了
```

## 原型工厂

通过复制父类的原型对象来设置构造函数的原型实现方法继承，并在构造函数内部通过 `call/apply` 实现属性继承。

```text
"use strict";
//创建继承原型的对象
function prototype(sup, sub) {
  const prototype = Object(sup.prototype);
  prototype.constructor = sub;
  sub.prototype = prototype;
}

function Request(url) {
  this.url = url;
}
Request.prototype.get = function() {
  return `API:${this.url}`;
};

function Article(id) {
  Request.call(this, `article/get/id/${id}`);
}
prototype(Request, Article);
const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.get());
console.log(article2.get());
```

## 对象工厂

## 实现原理

在原型继承基础上，将对象的生成使用函数完成，并在函数内部为对象添加属性或方法。

```text
"use strict";
//创建继承原型的对象
function object(proto) {
  function Func() {}
  Func.prototype = proto;
  return new Func();
}

function Request(url) {
  this.url = url;
}
Request.prototype.get = function() {
  return `API:${this.url}`;
};

function ArticleController(id) {
  const article = object(new Request(`article/index/id/${id}`));
  article.show = function() {
    return "article show";
  };
  return article;
}

//文章控制器
const article1 = ArticleController(1);
console.log(article1.get());
const article2 = ArticleController(2);
console.log(article2.get());
```

## 系统方法

JS也为我们提供了`Object.create` 完在上面一样的功能

```text
...

function ArticleController(id) {
  const article = Object.create(new Request(`article/index/id/${id}`));
  article.show = function() {
    return "article show";
  };
  return article;
}

...
```

## 实例操作

使用 `call/apply` 制作选项卡

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled.71754c70.gif)

```text
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  main {
    width: 400px;
    flex-direction: column;
    position: relative;
    margin-right: 20px;
  }

  main nav {
    display: flex;
    height: 50px;
    align-items: center;
  }

  main nav a {
    background: #95a5a6;
    margin-right: px;
    padding: 10px 20px;
    border: solid 1px #333;
    color: #fff;
    text-decoration: none;
  }

  main nav a:first-of-type {
    background: #e67e22;
  }

  section {
    height: 200px;
    width: 100%;
    background: #f1c40f;
    position: absolute;
    font-size: 5em;
    display: none;
  }

  .hd-tab section:first-of-type {
    display: block;
  }

  section:nth-child(even) {
    background: #27ae60;
  }
</style>

<body>
  <main class="hd-tab">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
  <main class="hd-tab">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
</body>
<script>
  function Animation() {}
  Animation.prototype.show = function() {
    this.style.display = "block";
  };
  //隐藏所有元素
  Animation.prototype.hideAll = function(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  };
  //必变元素集合背景
  Animation.prototype.background = function(color) {
    this.style.background = color;
  };
  //改变元素背景
  Animation.prototype.backgrounds = function(color, elements) {
    console.log(elements);
    for (const elem of elements) {
      elem.style.background = color;
    }
  };
  function prototype(sup, sub) {
    const prototype = Object(sup.prototype);
    prototype.construct = sub;
    sub.prototype = prototype;
  }
  function Tab() {
    Animation.call(this);
    this.tabs = null;
    this.run = function() {
      this.tabs = this.getTabs();
      this.event();
    };
    this.getTabs = function() {
      let tabs = document.querySelectorAll(".hd-tab");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i]["links"] = tabs[i].querySelectorAll("a");
        tabs[i]["sections"] = tabs[i].querySelectorAll("section");
      }
      return tabs;
    };
    this.event = function() {
      for (const tab of this.tabs) {
        for (let i = 0; i < tab["links"].length; i++) {
          tab["links"][i].addEventListener("click", () => {
            this.backgrounds("#95a5a6", tab["links"]);
            this.hideAll(tab["sections"]);
            this.background.call(tab["links"][i], "#e67e22");
            this.show.call(tab["sections"][i]);
          });
        }
      }
    };
  }
  prototype(Animation, Tab) || new Tab().run();
</script>
```

## class

为了和其他语言继承形态一致，JS提供了`class` 关键词用于模拟传统的`class` ，但底层实现机制依然是原型继承。

`class` 只是语法糖，为了让实现类的形式更加简洁。

## 语法介绍

使用 `constructor` 构造函数传递参数

```text
class User {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
const xj = new User("向军大叔");
console.log(xj.getName());
```

## 构造函数

构造函数不是必须的，如果不设置系统会设置如下类型

- 子构造器中调用完`super` 后才可以使用 `this`

```text
constructor(...args) {
  super(...args);
}
```

## super

```
super` 指调父类引用，在构造函数中必须先调用`super()
```

先调用`super` 原理在原型中有讲过，就是为了实现如下声明

```text
function Parent(name) {
  this.name = name;
}
function User(...args) {
  Parent.apply(this, args);
}
User.prototype = new Parent();
User.prototype.constructor = User;
const hd = new User("后盾人");
console.log(hd.name);
```

在类中需要在构造函数执行`super()`

```text
class Person {
  constructor(name) {
    this.name = name;
  }
}
class User extends Person {
  constructor(name) {
    super(name);
  }
}
const lisi = new User("李四");
```

使用`super` 可以执行父类方法

```text
class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    return `${this.name} say in Parent`;
  }
}
class User extends Person {
  constructor(name) {
    super(name);
  }
}
const lisi = new User("李四");
console.log(lisi.say());
```

## 静态方法

指通过类访问不能使用对象访问的方式，下面是原生代码实现。

```text
"use strict";

function User() {
  User.show = function() {
    return "welcome to houdunren";
  };
  this.show = function() {
    return "this is a object function";
  };
}
const xj = new User();
console.dir(xj.show()); //this is a object function
console.dir(User.show()); //welcome to houdunren
```

使用 `class` 语法糖实现的方式和其他面向对象语言很相似了

```text
class User {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  static show() {
    return "is static method";
  }
}
const xj = new User("向军大叔");
console.log(xj.getName());
console.dir(User.show());
```

## 方法覆盖

子类存在父类同名方法时使用子类方法

```text
class Person {
  constructor(name) {
    console.log(name);
    this.name = name;
  }
  say() {
    console.log(`${this.name} say in person`);
  }
}
class User extends Person {
  constructor(name) {
    super(name);
  }
  say() {
    console.log(`${this.name} say in User Class`);
    return super.say();
  }
}
const lisi = new User("李四");
lisi.say();
```

## 计算属性

```text
const action = "learn";
class User {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  [action]() {
    return "this user learning css";
  }
}
const xj = new User("向军大叔");
console.log(xj.learn());
```

##  访问器

```text
const action = "learn";
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  get userInfo() {
    return this.name + this.age;
  }
}
const xj = new User("向军", 19);
console.log(xj.userInfo);
```

## 实现继承

原生的继承主要是操作原型链，实现起来比较麻烦，使用 `class` 就要简单的多了。

- super() 执行父类构造函数
- super.show() 执行父类方法

```text
class Person {
  constructor(name) {
    this.name = name;
  }
  show() {
    return `后盾人会员: ${this.name}`;
  }
}
class User extends Person {
  constructor(name) {
    super(name);
  }
  run() {
    return super.show();
  }
}
const xj = new User("向军");
console.dir(xj.run());
```

## 实例操作

使用类重写tab面板

```text
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  main {
    width: 400px;
    flex-direction: column;
    position: relative;
    margin-right: 20px;
  }

  main nav {
    display: flex;
    height: 50px;
    align-items: center;
  }

  main nav a {
    background: #95a5a6;
    margin-right: px;
    padding: 10px 20px;
    border: solid 1px #333;
    color: #fff;
    text-decoration: none;
  }

  main nav a:first-of-type {
    background: #e67e22;
  }

  section {
    height: 200px;
    width: 100%;
    background: #f1c40f;
    position: absolute;
    font-size: 5em;
    display: none;
  }

  .hd-tab section:first-of-type {
    display: block;
  }

  section:nth-child(even) {
    background: #27ae60;
  }
</style>

<body>
  <main class="hd-tab">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
  <main class="hd-tab">
    <nav>
      <a href="javascript:;">后盾人</a>
      <a href="javascript:;">hdcms</a>
    </nav>
    <section>1</section>
    <section>2</section>
  </main>
</body>
<script>
  class Animation {
    show() {
      this.style.display = "block";
    }
    hideAll(elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }
    //必变元素集合背景
    background(color) {
      this.style.background = color;
    }
    //改变元素背景
    backgrounds(color, elements) {
      console.log(elements);
      for (const elem of elements) {
        elem.style.background = color;
      }
    }
  }

  class Tab extends Animation {
    constructor() {
      super();
      this.tabs = this.getTabs();
    }
    getTabs() {
      let tabs = document.querySelectorAll(".hd-tab");
      for (let i = 0; i < tabs.length; i++) {
        tabs[i]["links"] = tabs[i].querySelectorAll("a");
        tabs[i]["sections"] = tabs[i].querySelectorAll("section");
      }
      return tabs;
    }
    run() {
      for (const tab of this.tabs) {
        for (let i = 0; i < tab["links"].length; i++) {
          tab["links"][i].addEventListener("click", () => {
            this.backgrounds("#95a5a6", tab["links"]);
            this.hideAll(tab["sections"]);
            this.background.call(tab["links"][i], "#e67e22");
            this.show.call(tab["sections"][i]);
          });
        }
      }
    }
  }
  new Tab().run();
</script>
```

## 扩展内置类

使用原型扩展内置类

```text
function Arr(...args) {
  this.arr = args;
  this.first = function() {
    return this.arr[0];
  };
}
Arr.prototype = new Array();
let arr = new Arr("后盾人", 2, 3);
console.log(arr.first());
```

使用 `class`扩展内置类

```text
class NewArr extends Array {
  constructor(...args) {
    super(...args);
  }
  first() {
    return this[0];
  }
  add(value) {
    this.push(value);
  }
  remove(value) {
    let pos = this.findIndex(curValue => {
      return curValue == value;
    });
    this.splice(pos, 1);
  }
}
let hd = new NewArr(5, 3, 2, 1);
console.log(hd.length); //4
console.log(hd.first()); //5

hd.add("houdunren");
console.log(hd.join(",")); //5,3,2,1,houdunren

hd.remove("3");
console.log(hd.join(",")); //5,2,1,houdunren
```