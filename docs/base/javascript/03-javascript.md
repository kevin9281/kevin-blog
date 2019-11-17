---

title: 3.变量声明
---

## 命名规则

JS中的变量是弱类型可以保存所有类型的数据，即变量没有类型而值有类型。变量名以字母、$、_ 开始，后跟字母、数字、_。

下面都是合法的命名

```
let name = 'houdunren';
let $='hdcms'
```

JS语言关键字不能用来做变量名，比如 true、if、while、class 等。

```
let class = 'houdunren';
```

## 变量声明

可以使用多种方式定义变量比如var、let等（后面作用域章节会再讨论变量）。

```
let name = 'houdunren';
```

以上代码是声明和赋值的结合

```
let name ;
name = 'houdunren'
```

>  变量的其他细节使用会在函数、对象等章节中体验

使用, 可以同时声明多个变量

```
let n = 2,f = 3;
console.log(f);
```

下面演示了变量可以更换不同类型的数据

```
let hd = 'houdunren';
console.log(typeof hd);

hd = 18;
console.log(typeof hd);
```

## 弱类型

在JS中变量类型由所引用的值决定

```
var web = "hdcms";
console.log(typeof web); //string
web = 99;
console.log(typeof web); //number
web = {};
console.log(typeof web); //object
```

## 变量提升

解析器会先解析代码，然后把声明的变量的声明提升到最前，这就叫做变量提升。

下面代码在解析过程中发现while不能做为变量名，没有到执行环节就出错了，这是一个很好的解析过程的体验。

```
var web = 'houdunren';
console.log(web);
let while = 'hdcms'; //Uncaught SyntaxError: Unexpected token 'while'
```

使用 var 声明代码会被提升到前面

```
console.log(a); //undefined
var a = 1;
console.log(a);  //1

//以上代码解析器执行过程如下
var a;
console.log(a); //1
a = 1;
console.log(a); //1
```

下面是 if(false) 中定义的var也会发生变量提升，注释掉if 结果会不同

```
var web = "houdunren";
function hd() {
  if (false) {
    var web = "后盾人";
  }
  console.log(web);
}
hd();
```


使用 var 定义的代码，声明会被提升到前面，赋值还在原位置

```
console.log(hd);
var hd = '后盾人';

//以上代码解析器执行过程如下
var hd;
console.log(hd); //后盾人
hd = '后盾人';
```

## TDZ

TDZ 又称暂时性死区，指变量在作用域内已经存在，但必须在let/const声明后才可以使用。

TDZ可以让程序保持先声明后使用的习惯，让程序更稳定。

变量要先声明后使用
建议使用let/const 而少使用var


使用let/const 声明的变量在声明前存在临时性死区（TDZ）使用会发生错误

```
console.log(x); // Cannot access 'x' before initialization
let x = 1;
```

在run函数作用域中产生TDZ，不允许变量在未声明前使用。

```
hd = "houdunren";
function run() {
  console.log(hd);
  let hd = "hdcms";
}
run();
```

下面代码b没有声明赋值不允许直接使用

```
function hd(a = b, b = 3) {}
hd(); //Cannot access 'b' before initialization
```

因为a已经赋值，所以b可以使用a变量，下面代码访问正常

```
function hd(a = 2, b = a) {}
hd();
```