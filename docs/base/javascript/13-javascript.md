---
title: 13.迭代器
---

## 遍历器

现在很多语言中都存在 Iterator 遍历器（迭代器），目的是为了是用统一接口处理不同数据类型。在JS中包括 `Array/Object/Set/Map` 等多种集合数据结构，迭代器就是为了采用统一的方式遍历数据。

常用的解构与扩展运算符内部也在使用遍历器实现。

## [#](http://houdunren.gitee.io/note/js/12 迭代器.html#解决的问题)解决的问题

以往遍历数据时比如使用 `for` 需要变量来记录每次迭代数据的位置，如果遍历多层需要设置多个变量用于记录并不方便。

下面的遍历代码阅读不够清晰，需要设置多个变量记录遍历位置，遍历器就是解决上面的问题。

```text
let arr = [["a", "b"], ["后盾人", "hdcms"]];
for (let i = 0; i < arr.length; i++) {
  for (let n = 0; n < arr[i].length; n++) {
    console.log(arr[i][n]);
  }
}
```

使用迭代器后代码变得更佳优雅清晰

```text
let arr = [["a", "b"], ["后盾人", "hdcms"]];
for (const iterator of arr) {
  for (const value of iterator) {
    console.log(value);
  }
}
```

## [#](http://houdunren.gitee.io/note/js/12 迭代器.html#原始实现)原始实现

下面使用以往掌握的知识实现生成器，有助于更好的理解生成器。

```text
function generator(arr) {
  let i = 0;
  return {
    next() {
      let done = arr.length <= i;
      return {
        value: done ? undefined : arr[i++],
        done: done
      };
    }
  };
}
let gen = new generator([1, 2, 3]);
console.log(gen.next()); //{value: 1, done: false}
console.log(gen.next()); //{value: 2, done: false}
console.log(gen.next()); //{value: 3, done: false}
console.log(gen.next()); //{value: undefined, done: false}
```

## [#](http://houdunren.gitee.io/note/js/12 迭代器.html#原理分析)原理分析

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

数据结构本身或在原型链上包含 `Symbol.iterator` 遍历器生成方法时即为可迭代对象。`Symbol.iterator` 返回`next` 方法。

```text
let obj = {
  data: [1, 2, 3, 4],
  pos: 0,
  [Symbol.iterator]() {
    self = this;
    return {
      next() {
        let value = self.data[self.pos];
        let done = ++self.pos > self.data.length;
        return { value, done };
      }
    };
  }
};
// let iterator = obj[Symbol.iterator]();
// console.log(iterator.next());
for (const iterator of obj) {
  console.log(iterator);
}
```

如果对象是数字键并包含`length`可以直接引用数组迭代器

```text
let object = {
  0: "hdcms",
  1: "houdunren",
  2: "houdunwang",
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (const iterator of object) {
  console.log(iterator);
}
```

系统内置的 `Array/Set/String/Map/NodeList` 对象都已经内置了迭代器，下面是体验数组迭代器的使用。

```text
let arr = [1, 2, "后盾人", "向军大叔"];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next());
```

字符串同样实现了遍历器

```text
let hd = "houdunren";
let iterator = hd[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
```

再来看看set类型同样实现了遍历器

```text
let hd = new Set().add("hdcms").add("houdunren");
let f = hd[Symbol.iterator]();
console.log(f.next());
```

## [#](http://houdunren.gitee.io/note/js/12 迭代器.html#解构与扩展)解构与扩展

常用的解构与扩展运算符内部也在使用遍历器实现。

数组扩展调用遍历器

```text
let arr = ["hdcms", "houdunren"];
console.log([1, 2, 3, ...arr]);
```

解构内部也是使用遍历器

```text
let hd = new Set().add("hdcms").add("houdunren");
[a, b] = hd;
console.log(a, b); //hdcms houdunren
```

## [#](http://houdunren.gitee.io/note/js/12 迭代器.html#结构生成)结构生成

Array/Map/Set 都包含 `values`、`keys`、`entries` 等方法，这些方法也会返回迭代器。

- values 返回键值对
- keys 返回键名集合
- values 返回值集合
- Array/Set 默认迭代器是 values()
- Map默认迭代器是 entries()

数组中使用`values`

```text
let arr = ["houdunren", "hdcms"];
for (const iterator of arr.values()) {
  console.log(iterator);
}
```

Map中的使用`entries` 返回键值对

```text
let map = new Map().set("houdunren", "后盾人").set("hdcms", "内容管理系统");
for (const [key, value] of map.entries()) {
  console.log(`key=>${key},value=>${value}`);
}
```

## [#](http://houdunren.gitee.io/note/js/12 迭代器.html#for-of)for/of

拥有迭代特性即包含 `Symbol.iterator` 方法的数据结构，就可以使用`for/of` 遍历操作。

- Array/Set 默认迭代器是 values()
- Map默认迭代器是 entries()

遍历字符串

```text
let str = "houdunren";
for (const iterator of str) {
  console.log(iterator);
}
```

遍历数组

```text
let arr = ["houdunren", "hdcms"];
for (const iterator of arr) {
  console.log(iterator);
}
```

遍历Set类型

```text
let set = new Set().add("houdunren").add("hdcms");
for (const iterator of set) {
  console.log(iterator);
}
```

遍历Map类型并使用解构赋值

```text
let map = new Map().set("houdunren", "后盾人").set("hdcms", "内容管理系统");
for (const [key, value] of map) {
  console.log(`key=>${key},value=>${value}`);
}
```

遍历NodeList 文档DOM元素集合

```text
const divs = document.querySelectorAll("div");
for (const elem of divs) {
  elem.addEventListener("click", () => {
    alert(elem.innerHTML);
  });
}
```