---

title: 2.基础知识
---

## 介绍

所有内容需要在特定的环境中运行，就像PSD需要在类似PS的软件处理一样。浏览器内置了处理的JS的解析器，但不同浏览器的性能不同，所以JS一般都在浏览器中执行，当然也有可以在服务器后台执行的JS解析器。

JS请求处理步骤如下：



![img](https://raw.githubusercontent.com/kevin9281/-/master/yx.png)

### 

**避免延迟**

如果js放在 head中`` 标签中要等到js加载并解析后才会显示``标签中的内容。

h1会在houdunren.js文件加载并解析后才会显示。



**推荐做法**

将js 放在body中 就可以解决



## 变量声明

**命名规则**

JS中的变量是弱类型可以保存所有类型的数据，即变量没有类型而值有类型。变量名以字母、$、_ 开始，后跟字母、数字、_。

下面都是合法的命名

```text
let name = 'houdunren';
let $='hdcms'
```

JS语言关键字不能用来做变量名，比如 `true、if、while、class` 等。

```text
let class = 'houdunren';
```

### 变量声明

可以使用多种方式定义变量比如var、let等（后面作用域章节会再讨论变量）。

```text
let name = 'houdunren';
```

以上代码是声明和赋值的结合

```text
let name ;
name = 'houdunren'
```

> 变量的其他细节使用会在函数、对象等章节中体验

使用`,` 可以同时声明多个变量

```text
let n = 2,f = 3;
console.log(f);
```

下面演示了变量可以更换不同类型的数据

```text
let hd = 'houdunren';
console.log(typeof hd);

hd = 18;
console.log(typeof hd);
```

### 弱类型

在JS中变量类型由所引用的值决定

```text
var web = "hdcms";
console.log(typeof web); //string
web = 99;
console.log(typeof web); //number
web = {};
console.log(typeof web); //object
```



## 变量提升



解析器会先解析代码，然后把声明的变量的声明提升到最前，这就叫做变量提升。

下面代码在解析过程中发现`while`不能做为变量名，没有到执行环节就出错了，这是一个很好的解析过程的体验。

```text
var web = 'houdunren';
console.log(web);
let while = 'hdcms'; //Uncaught SyntaxError: Unexpected token 'while'
```

使用 `var` 声明代码会被提升到前面

```text
console.log(a); //undefined 已声明未赋值
var a = 1;      // 此处才赋值
console.log(a);  //1

//以上代码解析器执行过程如下
var a;
console.log(a); //1
a = 1;
console.log(a); //1
```

下面是 `if(false)` 中定义的var也会发生变量提升，注释掉`if` 结果会不同

```text
var web = "houdunren";
function hd() {
  if (false) {
    var web = "后盾人";
  }
  console.log(web);
}
hd();
```

使用 `var` 定义的代码，声明会被提升到前面，赋值还在原位置

```text
console.log(hd);
var hd = '后盾人';

//以上代码解析器执行过程如下
var hd;
console.log(hd); //后盾人
hd = '后盾人';
```



## TDZ



TDZ 又称暂时性死区，指变量在作用域内已经存在，但必须在`let/const`声明后才可以使用。

TDZ可以让程序保持先声明后使用的习惯，让程序更稳定。

- 变量要先声明后使用
- 建议使用let/const 而少使用var

使用`let/const` 声明的变量在声明前存在临时性死区（TDZ）使用会发生错误

```text
console.log(x); // Cannot access 'x' before initialization
let x = 1;
```

在`run`函数作用域中产生TDZ，不允许变量在未声明前使用。

```text
hd = "houdunren";
function run() {
  console.log(hd);
  let hd = "hdcms";
}
run();
```

下面代码b没有声明赋值不允许直接使用

```text
function hd(a = b, b = 3) {}
hd(); //Cannot access 'b' before initialization
```

因为a已经赋值，所以b可以使用a变量，下面代码访问正常

```text
function hd(a = 2, b = a) {}
hd(); 
```



## 块级作用域

### 共同点

`var/let/const`共同点是全局作用域中定义的变量，可以在函数中使用

```text
var hd = 'hdcms';
function show() {
	return hd;
}
console.log(show());
```

函数中声明的变量，只能在函数及其子函数中使用

```text
function hd() {
  var web = "后盾人";

  function show() {
    console.log(web);
  }
  show(); //子函数结果: 后盾人
  console.log(web); //函数结果: 后盾人
}
hd();
console.log(web); //全局访问: hd is not defined
```

函数中声明的变量就像声明了私有领地，外部无法访问

```text
var web = "hdcms.com";
function hd() {
  var web = "houdunren.com";
  console.log(web); //houdunren.com
}
hd();
console.log(web); //hdcms.com
```

### var

```
const web = "houdunren.com";
function show(){
	const web = "后盾人";
	function run(){
		var web = "run .. web";
		console.log(web);
	}
	run();
	console.log(web);
}
show();
console.log(web);


// 程序由上往下执行顺序
//1. 此处先声明了一个栈内存变量web  指向值存储
//2. 然后声明了一个栈内存 show 指向堆内存的show函数引用地址
//3. 在show 的引用地址堆内存中 声明变量web 
//4. 然后在show 的引用地址堆内存中 声明一个run 方法 指向另一个堆内存
//5. 在run 的引用地址堆内存中 声明变量web
//6. 不管是用 var / const / let  各个堆内存互不影响
//7. 除非只改值不重新声明
```



使用 `var` 声明的变量存在于最近的函数或全局作用域中，没有块级作用域的机制。

没有块作用域很容易污染全局，下面函数中的变量污染了全局环境

```text
function run() {
  web = "houdunren";
}
run();
console.log(web); //houdunren  
                  //此处赋值 相当于改变全局变量web 的值 并未改变指向 所以会跟着变
                  //除非在函数内变量前写上 var / let / const 表示重新定义变量
```

没有块作用作用域时var也会污染全局

```text
for (var i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i);
```

使用`let`有块作用域时则不会

```text
let i = 100;
for (let i = 0; i < 6; i++) {
  console.log(i);
}
console.log(i);
```

下例中体验到 `var` 没有块作用域概念， `do/while` 定义的变量可以在块外部访问到

```text
var num = 0;

function show() {
  var step = 10;
  do {
    var res = 0;
    console.log(num = step++);
    res = num;
  } while (step < 20);
  console.log(`结果是${res}`);
}
show();
```

`var` 全局声明的变量也存在于 `window`对象中

```text
var hd = "houdunren";
console.log(window.hd); //houdunren

```

以往没有块任用时使用立即执行函数模拟块作用域

```text
(function() {
  var $ = this.$ = {};
  $.web = "后盾人";
}.bind(window)());
console.log($.web);

```

有了块作用域后实现就变得简单多了

```text
{
  let $ = (window.$ = {});
  $.web = "后盾人";
}
console.log($.web);
```

## let

与 `var` 声明的区别是 `let/const` 拥有块作用域，下面代码演示了块外部是无法访问到`let`声明的变量。

- 建议将`let`在代码块前声明
- 用逗号分隔定义多个

`let`存在块作用域特性，变量只在块域中有效

```text
if (true) {
    let web = 'hdcms',url = 'houdunren.com';
    console.log(web); //hdcms
}
console.log(web); //web is not defined
```

块内部是可以访问到上层作用域的变量

```text
if (true) {
  let user = "向军大叔";
  (function() {
    if (true) {
      console.log(`这是块内访问：${user}`);
    }
  })();
}
console.log(user);
```

每一层都是独立作用域，里层作用域可以声明外层作用域同名变量，但不会改变外层变量

```text
function run() {
  hd = "houdunren";
  if (true) {
    let hd = "hdcms";
    console.log(hd); //hdcms
  }
  console.log(hd); //houdunren
}
run();
```

## const

使用 `const` 用来声明常量，这与其他语言差别不大，比如可以用来声明后台接口的URI地址。

- 常量名建议全部大写
- 只能声明一次变量
- 声明时必须同时赋值
- 不允许再次全新赋值
- 可以修改引用类型变量的值
- 拥有块、函数、全局作用域

常量不允许全新赋值举例

```text
try {
  const URL = "https://www.houdunren.com";
  URL = "https://www.hdcms.com"; //产生错误
} catch (error) {
  throw new Error(error);
}
```

改变常量的引用类型值

```text
const INFO = {
  url: 'https://www.houdunren.com',
  port: '8080'
};
INFO.port = '443';
console.log(INFO);
```

下面演示了在不同作用域中可以重名定义常量

```text
const NAME = '后盾人';

function show() {
  const NAME = '向军大叔';
  return NAME;
}
console.log(show());
console.log(NAME);
```

## 重复定义

使用 var 可能造成不小心定义了同名变量

```text
//优惠价
var price = 90;
//商品价格
var price = 100;
console.log(`商品优惠价格是:${price}`);
```

使用`let` 可以避免上面的问题，因为let声明后的变量不允许在同一作用域中重新声明

```text
let web = 'houdunren.com';
let web = '后盾人'; //Identifier 'web' has already been declared
```

不同作用域可以重新声明

```text
let web = 'houdunren.com';
if (true) {
	let web = '后盾人'; //Identifier 'web' has already been declared
}
```

但可以改变值这是与const不同点

```text
let price = 90;
price = 88;
console.log(`商品价格是:${price}`);
```

`let` 全局声明的变量不存在于 `window`对象中，这与`var`声明不同

```text
let hd = "hdcms";
console.log(window.hd); //undefined
```

## Object.freeze

如果冻结变量后，变量也不可以修改了，使用严格模式会报出错误。

```text
"use strict"
const INFO = {
  url: 'https://www.houdunren.com',
  port: '8080'
};
Object.freeze(INFO);
INFO.port = '443'; //Cannot assign to read only property
console.log(INFO);
```

## 传值与传址

基本数据类型指数值、字符串等简单数据类型，引用类型指对象数据类型。

> 类型的详细介绍会在后面章节讲解

基本类型复制是值的复制，互相不受影响。下例中将a变量的值赋值给b变量后，因为基本类型变量是独立的所以a的改变不会影响b变量的值。

```text
let a = 100;
let b = a;
a = 200;
console.log(b);
```

对于引用类型来讲，变量保存的是引用对象的指针。变量间赋值时其实赋值是变量的指针，这样多个变量就引用的是同一个对象。

```text
let a = {
  web: "后盾人"
};
let b = a;
a.web = "hdcms";
console.log(b);
```

## undefined

对声明但未赋值的变量返回类型为 `undefined` 表示值未定义。

```text
let hd;
console.log(typeof hd);
```

对未声明的变量使用会报错，但判断类型将显示 `undefined`。

![image-20191003194105707](http://houdunren.gitee.io/note/assets/img/image-20191003194105707.a5cd9f56.png)

```text
console.log(typeof houdunren);
console.log(houdunren);
```

我们发现未赋值与未定义的变量值都为 `undefined` ，建议声明变量设置初始值，这样就可以区分出变量状态了。

函数参数或无返回值是为`undefined`

```text
function hd(web) {
  console.log(web); //undefined
  return web;
}
console.log(hd()); //undefined
```

## null

`null` 用于定义一个空对象，即如果变量要用来保存引用类型，可以在初始化时将其设置为null

```text
var hd = null;
console.log(typeof hd);
```



## 严格模式

严格模式可以让我们及早发现错误，使代码更安全规范，推荐在代码中一直保持严格模式运行。

> 主流框架都采用严格模式，严格模式也是未来JS标准，所以建议代码使用严格模式开发

**基本差异**

变量必须使用关键词声明，未声明的变量不允许赋值

```text
"use strict";
url = 'houdunren.com'; //url is not defined
```

强制声明防止污染全局

```text
"use strict";
function run() {
  web = "houdunren";
}
run();
console.log(web); //houdunren
```

关键词不允许做变量使用

```text
"use strict";
var public = 'houdunren.com';
```

变量参数不允许重复定义

```text
"use strict";
//不允许参数重名
function hd(name, name) {} 
```

单独为函数设置严格模式

```text
function strict(){  
  "use strict";  
  return "严格模式";  
}  
function notStrict() {  
  return "正常模式";  
}  
```

为了在多文件合并时，防止全局设置严格模式对其他没使用严格模式文件的影响，将脚本放在一个执行函数中。如果有多个人共同开发 使用匿名函数自调用的方式 此封装的函数控制作用域 防止全局污染

```text
(function () {
  "use strict";
  url = 'houdunren.com';
})();
```

另一种写法使用一个花括号就产生块级作用域达到函数自调用的效果, 也可以达到控制作用域 防止全局污染

但是必须使用let 声明变量

```
{
	let = 'houdunren.com';
}
```

**解构差异**

非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明。

```text
// "use strict";
({name,url} = {name:'后盾人',url:'houdunren.com'});
console.log(name, url);
```

> 使用严格模式编码总是推荐的
>
> 