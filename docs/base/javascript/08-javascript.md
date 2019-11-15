---
title: 8.函数进阶
---

## 基础知识



函数是将复用的代码块封装起来的模块，在JS中函数还有其他语言所不具有的特性，接下来我们会详细掌握使用技巧。

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#生明定义)生明定义

在JS中函数也是对象函数是`Function`类的创建的实例，下面的例子可以方便理解函数是对象。

```text
let hd = new Function("title", "console.log(title)");
hd('后盾人');
```

标准语法是使用函数声明来定义函数

```text
function hd(num) {
	return ++num;
}
console.log(hd(3));
```

函数是对象所以可以通过赋值来指向到函数对象的指针，当然指针也可以传递给其他变量，注意后面要以`;`结束。

```text
let hd = function (num) {
	return ++num;
};
let cms = hd;
console.log(cms(3));
```

标准声明的函数优先级更高，解析器会优先提取函数并放在代码树顶端，所以标准声明函数位置不限制，所以下面的代码可以正常执行。

```text
console.log(hd(3));
function hd(num) {
	return ++num;
};
```

函数可以做为参数传递

```text
function filterFun(item) {
	return item <= 3;
}
let hd = [1, 2, 3, 4, 5].filter(filterFun);
console.log(hd); //[1,2,3]
```

对象字面量属性函数简写

```text
let user = {
  name: null,
  getName: function (name) {
  	return this.name;
  },
  //简写形式
  setName(value) {
  	this.name = value;
  }
}
user.setName('后盾人');
console.log(user.getName()); // 后盾人
```

立即执行函数指函数定义时立即执行

- 可以用来定义私有作用域防止污染全局作用域

```text
<script>
    "use strict";
    (function () {
        var web = 'houdunren';
    })();
    console.log(web); //web is not defined
</script>
```

使用 `let/const` 有块作用域特性，所以使用以下方式也可以产生私有作用域

```text
{
	let web = 'houdunren';
}
console.log(web);
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#形参实参)形参实参

形参是在函数声明时设置的参数，实参指在调用函数时传递的值。

- 形参数量大于实参时，没有传参的形参值为 undefined
- 实参数量大于形参时，多于的实参将忽略并不会报错

```text
// n1,n2 为形参
function sum(n1, n2) {}
// 参数 2,3 为实参
sum(2, 3);
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#参数默认值)参数默认值

参数可以设置默认值，当不传实参时使用默认值替代。下例中当不传递 type 参数时使用默认值 asc。

```text
function sortArray(arr, type = 'asc') {
	return arr.sort((a, b) => type == 'asc' ? a - b : b - a);
}
console.log(sortArray([1, 3, 2, 6], 'desc'));
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#函数参数)函数参数

函数可以做为参数传递，这也是大多数语言都支持的语法规则。

```text
<body>
    <button>订阅</button>
</body>
<script>
    document.querySelector('button').addEventListener('click', function () {
        alert('感谢订阅');
    })
</script>
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#arguments)arguments

arguments 是函数获得到所有参数集合，下面是使用 `arguments` 求和的例子。

```text
function sum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
  	sum += arguments[i];
  }
  return sum;
}
console.log(sum(2, 3, 1, 4, 8));
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#合并参数)合并参数

使用 `...` 可以接受传入的多个参数合并为数组，下面是使用点语法进行求合计算。

```text
function sum(...params) {
	console.log(params);
	return params.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 3, 2, 4));
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#箭头函数)箭头函数

箭头函数是函数声明的简写形式，在使用递归调用、构造函数、事件处理器时不建议使用箭头函数。

无参数时使用空扩号即可

```text
let sum = () => {
	return 1 + 3;
}
console.log(sum()); //4
```

函数体为单一表达式时不需要 `return` 返回处理，系统会自动返回表达式计算结果。

```text
let sum = () => 1 + 3;
console.log(sum()); //4
```

多参数传递与普通声明函数一样使用逗号分隔

```text
let hd = [1, 8, 3, 5].filter((item, index) => {
	return item <= 3;
});
console.log(hd);
```

> 有关箭头函数的作用域知识会在后面章节讨论

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#函数提升)函数提升

函数也会提升到前面，优先级行于`var`变量提高

```text
console.log(hd()); //后盾人
function hd() {
	return '后盾人';
}
```

变量函数定义不会被提升

```text
console.log(hd()); //后盾人

function hd() {
	return '后盾人';
}
var hd = function () {
	return 'hdcms.com';
}
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#递归调用)递归调用

递归指函数内部调用自身的方式。

- 主要用于数量不确定的循环操作
- 要有退出时机否则会陷入死循环

下面通过阶乘来体验递归调用

```text
function factorial(num = 3) {
	return num == 1 ? num : num * factorial(--num);
}
console.log(factorial(5)); //120
```

累加计算方法

```text
function sum(...num) {
	return num.length == 0 ? 0 : num.pop() + sum(...num);
}
console.log(sum(1, 2, 3, 4, 5, 7, 9)); //31
```

递归打印倒三角

```text
******
*****
****
***
**
*

function star(row = 5) {
  let n = 0;
  do {
    document.write("*");
  } while (++n <= row);
  document.write("<br/>");
  return row == 0 ? "" : star(--row);
}
star();
```

使用递归修改课程点击数

```text
<script>
    let lessons = [{
            title: '媒体查询响应式布局',
            click: 89
        },
        {
            title: 'FLEX 弹性盒模型',
            click: 45
        },
        {
            title: 'GRID 栅格系统',
            click: 19
        }, {
            title: '盒子模型详解',
            click: 29
        },
    ]

    function changeClick(lessons, i = 0) {
        if (lessons.length == i) {
            return lessons;
        } else {
            lessons[lessons.length - (i + 1)].click += 10;
            return changeClick(lessons, ++i);
        }
    }
    console.log(changeClick(lessons));
</script>
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#回调函数)回调函数

在某个时刻被其他函数调用的函数称为回调函数，比如处理键盘、鼠标事件的函数。

```text
<button id='hd'>button</button>
<script>
     document.getElementById('hd').addEventListener('click', () => alert('通过回调函数调用'));
</script>
```

使用回调函数递增计算

```text
let hd = ([1, 2, 3]).map(item => item + 10);
console.log(hd)
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#展开语法)展开语法

展开语法已经在前面数据类型讨论过，使用展示语法可以替代 `arguments` 来接收任意数量的参数

```text
function hd(...args) {
  console.log(args);
}
hd(1, 2, 3, "后盾人"); //[1, 2, 3, "后盾人"]
```

也可以用于接收部分参数

```text
function hd(site, ...args) {
  console.log(site, args); //后盾人 (3) [1, 2, 3]
}
hd("后盾人", 1, 2, 3);
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#标签函数)标签函数

使用函数来解析标签字符串，第一个参数是字符串值的数组，其余的参数为标签变量。

```text
function hd(str, ...values) {
  console.log(str); //["站点", "-", "", raw: Array(3)]
  console.log(values); //["后盾人", "houdunren.com"]
}
let name = '后盾人',url = 'houdunren.com';
hd `站点${name}-${url}`;
```

## [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#this)this

调用函数时 `this` 会隐式传递给函数指函数调用时的关联对象，也称之为函数的上下文。

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#普通调用)普通调用

独立函数在非严格模式下`this` 是全局`window`对象，严格模式时是`undefined`。

```text
var name = '后盾人';
function get() {
  "use strict"
  return this.name;
}
console.log(get());
//严格模式将产生错误 Cannot read property 'name' of undefined
```

函数为对象的属性时`this` 指向该对象

```text
<script>
    function show() {
        return this;
    }
    console.log(show());

    let obj = {}
    obj.show = show;
    console.log(obj.show());
</script>
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#方法调用)方法调用

函数做为对象属性时 `this` 指向对象。

```text
var name = 'hdcms';

function get() {
  "use strict"
  return this.name;
}
let hd = {
  name: '后盾人',
  show: get
}
console.log(hd.show());
```

下面是将方法赋予属性

```text
var name = 'hdcms';
let hd = {
  name: '后盾人',
  get() {
  	return this.name;
  }
}
console.log(hd.get());
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#构造函数)构造函数

函数当被 `new` 时即为构造函数，一般构造函数中包含属性与方法。函数中的上下文指向到实例对象。

- 构造函数主要用来生成对象，里面的this默认就是指当前对象

```text
function User() {
  this.name = '后盾人';
  this.say = function () {
  	return this.name;
  }
}
let hd = new User();
console.log(hd.say());
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#箭头函数-2)箭头函数

箭头函数中的`this` 会继承定义函数时的上下文，可以理解为和外层函数指向一个this。

- 如果想使用函数定义时的上下文中的this，那就使用箭头函数

下例中的匿名函数的执行环境为全局所以 `this` 指向 `window`。

```text
var name = 'hdcms';
var obj = {
  name: '后盾人',
  getName: function () {
    return function () {
    	return this.name;
    }
  }
}
console.log(obj.getName()()); //返回window.name的值hdcms
```

以往解决办法会匿名函数调用处理定义变量，然后在匿名函数中使用。

```text
var name = 'hdcms';
var obj = {
  name: '后盾人',
  getName: function () {
    var self = this;
		return () => {
    	return this.name;
    }
  }
}
console.log(obj.getName()()); //返回window.name的值hdcms
```

使用箭头函数后 `this` 为定义该函数的上下文，也可以理解为定义时父作用域中的`this`

```text
var name = 'hdcms';
var obj = {
  name: '后盾人',
  getName: function () {
    return () => {
    	return this.name;
    }
  }
}
console.log(obj.getName()()); //后盾人
```

事件中使用箭头函数结果不是我们想要的

```text
<body>
    <button>hdcms</button>
</body>
<script>
    document.querySelector('button').addEventListener('click', () => {
        console.log(this);
    })
</script>
```

正确的事件处理器还是使用标准函数，标准函数在赋值给属性或绑定给事件时`this` 为当前操作对象。

```text
<script>
    document.querySelector('button').addEventListener('click', function () {
        console.log(this);
    })
</script>
```

## [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#apply-call-bind)apply/call/bind

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#原理分析)原理分析

构造函数中的`this`默认是一个空对象，然后构造函数处理后把这个空对象变得有值丰富了起来。

```text
function User(name) {
  this.name = name;
}
let hd = new User("后盾人");
```

可以改变构造函数中的空对象，即让构造函数this指向到另一个对象。

```text
function User(name) {
  this.name = name;
}

let hdcms = {};
User.call(hdcms, "HDCMS");
console.log(hdcms);
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#apply-call)apply/call

call与apply 用于显示的设置函数的上下文，两个方法作用一样都是将对象绑定到this，只是在传递参数上有所不同。

- apply 用数组传参
- call 需要分别传参
- 与 bind 不同 call/apply 会立即执行函数

语法使用介绍

```text
<script>
    function show(title) {
        alert(`${title+this.name}`);
    }
    let lisi = {
        name: '李四'
    };
    let wangwu = {
        name: '王五'
    };
    show.call(lisi, '后盾人');
    show.apply(wangwu, ['HDCMS']);
</script>
```

使用 `call` 设置函数上下文

```text
<body>
    <button message="后盾人">button</button>
    <button message="hdcms">button</button>
</body>
<script>
    function show() {
        alert(this.getAttribute('message'));
    }
    let bts = document.getElementsByTagName('button');
    for (let i = 0; i < bts.length; i++) {
        bts[i].addEventListener('click', () => show.call(bts[i]));
    }
</script>
```

找数组中的数值最大值

```text
let arr = [1, 3, 2, 8];
console.log(Math.max(arr)); //NaN
console.log(Math.max.apply(Math, arr)); //8
```

实现构造函数属性继承

```text
"use strict";
function Request() {
  this.get = function(params = {}) {
    //组合请求参数
    let option = Object.keys(params)
      .map(i => i + "=" + params[i])
      .join("&");

    return `获取数据 API:${this.url}?${option}`;
  };
}
//文章控制器
function Article() {
  this.url = "article/index";
  Request.apply(this, []);
}
let hd = new Article();
console.log(
  hd.get({
    row: 10,
    start: 3
  })
);
//课程控制器
function Lesson() {
  this.url = "lesson/index";
  Request.call(this);
}
let js = new Lesson();
console.log(
  js.get({
    row: 20
  })
);
```

制作显示隐藏面板

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-0706853.88fcc321.gif)

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

    dl {
        width: 400px;
        display: flex;
        flex-direction: column;
    }

    dt {
        background: #e67e22;
        border-bottom: solid 2px #333;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    dd {
        height: 200px;
        background: #bdc3c7;
        font-size: 5em;
        text-align: center;
        line-height: 200px;
    }
</style>

<body>
    <dl>
        <dt>后盾人</dt>
        <dd>1</dd>
        <dt>hdcms</dt>
        <dd hidden="hidden">2</dd>
    </dl>
</body>
<script>
    function panel() {
        this.change = function (dds) {
            dds.forEach((item) => item.setAttribute('hidden', 'hidden'));
            if (this.getAttribute('hidden')) {
                this.removeAttribute('hidden');
            } else {
                this.setAttribute('hidden', 'hidden');
            }
        }
    }
    let dts = document.querySelectorAll('dt');
    let dds = document.querySelectorAll('dd');
    for (let i = 0; i < dts.length; i++) {
        dts[i].onclick = () => (new panel).change.call(dds[i], dds);
    }
</script>
```

### [#](http://houdunren.gitee.io/note/js/7 函数进阶.html#bind)bind

bind()是将函数绑定到某个对象，比如 a.bind(hd) 可以理解为将a函数绑定到hd对象上即 hd.a()。

- 与 call/apply 不同bind不会立即执行
- bind 是复制函数形为

bind是复制函数行为

```text
<script>
    let a = function () {
    }
    let b = a;
    console.log(a === b);
    //bind是新复制函数
    let c = a.bind();
    console.log(a == c);
</script>
```

绑定参数注意事项

```text
<script>
    function hd(a, b) {
        return this.f + a + b;
    }
    //使用bind会生成新函数
    let newFunc = hd.bind({
        f: 1
    }, 3);
    //1+3+2 参数2赋值给b
    console.log(newFunc(2));
</script>
```

动态改变元素背景颜色，当然下面的例子也可以使用箭头函数处理

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-0718146.b9a6849c.gif)

```text
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding: 100px;
    }

    main {
        width: 400px;
        height: 500px;
        background: #55efc4;
        transition: 2s;
    }
</style>

<body>
    <main>
        houdunren.com
    </main>
</body>
<script>
    function Main(elem) {
        this.elem = elem;
        this.colors = [
            '#74b9ff', '#ffeaa7', '#fab1a0', '#fd79a8'
        ];
        this.background = function () {
            setInterval(function () {
                let pos = Math.floor(Math.random() * this.colors.length);
                this.elem.style.background = this.colors[pos];
            }.bind(this), 1000);
        }
    }
    let main = new Main(document.querySelector('main'));
    main.background.call(main);
</script>
```

