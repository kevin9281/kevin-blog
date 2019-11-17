---

title: 4.块作用域
---

## 共同点

var/let/const共同点是全局作用域中定义的变量，可以在函数中使用

```
var hd = 'hdcms';
function show() {
	return hd;
}
console.log(show());
```

函数中声明的变量，只能在函数及其子函数中使用

```
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

```
var web = "hdcms.com";
function hd() {
  var web = "houdunren.com";
  console.log(web); //houdunren.com
}
hd();
console.log(web); //hdcms.com
```

## var

使用 var 声明的变量存在于最近的函数或全局作用域中，没有块级作用域的机制。

没有块作用域很容易污染全局，下面函数中的变量污染了全局环境

```
function run() {
  web = "houdunren";
}
run();
console.log(web); //houdunren
```

没有块作用作用域时var也会污染全局

```
for (var i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i);
```

使用let有块作用域时则不会

```
let i = 100;
for (let i = 0; i < 6; i++) {
  console.log(i);
}
console.log(i);
```

下例中体验到 var 没有块作用域概念， do/while 定义的变量可以在块外部访问到

```
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

var 全局声明的变量也存在于 window对象中

```
var hd = "houdunren";
console.log(window.hd); //houdunren
```

以往没有块任用时使用立即执行函数模拟块作用域

```
(function() {
  var $ = this.$ = {};
  $.web = "后盾人";
}.bind(window)());
console.log($.web);
```

有了块作用域后实现就变得简单多了

```
{
  let $ = (window.$ = {});
  $.web = "后盾人";
}
console.log($.web);
```

## let

与 var 声明的区别是 let/const 拥有块作用域，下面代码演示了块外部是无法访问到let声明的变量。

建议将let在代码块前声明
用逗号分隔定义多个


let存在块作用域特性，变量只在块域中有效

```
if (true) {
    let web = 'hdcms',url = 'houdunren.com';
    console.log(web); //hdcms
}
console.log(web); //web is not defined
```

块内部是可以访问到上层作用域的变量

```
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

```
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

使用 const 用来声明常量，这与其他语言差别不大，比如可以用来声明后台接口的URI地址。

常量名建议全部大写
只能声明一次变量
声明时必须同时赋值
不允许再次全新赋值
可以修改引用类型变量的值
拥有块、函数、全局作用域

常量不允许全新赋值举例

```
try {
  const URL = "https://www.houdunren.com";
  URL = "https://www.hdcms.com"; //产生错误
} catch (error) {
  throw new Error(error);
}
```

改变常量的引用类型值

```
const INFO = {
  url: 'https://www.houdunren.com',
  port: '8080'
};
INFO.port = '443';
console.log(INFO);
```

下面演示了在不同作用域中可以重名定义常量

```
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

```
//优惠价
var price = 90;
//商品价格
var price = 100;
console.log(`商品优惠价格是:${price}`);
```

使用let 可以避免上面的问题，因为let声明后的变量不允许在同一作用域中重新声明

```
let web = 'houdunren.com';
let web = '后盾人'; //Identifier 'web' has already been declared
```

不同作用域可以重新声明

```
let web = 'houdunren.com';
if (true) {
	let web = '后盾人'; //Identifier 'web' has already been declared
}
```

但可以改变值这是与const不同点

```
let price = 90;
price = 88;
console.log(`商品价格是:${price}`);
```

let 全局声明的变量不存在于 window对象中，这与var声明不同

```
let hd = "hdcms";
console.log(window.hd); //undefined
```

## Object.freeze

如果冻结变量后，变量也不可以修改了，使用严格模式会报出错误。

```
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

基本类型复制是值的复制，互相不受影响。下例中将a变量的值赋值给b变量后，因为基本类型变量是独立的所以a的改变不会影响b变量的值。

```
let a = 100;
let b = a;
a = 200;
console.log(b);
```

对于引用类型来讲，变量保存的是引用对象的指针。变量间赋值时其实赋值是变量的指针，这样多个变量就引用的是同一个对象。

```
let a = {
  web: "后盾人"
};
let b = a;
a.web = "hdcms";
console.log(b);
```

## undefined

对声明但未赋值的变量返回类型为 undefined 表示值未定义。

```
let hd;
console.log(typeof hd);
```

对未声明的变量使用会报错，但判断类型将显示 undefined。

```
console.log(typeof houdunren);
console.log(houdunren);
```

我们发现未赋值与未定义的变量值都为 undefined ，建议声明变量设置初始值，这样就可以区分出变量状态了。

函数参数或无返回值是为undefined

```
function hd(web) {
  console.log(web); //undefined
  return web;
}
console.log(hd()); //undefined
```

## null

null 用于定义一个空对象，即如果变量要用来保存引用类型，可以在初始化时将其设置为null

```
var hd = null;
console.log(typeof hd);
```

## 严格模式

严格模式可以让我们及早发现错误，使代码更安全规范，推荐在代码中一直保持严格模式运行。

> 主流框架都采用严格模式，严格模式也是未来JS标准，所以建议代码使用严格模式开发

## 基本差异

变量必须使用关键词声明，未声明的变量不允许赋值

```
"use strict";
url = 'houdunren.com'; //url is not defined
```

强制声明防止污染全局

```
"use strict";
function run() {
  web = "houdunren";
}
run();
console.log(web); //houdunren
```

关键词不允许做变量使用

```
"use strict";
var public = 'houdunren.com';
```

变量参数不允许重复定义

```
"use strict";
//不允许参数重名
function hd(name, name) {} 
```

单独为函数设置严格模式

```
function strict(){  
  "use strict";  
  return "严格模式";  
}  
function notStrict() {  
  return "正常模式";  
}  
```

为了在多文件合并时，防止全局设置严格模式对其他没使用严格模式文件的影响，将脚本放在一个执行函数中。

```
(function () {
  "use strict";
  url = 'houdunren.com';
})();
```

## 解构差异

非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明。

```
// "use strict";
({name,url} = {name:'后盾人',url:'houdunren.com'});
console.log(name, url);
```

> 使用严格模式编码总是推荐的