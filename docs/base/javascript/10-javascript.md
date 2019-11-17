---
title: 10.对象
---

## 基础知识

对象是包括属性与方法的数据类型，JS中大部分类型都是对象如 `String/Number/Math/RegExp/Date` 等等。

## 基本声明

使用字面量形式声明对象是最简单的方式

```text
let obj = {
  name: '后盾人',
  get:function() {
  	return this.name;
  }
}
console.log(obj.get()); //后盾人
```

属性与方法简写

```text
let name = "后盾人";
let obj = {
  name,
  get() {
    return this.name;
  }
};
console.log(obj.get()); //后盾人
```

## 动态管理

对象和方法的属性可以动态的添加或删除。

```text
const hd = {
  name: "后盾人"
};
hd.age = "10";
hd.show = function() {
  return `${this.name}已经${this.age}岁了`;
};
console.log(hd.show());
console.log(hd);
delete hd.show;
delete hd.age;
console.log(hd);
console.log(hd.age); //undefined
```

## 操作属性

使用点语法获取

```text
let user = {
  name: "向军"
};
console.log(user.name);
```

使用`[]` 获取

```text
console.log(user["name"]);
```

可以看出使用`.`操作属性更简洁，`[]`主要用于通过变量定义属性的场景

```text
let user = {
  name: "向军"
};
let property = "name";
console.log(user[property]);
```

## 对象方法

定义在对象中的函数我们称为方法，下面定义了学生对象，并提供了计算平均成绩的方法

```text
let lisi = {
  name: "李四",
  age: 22,
  grade: {
    math: 99,
    english: 67
  },
  //平均成绩
  avgGrade: function() {
    let total = 0;
    for (const key in this.grade) {
      total += this.grade[key];
    }
    return total / this.propertyCount("grade");
  },
  //获取属性数量
  propertyCount: function(property) {
    let count = 0;
    for (const key in this[property]) count++;
    return count;
  }
};
console.log(lisi.avgGrade());
```

> 一个学生创建一个对象，显然不实际下面的构造函数就可以解决这个问题

## 引用特性

对象和函数、数组一样是引用类型，即复制只会复制引用地址。

```text
let hd = { name: "后盾人" };
let cms = hd;
cms.name = "hdcms";
console.log(hd.name); //hdcms
```

对象做为函数参数使用时也不会产生完全赋值，内外共用一个对象

```text
let user = { age: 22 };
function hd(user) {
  user.age += 10;
}
hd(user);
console.log(user.age); //32
```

## 展开语法

使用`...`可以展示对象的结构

```text
let hd = { name: "后盾人", web: "houdurnen.com" };
let info = { ...hd, site: "hdcms" };
console.log(info);
```

## 解构赋值

解构是一种更简洁的赋值特性，可以理解为分解一个数据的结构，在数组章节已经介绍过。

- 建设使用 `var/let/const` 声明

## 基本使用

下面是基本使用语法

```text
//对象使用
let {name:n,url:u} = {name:'后盾人',url:'houdunren.com'};
console.log(n); // 后盾人

//如果属性名与变量相同可以省略属性定义
let {name,url} = {name:'后盾人',url:'houdunren.com'};
console.log(name); // 后盾人
```

解构赋值数组

```text
function hd() {
	return ['houdunren', 'hdcms'];
}
let [a, b] = hd();
console.log(a); //houdunren
```

解构赋值对象

```text
function hd() {
  return {
    name: '后盾人',
    url: 'houdunren.com'
  };
}
let {name: n,url: u} = hd();
console.log(n);
```

剩余解构指用一个变量来接收剩余参数

```text
let [a, ...b] = ['后盾人', 'houdunren', 'hdcms'];
console.log(b);
```

如果变量已经初始化过，就要使用`()` 定义赋值表达式，严格模式会报错所以不建议使用。

```text
function hd() {
  return {
    web: 'hdcms.com',
    url: 'houdunren.com'
  };
}
let web = '后盾人';
({web,url} = hd());
console.log(web);
```

函数传参

```text
"use strict";
function hd([name, age]) {
  console.log(name, age); //向军大叔 18
}
hd(["向军大叔", 18]);
```

字符串解构

```text
"use strict";
const [...a] = "houdunren.com";
console.log(a); //Array(13)
```

系统函数解构练习，这没有什么意义只是加深解构印象

```text
const {random} =Math;
console.log(random());
```

## 严格模式

非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明。

```text
// "use strict";
({name,url} = {name:'后盾人',url:'houdunren.com'});
console.log(name, url);
```

## 简洁定义

如果属性名与赋值的变量名相同可以更简洁

```text
function hd() {
  return {
    name: '后盾人',
    url: 'houdunren.com'
  };
}
let {name,url} = hd();
console.log(name); //后盾人
```

只赋值部分变量

```text
let [,url]=['后盾人','houdunren.com'];
console.log(url);//houdunren.com

let {name}= {name:'后盾人',url:'houdunren.com'};
console.log(name); //后盾人
```

使用展开语法获取多个值

```text
let [name, ...arr] = ['后盾人', 'hdcms', 'houdunren.com'];
console.log(name, arr); //后盾人 (2) ["hdcms", "houdunren.com"]
```

可以直接使用变量赋值对象属性

```text
let name = '后盾人',url = 'houdunren.com';
let opt = {name,url};
console.log(opt);//{name: "后盾人", url: "houdunren.com"}; //后盾人 JS
```

## 嵌套赋值

可以操作多层复杂数据结构

```text
"use strict";
const hd = {
  name:'后盾人',
  lessons:{
    title:'JS'
  }
}
const {name,lessons:{title}}  = hd;
console.log(name,title) ;
```

## 默认值

为变量设置默认值

```text
let [name, site = 'hdcms'] = ['后盾人'];
console.log(site); //hdcms

({name,url,user='向军大叔'}= {name:'后盾人',url:'houdunren.com'});
console.log(name,user);//向军大叔
```

使用默认值特性可以方便的对参数预设

```text
function createElement(options) {
  let {
    width = '200px',
    height = '100px',
    backgroundColor = 'red'
  } = options;
  const h2 = document.createElement('h2');
  h2.style.width = width;
  h2.style.height = height;
  h2.style.backgroundColor = backgroundColor;
  document.body.appendChild(h2);
}
createElement({
	backgroundColor: 'green'
});
```

## 函数参数

数组参数的使用

```text
function hd([a, b]) {
	console.log(a, b);
}
hd(['后盾人', 'hdcms']);
```

对象参数使用方法

```text
function hd({name,url,user='向军大叔'}) {
	console.log(name,url,user);
}
hd({name:'后盾人','url':'houdunren.com'}); //后盾人 houdunren.com 向军大叔
```

对象解构传参

```text
function user(name, { sex, age } = {}) {
  console.log(name, sex, age); //向军大叔 男 18
}
user("向军大叔", { sex: "男", age: 18 });
```

## 构建函数

对象可以通过内置或自定义的构造函数创建。

## 工厂函数

在函数中返回对象的函数称为工厂函数，工厂函数有以下优点

- 减少重复创建相同类型对象的代码
- 修改工厂函数的方法影响所有同类对象

```text
function stu(name, age, grade) {
  return {
    name,
    age,
    grade,
    //平均成绩
    avgGrade: function() {
      let total = 0;
      for (const key in this.grade) {
        total += this.grade[key];
      }
      return total / this.propertyCount("grade");
    },
    //获取属性数量
    propertyCount(property) {
      let count = 0;
      for (const key in this[property]) count++;
      return count;
    }
  };
}
const lisi = stu("李四", "18", { math: 78, english: 98 });
console.log(lisi.avgGrade());
```

## 构造函数

和工厂函数相似构造函数也用于创建对象，它的上下文为新的对象实例。

- 构造函数名每个单词首字母大写即`Pascal` 命名规范
- `this`指当前创建的对象
- 需要使用`new`关键词生成对象

```text
function Student(name, age, grade) {
  this.name = name;
  this.age = age;
  this.grade = grade;
  //平均成绩
  (this.avgGrade = function() {
    let total = 0;
    for (const key in this.grade) {
      total += this.grade[key];
    }
    return total / this.propertyCount("grade");
  }),
    //获取属性数量
    (this.propertyCount = function(property) {
      let count = 0;
      for (const key in this[property]) count++;
      return count;
    });
}
const lisi = new Student("李四", "18", { math: 78, english: 98 });
console.log(lisi.avgGrade());
```

## 内置构造

JS中大部分数据类型都是通过构造函数创建的。

```text
const num = new Number(99);
console.log(num.toString());

const string = new String("后盾人");
console.log(string.toString());

const boolean = new Boolean(true);
console.log(boolean.toString());

const date = new Date();
console.log(date.toString() * 1);

const regexp = new RegExp("\\d+");
console.log(regexp.test(99));
```

通过工厂函数创建的内部也是调用了`Object`构造函数

```text
const hd = {
  name: "后盾人"
};
console.log(hd.constructor); //ƒ Object() { [native code] }

//下面是使用构造函数创建对象
const hdcms = new Object();
hdcms.title = "开源内容管理系统";
console.log(hdcms);
```

## 对象函数

在`JS`中函数也是一个对象

```text
function hd(name) {}

console.log(hd.toString());
console.log(hd.length);
```

函数是由系统内置的 `Function` 构造函数创建的

```text
function hd(name) {}

console.log(hd.constructor);
```

下面是使用内置构造函数创建的函数

```text
const User = new Function(`name`,`
  this.name = name;
  this.show = function() {
    return this.name;
  };
`
);

const lisi = new User("李四");
console.log(lisi.show());
```

## 属性管理

## 检测属性

`hasOwnProperty`检测属性是否存在，不判断继承属性。

```text
let obj = {
	name: '后盾人',
  get() {
  	return this.name;
  }
}
console.log(obj.hasOwnProperty('name')); //true
```

使用 `in` 可以在原型对象上检测

```text
let obj = {
  name: "后盾人",
  get() {
    return this.name;
  }
};
let hd = {
  web: "houdunren.com"
};
Object.setPrototypeOf(obj, hd);
console.log("web" in obj);
console.log(obj.hasOwnProperty("web"));
```

## 删除属性

使用`delete` 可以删除属性

```text
delete obj.name;
```

## 添加属性

可以为对象添加属性

```text
let obj = {
  name: "后盾人",
  get() {
    return this.name;
  }
};
obj.site = "houdunren.com";
console.log(obj.hasOwnProperty("site")); //true
```

## assign

以往我们使用类似`jQuery.extend` 等方法设置属性，现在可以使用 `Object.assign` 静态方法

从一个或多个对象复制属性

```text
"use strict";
let hd = { a: 1, b: 2 };
hd = Object.assign(hd, { f: 1 }, { m: 9 });
console.log(hd); //{a: 1, b: 2, f: 1, m: 9}
```

## 计算属性

对象属性可以通过表达式计算定义，这在动态设置属性或执行属性方法时很好用。

```text
let id = 0;
const user = {
  [`id-${id++}`]: id,
  [`id-${id++}`]: id,
  [`id-${id++}`]: id
};
console.log(user);
```

使用计算属性为文章定义键名

```text
const lessons = [
  {
    title: "媒体查询响应式布局",
    category: "css"
  },
  {
    title: "FLEX 弹性盒模型",
    category: "css"
  },
  {
    title: "MYSQL多表查询随意操作",
    category: "mysql"
  }
];
let lessonObj = lessons.reduce((obj, cur, index) => {
  obj[`${cur["category"]}-${index}`] = cur;
  return obj;
}, {});
console.log(lessonObj); //{css-0: {…}, css-1: {…}, mysql-2: {…}}
console.log(lessonObj["css-0"]); //{title: "媒体查询响应式布局", category: "css"}
```

## 传值操作

对象是引用类型赋值是传址操作，后面会介绍对象的深、浅拷贝操作

```text
let user = {
	name: '后盾人'
};
let hd = {
	stu: user
};
hd.stu.name = 'hdcms';
console.log(user.name);//hdcms
```

## 属性特性

## 基础知识

属性类型可以使用 `Object.getOwnPropertyDescriptors`查看

```text
"use strict";
const user = {
  name: "向军"
};
console.log(Object.getOwnPropertyDescriptors(user));
```

属性包括以下四种特性

| 特性         | 说明                                                   | 默认值    |
| ------------ | ------------------------------------------------------ | --------- |
| configurable | 能否使用delete、能否需改属性特性、或能否修改访问器属性 | true      |
| enumerable   | 对象属性是否可通过for-in循环                           | true      |
| writable     | 对象属性是否可修改,                                    | true      |
| value        | 对象属性的默认值                                       | undefined |

使用`Object.defineProperty` 方法修改属性特性

```text
"use strict";
const user = {
  name: "向军"
};
Object.defineProperty(user, "name", {
  value: "hdcms",
  writable: false
});
user.name = "houdunren"; //Cannot assign to read only property 'name' of object
```

## 私有属性

JS没有私有属性概念，但使用 `defineProperty` 可以模拟定义私有属性

```text
function Hd() {
  let _name;
  Object.defineProperty(this, "name", {
    get: () => {
      return _name;
    },
    set: value => {
      return (_name = value);
    }
  });
}
const obj = new Hd();
obj.name = "houdunren";
console.dir(obj.name);
```

## 遍历对象

## for/in

使用`for/in`遍历对象属性

```text
const hd = {
  name: "后盾人",
  age: 10
};
for (let key in hd) {
  console.log(key, hd[key]);
}
```

## for/of

`for/of`用于遍历迭代对象，不能直接操作对象。但`Object`对象的`keys/`方法返回的是迭代对象。

```text
const hd = {
  name: "后盾人",
  age: 10
};
for (const key of Object.keys(hd)) {
  console.log(key);
}
```

获取所有对象属性

```text
const hd = {
  name: "后盾人",
  age: 10
};
for (const key of Object.values(hd)) {
  console.log(key);
}
```

同时获取属性名与值

```text
for (const array of Object.entries(hd)) {
  console.log(array);
}
```

使用扩展语法同时获取属性名与值

```text
for (const [key, value] of Object.entries(hd)) {
  console.log(key, value);
}
```

## 对象拷贝

对象复制时复制的内存地址，所以一个对象的改变直接影响另一个

```text
let obj = {
  name: '后盾人',
  user: {
  	name: 'hdcms'
  }
}
let a = obj;
let b = obj;
a.name = 'lisi';
console.log(b.name); //lisi
```

## 浅拷贝

使用`for/in`执行对象拷贝

```text
let obj = {name: "后盾人"};

let hd = {};
for (const key in obj) {
  hd[key] = obj[key];
}

hd.name = "hdcms";
console.log(hd);
console.log(obj);
```

浅拷贝不会将深层的数据复制

```text
let obj = {
    name: '后盾人',
    user: {
        name: 'hdcms'
    }
}
let a = obj;
let b = obj;

function copy(object) {
    let obj = {}
    for (const key in object) {
        obj[key] = object[key];
    }
    return obj;
}
let newObj = copy(obj);
newObj.name = 'hdcms';
newObj.user.name = 'houdunren.com';
console.log(newObj);
console.log(obj);
```

新版JS提供了Object.assign` 函数可简单的实现浅拷贝，它是将两个对象的属性叠加后面对象属性会覆盖前面对象同名属性。

```text
let user = {
	name: '后盾人'
};
let hd = {
	stu: Object.assign({}, user)
};
hd.stu.name = 'hdcms';
console.log(user.name);//后盾人
```

使用扩展运算符复制

```text
let obj = {
  name: "后盾人"
};
let hd = { ...obj };
hd.name = "hdcms";
console.log(hd);
console.log(obj);
```

## 深拷贝

是完全的复制一个对象，两个对象是完全独立的对象

```text
let obj = {
    name: '后盾人',
    user: {
        name: 'hdcms'
    }
}
let a = obj;
let b = obj;

function copy(object) {
    let obj = {}
    for (const key in object) {
        obj[key] = typeof object[key] == 'object' ?
            copy(object[key]) : object[key];
    }
    return obj;
}
let newObj = copy(obj);
newObj.name = 'hdcms';
newObj.user.name = 'houdunren.com';
console.log(newObj);
console.log(obj);
```

## 访问器

getter方法用于获得属性值，setter方法用于设置属性，这是JS提供的存取器特性即使用函数来管理属性。

- 用于避免错误的赋值
- 需要动态监测值的改变

## 基本使用

下面是设置token储取的示例，将业务逻辑使用`getter/setter`处理更方便，也方便其他业务的复用。

```text
let Request = {
  get token() {
    let con = localStorage.getItem('token');
    if (!con) {
    	alert('请登录后获取token')
    } else {
    	return con;
    }
  },
  set token(con) {
  	localStorage.setItem('token', con);
  }
};
// Request.token = 'houdunren'
console.log(Request.token);
```

## 双向绑定

下面通过访问器实现`vue` 等前端框架的双向绑定特性。

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-1051176.1e6209c9.gif)

```text
"use strict";
const els = document.querySelectorAll("[v-model]");

//记录模型数据
const models = {};
Array.from(els).map(function(el) {
  const name = el.getAttribute("v-model");
  Object.defineProperty(models, name, {
    get: () => {},
    set: value => {
      let bindELem = document.querySelector(`[v-bind='${name}']`);
      bindELem.innerHTML = el.value;
    }
  });
  el.addEventListener("keyup", function() {
    models[name] = el.value;
  });
});
```

## 代理

代理（拦截器）是对象的访问控制，`setter/getter` 是对单个对象属性的控制，而代理是对整个对象的控制。

- 读写属性时代码更简洁
- 对象的多个属性控制统一交给代理完成
- 严格模式下 `set` 必须返回布尔值

## 使用方法

```text
"use strict";
const hd = { name: "后盾人" };
const proxy = new Proxy(hd, { 
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    return true;
  }
});
console.dir(proxy.name);
proxy.name = "hdcms";
console.dir(proxy.name);
```

##  (http://houdunren.gitee.io/note/js/9 对象.html#性能计算)性能计算

如果代理以函数方式执行时，会执行代理中定义 `apply` 方法。

- 参数说明：函数，上下文对象，参数

下面使用 `apply` 计算函数执行时间

```text
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1);
}
const proxy = new Proxy(factorial, {
  apply(target, obj, args) {
    console.time("runtime");
    console.log(target.apply(obj, args));
    console.timeEnd("runtime");
  }
});
proxy(10);
```

## 截图字符

下例中当标题长度超过时添加 `.` 字符

```text
const stringDot = {
  get(target, key) {
    const title = target[key].title;
    const len = 5;
    target[key].title =
      title.length > len
        ? target[key].title.substr(0, len) + ".".repeat(3)
        : title;
    return target[key];
  }
};
const lessons = [
  {
    title: "媒体查询响应式布局",
    category: "css"
  },
  {
    title: "FLEX 弹性盒模型",
    category: "css"
  },
  {
    title: "MYSQL多表查询随意操作",
    category: "mysql"
  }
];
const stringDotProxy = new Proxy(lessons, stringDot);
console.log(stringDotProxy[0]);
```

## 表单验证

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-1059910.07b17933.gif)

```text
<style>
  body {
    padding: 300px;
    background: #34495e;
  }
  input {
    border: solid 10px #ddd;
    height: 30px;
  }
  .error {
    border: solid 10px red;
  }
</style>
<body>
  <input type="text" validate rule="max:12,min:3" />
  <input type="text" v-model="age" validate rule="max:3,isNumber" />
  <h2 v-bind="name"></h2>
</body>
<script>
  "use strict";
  //验证处理类
  class Validate {
    max(value, len) {
      return value.length <= len;
    }
    min(value, len) {
      return value.length >= len;
    }
    isNumber(value) {
      return typeof parseInt(value) == "number";
    }
  }
  
  //代码工厂
  function makeProxy(target) {
    return new Proxy(target, {
      get(target, key) {
        return target[key];
      },
      set(target, key, el) {
        const rule = el.getAttribute("rule");
        const validate = new Validate();
        let state = rule.split(",").every(rule => {
          const info = rule.split(":");
          return validate[info[0]](el.value, info[1]);
        });
        el.classList[state ? "add" : "remove"]("error");
        return true;
      }
    });
  }
  
  const nodes = makeProxy(document.querySelectorAll("[validate]"));
  Array.from(nodes).map((item, i) => {
    item.addEventListener("keyup", function() {
      nodes[i] = this;
    });
  });
</script>
```

## JSON

使用`json` 数据格式是替换 `xml` 的最佳方式，主流语言都很好的支持`json` 格式。所以 `json` 也是前后台传输数据的主要格式。

json 标准中要求使用双引号包裹属性，虽然有些语言不强制，但使用双引号可避免多程序间传输发生错误语言错误的发生。

## 声明定义

**基本结构**

```text
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
console.log(hd.teacher.name);
```

**数组结构**

```text
let lessons = [
  {
    "title": '媒体查询响应式布局',
    "category": 'css',
    "click": 199
  },
  {
    "title": 'FLEX 弹性盒模型',
    "category": 'css',
    "click": 12
  },
  {
    "title": 'MYSQL多表查询随意操作',
    "category": 'mysql',
    "click": 89
  }
];

console.log(lessons[0].title);
```

## 序列化

序列化是将 `json` 转换为字符串，一般用来向其他语言传输使用。

```text
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
console.log(JSON.stringify(hd)); 
//{"title":"后盾人","url":"houdunren.com","teacher":{"name":"向军大叔"}}
```

根据第二个参数指定保存的属性

```text
console.log(JSON.stringify(hd, ['title', 'url']));
//{"title":"后盾人","url":"houdunren.com"}
```

第三个是参数用来控制TAB数量，如果字符串则为前导字符。

```text
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
console.log(JSON.stringify(hd, null, 4));
```

为数据添加 `toJSON` 方法来自定义返回格式

```text
let hd = {
    "title": "后盾人",
    "url": "houdunren.com",
    "teacher": {
        "name": "向军大叔",
    },
    "toJSON": function () {
        return {
            "title": this.url,
            "name": this.teacher.name
        };
    }
}
console.log(JSON.stringify(hd)); //{"title":"houdunren.com","name":"向军大叔"}
```

## 反序列化

使用 `JSON.parse` 将字符串 `json` 解析成对象

```text
let hd = {
  "title": "后盾人",
  "url": "houdunren.com",
  "teacher": {
  	"name": "向军大叔",
  }
}
let jsonStr = JSON.stringify(hd);
console.log(JSON.parse(jsonStr));
```

使用第二个参数函数来对返回的数据二次处理

```text
let hd = {
    "title": "后盾人",
    "url": "houdunren.com",
    "teacher": {
        "name": "向军大叔",
    }
}
let jsonStr = JSON.stringify(hd);
console.log(JSON.parse(jsonStr, (key, value) => {
    if (['title'].indexOf(key) >= 0) {
        return `[推荐] ${value}`;
    }
    return value;
}));
```