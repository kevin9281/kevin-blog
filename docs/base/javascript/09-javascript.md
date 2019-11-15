---
title: 9.作用域与闭包
---

## 作用域链

全局作用域只有一个，每个函数又都有作用域。

- 编译器运行时会将变量定义在所在作用域
- 使用变量时会从当前作用域开始向上查找变量
- 作用域就像攀亲亲一样，晚辈总是可以向上辈要些东西

##  (http://houdunren.gitee.io/note/js/8 作用域与闭包.html#使用规范)使用规范

作用域链只向上查找，找到全局WINDOW即终止，应该尽量不要在全局作用域中添加变量。

![image-20191007192620939](http://houdunren.gitee.io/note/assets/img/image-20191007192620939.4ff7f251.png)

```text
<script>
    let site = '后盾人';

    function a() {
        let hd = 'houdunren.com';

        function b() {
            let cms = 'hdcms.com';
            console.log(hd);
            console.log(site);
        }
        b();
    }
    a();
</script>
```

##  (http://houdunren.gitee.io/note/js/8 作用域与闭包.html#let-const)let/const

使用 `let/const` 可以将变量声明在块作用域中

```text
{
	let a = 9;
}
console.log(a); //ReferenceError: a is not defined
if (true) {
	var i = 1;
}
console.log(i);//1
```

在 `for` 循环中使用`let/const` 会在每一次迭代中重新生成不同的变量

```text
let arr = [];
for (let i = 0; i < 10; i++) {
	arr.push((() => i));
}
console.log(arr[3]()); //3 如果使用var声明将是10
```

也可以通过下面的定时器函数来体验

```text
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 500);
}
```

##  (http://houdunren.gitee.io/note/js/8 作用域与闭包.html#闭包函数)闭包函数

闭包指函数可以访问外部作用域变量的函数，即使在函数在当前作用域外也可以访问。如果没有闭包那么在处理事件绑定，异步请求时都会变得困难。

- 闭包一般在本身作用域以外执行，即延伸作用域
- 闭包可以访问到外部作用域的所有变量
- 可以想像闭包会将外部环境复制一份供其使用

##  (http://houdunren.gitee.io/note/js/8 作用域与闭包.html#使用技巧)使用技巧

下面代码在使用闭包时，外部函数作用域依然保留。

```text
function hd() {
  let name = '后盾人';
  return function () {
  	return name;
  }
}
let hdcms = hd();
console.log(hdcms()); //后盾人
```

下面是私有属性示例来演示闭包语法。

```text
function Person() {
  let name = '后盾人';
  this.getName = function () {
  	return name;
  }
}
let lisi = new Person();
console.log(lisi.getName());
```

下面是在回调函数中使用闭包，当点击按钮时显示当前点击的是第几个按钮。

```text
<body>
    <button message="后盾人">button</button>
    <button message="hdcms">button</button>
</body>
<script>
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = (function (i) {
            return function () {
                alert(i + 1);
            }
        })(i);
    }
</script>
```

计时器中使用闭包来获取独有变量

```text
<body>
    <style>
        button {
            position: absolute
        }
    </style>
    <button message="后盾人">houdunren</button>
    <button message="hdcms">hdcms</button>
</body>
<script>
    let btns = document.querySelectorAll('button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            let left = 1,
                num = 1;
            setInterval(function () {
                this.style.left = parseInt(left++) + "px";
            }.bind(btns[i]), 5);
        }
    }
</script>
```

##  (http://houdunren.gitee.io/note/js/8 作用域与闭包.html#赋值特性)赋值特性

在使用`for` 等循环时 `var` 赋值产生一个变量， `let` 会产生多个变量并产生块作用域，这样就可以方便使用闭包

```text
//使用var时
let arr = [];
for (var i = 0; i < 10; i++) {
    arr.push(function () {
        return i;
    });
}
console.log(arr[3]()); //10

//使用let时产生多次i的赋值
arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(function () {
        return i;
    });
}
console.log(arr[3]()); //3

//自行构建闭包
arr = [];
for (var i = 0; i < 10; i++) {
    (function (i) {
        arr.push(function () {
            return i;
        });
    })(i);
}
console.log(arr[3]()); //3
```