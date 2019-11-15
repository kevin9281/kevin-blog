---
title: 7.Set与Map
---

## set

用于存储任何类型的唯一值，无论是基本类型还是对象引用。

- 只能保存值没有键名
- 严格类型检测如字符串数字不等于数值型数字
- 值是唯一的
- 遍历顺序是添加的顺序，方便保存回调函数

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#基本使用)基本使用

对象可以属性最终都会转为字符串

```text
let obj = { 1: "hdcms", "1": "houdunren" };
console.table(obj); //{1:"houdunren"}
```

使用对象做为键名时，会将对象转为字符串后使用

```text
let obj = { 1: "hdcms", "1": "houdunren" };
console.table(obj);

let hd = { [obj]: "后盾人" };
console.table(hd);

console.log(hd[obj.toString()]);
console.log(hd["[object Object]"]);
```

使用数组做初始数据

```text
let hd = new Set(['后盾人', 'hdcms']);
console.log(hd.values()); //{"后盾人", "hdcms"}
```

Set 中是严格类型约束的，下面的数值`1`与字符串`1`属于两个不同的值

```text
let set = new Set();
set.add(1);
set.add("1");
console.log(set); //Set(2) {1, "1"}
```

使用 `add` 添加元素，不允许重复添加`hdcms`值

```text
let hd = new Set();

hd.add('houdunren');
hd.add('hdcms');
hd.add('hdcms')

console.log(hd.values()); //SetIterator {"houdunren", "hdcms"}
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#获取数量)获取数量

获取元素数量

```text
let hd = new Set(['后盾人', 'hdcms']);
console.log(hd.size); //2
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#元素检测)元素检测

检测元素是否存在

```text
let hd = new Set();
hd.add('hdcms');
console.log(hd.has('hdcms'));//true
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#删除元素)删除元素

使用 `delete` 方法删除单个元素，返回值为`boolean`类型

```text
let hd = new Set();
hd.add("hdcms");
hd.add("houdunren");

console.log(hd.delete("hdcms")); //true

console.log(hd.values());
console.log(hd.has("hdcms")); //false
```

使用 `clear` 删除所有元素

```text
let hd = new Set();
hd.add('hdcms');
hd.add('houdunren');
hd.clear();
console.log(hd.values());
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#数组转换)数组转换

可以使用`点语法` 或 `Array.form` 静态方法将Set类型转为数组，这样就可以使用数组处理函数了

```text
const set = new Set(["hdcms", "houdunren"]);
console.log([...set]); //["hdcms", "houdunren"]
console.log(Array.from(set)); //["hdcms", "houdunren"]
```

移除Set中大于5的数值

```text
let hd = new Set("123456789");
hd = new Set([...hd].filter(item => item < 5));
console.log(hd);
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#去除重复)去除重复

去除字符串重复

```text
console.log([...new Set("houdunren")].join(""));//houdnre
```

去除数组重复

```text
const arr = [1, 2, 3, 5, 2, 3];
console.log(...new Set(arr)); // 1,2,4,5
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#遍历数据)遍历数据

使用 `keys()/values()/entries()` 都可以返回迭代对象，因为`set`类型只有值所以 `keys与values` 方法结果一致。

```text
const hd = new Set(["hdcms", "houdunren"]);
console.log(hd.values()); //SetIterator {"hdcms", "houdunren"}
console.log(hd.keys()); //SetIterator {"hdcms", "houdunren"}
console.log(hd.entries()); //SetIterator {"hdcms" => "hdcms", "houdunren" => "houdunren"}
```

可以使用 `forEach` 遍历Set数据，默认使用 `values` 方法创建迭代器。

为了保持和遍历数组参数统一，函数中的value与key是一样的。

```text
let arr = [7, 6, 2, 8, 2, 6];
let set = new Set(arr);
//使用forEach遍历
set.forEach((item,key) => console.log(item,key));
```

也可以使用 `forof` 遍历Set数据，默认使用 `values` 方法创建迭代器

```text
//使用for/of遍历
let set = new Set([7, 6, 2, 8, 2, 6]);

for (const iterator of set) {
	console.log(iterator);
}
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#搜索实例)搜索实例

下面通过历史搜索的示例体验`Set` 类型

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-0727351.f2e8978f.gif)

```text
<style>
  body {
      padding: 200px;
  }

  * {
      padding: 0;
      margin: 0;
  }

  input {
      width: 200px;
      border: solid 1px #d63031;
      outline: none;
      padding: 10px;
      box-sizing: border-box;
  }

  ul {
      list-style: none;
      width: 200px;
      padding-top: 20px;
  }

  ul li {
      border: solid 1px #ddd;
      padding: 10px;
      margin-bottom: -1px;
  }

  ul li:nth-of-type(odd) {
      background: #00b894;
  }
</style>

<body>
  <input type="text">
  <ul></ul>
</body>
<script>
  let obj = {
      words: new Set(),
      set keyword(word) {
          this.words.add(word);
      },
      show() {
          let ul = document.querySelector('ul');
          ul.innerHTML = '';
          this.words.forEach((item) => {
              ul.innerHTML += ('<li>' + item + '</li>');
          })
      }
  }

  document.querySelector('input').addEventListener('blur', function () {
      obj.keyword = this.value;
      obj.show();
  });
</script>
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#交集)交集

获取两个集合中共同存在的元素

```text
let hd = new Set(['hdcms', 'houdunren']);
let cms = new Set(['后盾人', 'hdcms']);
let newSet = new Set(
	[...hd].filter(item => cms.has(item))
);
console.log(newSet); //{"hdcms"}
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#差集)差集

在集合a中出现但不在集合b中出现元素集合

```text
let hd = new Set(['hdcms', 'houdunren']);
let cms = new Set(['后盾人', 'hdcms']);
let newSet = new Set(
	[...hd].filter(item => !cms.has(item))
);
console.log(newSet); //{"houdunren"}
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#并集)并集

将两个集合合并成一个新的集合，由于Set特性当然也不会产生重复元素。

```text
let hd = new Set(['hdcms', 'houdunren']);
let cms = new Set(['后盾人', 'hdcms']);
let newSet = [...hd, ...cms];
console.log(newSet);
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#weakset)WeakSet

WeakSet结构同样不会存储重复的值，它的成员必须只能是对象类型的值。

- 垃圾回收不考虑WeakSet，即被WeakSet引用时引用计数器不加一，所以对象不被引用时不管WeakSet是否在使用都将删除
- 因为WeakSet 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行`forEach( )`遍历等操作
- 也是因为弱引用，WeakSet 结构没有keys( )，values( )，entries( )等方法和size属性
- 因为是弱引用所以当外部引用删除时，希望自动删除数据时使用 `WeakMap`

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#声明定义)声明定义

以下操作由于数据不是对象类型将产生错误

```text
new WeakSet(["hdcms", "houdunren"]); //Invalid value used in weak set

new WeakSet("hdcms"); //Invalid value used in weak set
```

WeakSet的值必须为对象类型

```text
new WeakSet([["hdcms"], ["houdunren"]]);
```

将DOM节点保存到`WeakSet`

```text
document.querySelectorAll("button").forEach(item => Wset.add(item));
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#基本操作)基本操作

下面是WeakSet的常用指令

```text
const hd = new WeakSet();
const arr = ["hdcms"];
//添加操作
hd.add(arr);
console.log(hd.has(arr));

//删除操作
hd.delete(arr);

//检索判断
console.log(hd.has(arr));
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#垃圾回收)垃圾回收

WeaSet保存的对象不会增加引用计数器，如果一个对象不被引用了会自动删除。

- 下例中的数组被 `arr` 引用了，引用计数器+1
- 数据又添加到了 hd 的WeaSet中，引用计数还是1
- 当 `arr` 设置为null时，引用计数-1 此时对象引用为0
- 当垃圾回收时对象被删除，这时WakeSet也就没有记录了

```text
const hd = new WeakSet();
let arr = ["hdcms"];
hd.add(arr);
console.log(hd.has(arr));

arr = null;
console.log(hd); //WeakSet {Array(1)}

setTimeout(() => {
  console.log(hd); //WeakSet {}
}, 1000);
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#案例操作)案例操作

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-1382986.b76dd97f.gif)

```text
<style>
  * {
    padding: 0;
    margin: 0;
  }
  body {
    padding: 200px;
  }
  ul {
    list-style: none;
    display: flex;
    width: 200px;
    flex-direction: column;
  }
  li {
    height: 30px;
    border: solid 2px #e67e22;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    color: #333;
    transition: 1s;
  }
  a {
    border-radius: 3px;
    width: 20px;
    height: 20px;
    text-decoration: none;
    text-align: center;
    background: #16a085;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }
  .remove {
    border: solid 2px #eee;
    opacity: 0.8;
    color: #eee;
  }
  .remove a {
    background: #eee;
  }
</style>

<body>
  <ul>
    <li>houdunren.com <a href="javascript:;">x</a></li>
    <li>hdcms.com <a href="javascript:;">x</a></li>
    <li>houdunwang.com <a href="javascript:;">x</a></li>
  </ul>
</body>

<script>
  class Todos {
    constructor() {}
    run() {
      this.items = document.querySelectorAll("ul>li");
      this.lists = new WeakSet();
      this.record();
      this.addEvent();
    }
    addEvent() {
      this.items.forEach(item => {
        item.querySelector("a").addEventListener("click", event => {
          //检测WakeSet中是否存在Li元素
          const parentElement = event.target.parentElement;
          if (!this.lists.has(parentElement)) {
            alert("已经删除此TODO");
          } else {
            //删除后从记录的WakeSet中移除
            parentElement.classList.add("remove");
            this.lists.delete(parentElement);
          }
        });
      });
    }
    record() {
      this.items.forEach(item => this.lists.add(item));
    }
  }
  new Todos().run();
</script>
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#map)Map

Map是一组键值对的结构，用于解决以往不能用对象做为键的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#声明定义-2)声明定义

可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组。

```text
let m = new Map([
  ['houdunren', '后盾人'],
  ['hdcms', '开源系统']
]);

console.log(m.get('houdunren')); //后盾人
```

使用`set` 方法添加元素，支持链式操作

```text
let map = new Map();
let obj = {
  name: "后盾人"
};

map.set(obj, "houdunren.com").set("name", "hdcms");

console.log(map.entries()); //MapIterator {{…} => "houdunren.com", "name" => "hdcms"}
```

使用构造函数`new Map`创建的原理如下

```text
const hd = new Map();
const arr = [["houdunren", "后盾人"], ["hdcms", "开源系统"]];

arr.forEach(([key, value]) => {
  hd.set(key, value);
});
console.log(hd);
```

对于键是对象的`Map`， 键保存的是内存地址，值相同但内存地址不同的视为两个键。

```text
let arr = ["后盾人"];
const hd = new Map();
hd.set(arr, "houdunren.com");
console.log(hd.get(arr)); //houdunren.com
console.log(hd.get(["后盾人"])); //undefined
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#获取数量-2)获取数量

获取数据数量

```text
console.log(map.size);
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#元素检测-2)元素检测

检测元素是否存在

```text
console.log(map.has(obj1));
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#读取元素)读取元素

```text
let map = new Map();

let obj = {
	name: '后盾人'
}

map.set(obj, 'houdunren.com');
console.log(map.get(obj));
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#删除元素-2)删除元素

使用 `delete()` 方法删除单个元素

```text
let map = new Map();
let obj = {
	name: '后盾人'
}

map.set(obj, 'houdunren.com');
console.log(map.get(obj));

map.delete(obj);
console.log(map.get(obj));
```

使用`clear`方法清除Map所有元素

```text
let map = new Map();
let obj1 = {
	name: 'hdcms.com'
}

let obj2 = {
	name: 'houdunren.com'
}

map.set(obj1, {
	title: '内容管理系统'
});

map.set(obj2, {
	title: '后盾人'
});

console.log(map.size);
console.log(map.clear());
console.log(map.size);
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#遍历数据-2)遍历数据

使用 `keys()/values()/entries()` 都可以返回可遍历的迭代对象。

```text
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
console.log(hd.keys()); //MapIterator {"houdunren", "hdcms"}
console.log(hd.values()); //MapIterator {"后盾人", "开源系统"}
console.log(hd.entries()); //MapIterator {"houdunren" => "后盾人", "hdcms" => "开源系统"}
```

可以使用`keys/values` 函数遍历键与值

```text
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
for (const key of hd.keys()) {
  console.log(key);
}
for (const value of hd.values()) {
  console.log(value);
}
```

使用`for/of`遍历操作，直播遍历Map 等同于使用`entries()` 函数

```text
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
for (const [key, value] of hd) {
  console.log(`${key}=>${value}`);
}
```

使用`forEach`遍历操作

```text
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);
hd.forEach((value, key) => {
  console.log(`${key}=>${value}`);
});
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#数组转换-2)数组转换

可以使用`展开语法` 或 `Array.form` 静态方法将Set类型转为数组，这样就可以使用数组处理函数了

```text
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);

console.log(...hd); //(2) ["houdunren", "后盾人"] (2) ["hdcms", "开源系统"]
console.log(...hd.entries()); //(2) ["houdunren", "后盾人"] (2) ["hdcms", "开源系统"]
console.log(...hd.values()); //后盾人 开源系统
console.log(...hd.keys()); //houdunren hdcms
```

检索包含`后盾人`的值组成新Map

```text
let hd = new Map([["houdunren", "后盾人"], ["hdcms", "开源系统"]]);

let newArr = [...hd].filter(function(item) {
  return item[1].includes("后盾人");
});

hd = new Map(newArr);
console.log(...hd.keys());
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#节点集合)节点集合

map的key可以为任意类型，下面使用DOM节点做为键来记录数据。

```text
<body>
  <div desc="后盾人">houdunren</div>
  <div desc="开源系统">hdcms</div>
</body>

<script>
  const divMap = new Map();
  const divs = document.querySelectorAll("div");

  divs.forEach(div => {
    divMap.set(div, {
      content: div.getAttribute("desc")
    });
  });
  divMap.forEach((config, elem) => {
    elem.addEventListener("click", function() {
      alert(divMap.get(this).content);
    });
  });
</script>
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#实例操作)实例操作

当不接受协议时无法提交表单，并根据自定义信息提示用户。

```text
<form action="" onsubmit="return post()">
    接受协议:
    <input type="checkbox" name="agreement" message="请接受接受协议" />
    我是学生:
    <input type="checkbox" name="student" message="网站只对学生开放" />
    <input type="submit" />
  </form>
</body>

<script>
  function post() {
    let map = new Map();

    let inputs = document.querySelectorAll("[message]");
    //使用set设置数据
    inputs.forEach(item =>
      map.set(item, {
        message: item.getAttribute("message"),
        status: item.checked
      })
    );

    //遍历Map数据
    return [...map].every(([item, config]) => {
      config.status || alert(config.message);
      return config.status;
    });
  }
</script>
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#weakmap)WeakMap

**WeakMap** 对象是一组键/值对的集

- 键名必须是对象
- WeaMap对键名是弱引用的，键值是正常引用

- 垃圾回收不考虑WeaMap的键名，不会改变引用计数器，键在其他地方不被引用时即删除
- 因为WeakMap 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行`forEach( )`遍历等操作
- 也是因为弱引用，WeaMap 结构没有keys( )，values( )，entries( )等方法和 size 属性
- 当键的外部引用删除时，希望自动删除数据时使用 `WeakMap`

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#声明定义-3)声明定义

以下操作由于键不是对象类型将产生错误

```text
new WeakSet("hdcms"); //TypeError: Invalid value used in weak set
```

将DOM节点保存到`WeakSet`

```text
<body>
  <div>houdunren</div>
  <div>hdcms</div>
</body>
<script>
  const hd = new WeakMap();
  document
    .querySelectorAll("div")
    .forEach(item => hd.set(item, item.innerHTML));
  console.log(hd); //WeakMap {div => "hdcms", div => "houdunren"}
</script>
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#基本操作-2)基本操作

下面是WeakSet的常用指令

```text
const hd = new WeakMap();
const arr = ["hdcms"];
//添加操作
hd.set(arr, "houdunren");
console.log(hd.has(arr)); //true

//删除操作
hd.delete(arr);

//检索判断
console.log(hd.has(arr)); //false
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#垃圾回收-2)垃圾回收

WakeMap的键名对象不会增加引用计数器，如果一个对象不被引用了会自动删除。

- 下例当`hd`删除时内存即清除，因为WeakMap是弱引用不会产生引用计数
- 当垃圾回收时因为对象被删除，这时WakeMap也就没有记录了

```text
let map = new WeakMap();
let hd = {};
map.set(hd, "hdcms");
hd = null;
console.log(map);

setTimeout(() => {
  console.log(map);
}, 1000);
```

##  (http://houdunren.gitee.io/note/js/6 Set与Map.html#选课案例)选课案例

![Untitled](http://houdunren.gitee.io/note/assets/img/Untitled-3394771.86c02b15.gif)

```text
<style>
  * {
    padding: 0;
    margin: 0;
  }
  body {
    padding: 20px;
    width: 100vw;
    display: flex;
    box-sizing: border-box;
  }
  div {
    border: solid 2px #ddd;
    padding: 10px;
    flex: 1;
  }
  div:last-of-type {
    margin-left: -2px;
  }
  ul {
    list-style: none;
    display: flex;
    width: 200px;
    flex-direction: column;
  }
  li {
    height: 30px;
    border: solid 2px #e67e22;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    color: #333;
    transition: 1s;
  }
  a {
    border-radius: 3px;
    width: 20px;
    height: 20px;
    text-decoration: none;
    text-align: center;
    background: #16a085;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }
  .remove {
    border: solid 2px #eee;
    opacity: 0.8;
    color: #eee;
  }
  .remove a {
    background: #eee;
  }
  p {
    margin-top: 20px;
  }
  p span {
    display: inline-block;
    background: #16a085;
    padding: 5px;
    color: white;
    margin-right: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
</style>

<body>
  <div>
    <ul>
      <li><span>php</span> <a href="javascript:;">+</a></li>
      <li><span>js</span> <a href="javascript:;">+</a></li>
      <li><span>向军讲编程</span><a href="javascript:;">+</a></li>
    </ul>
  </div>
  <div>
    <strong id="count">共选了2门课</strong>
    <p id="lists"></p>
  </div>
</body>

<script>
  class Lesson {
    constructor() {
      this.lis = document.querySelectorAll("ul>li");
      this.countELem = document.getElementById("count");
      this.listElem = document.getElementById("lists");
      this.map = new WeakMap();
    }
    run() {
      this.lis.forEach(item => {
        item.querySelector("a").addEventListener("click", event => {
          const elem = event.target;
          const state = elem.getAttribute("select");
          if (state) {
            elem.removeAttribute("select");
            this.map.delete(elem.parentElement);
            elem.innerHTML = "+";
            elem.style.backgroundColor = "green";
          } else {
            elem.setAttribute("select", true);
            this.map.set(elem.parentElement, true);
            elem.innerHTML = "-";
            elem.style.backgroundColor = "red";
          }
          this.render();
        });
      });
    }
    count() {
      return [...this.lis].reduce((count, item) => {
        return (count += this.map.has(item) ? 1 : 0);
      }, 0);
    }
    lists() {
      return [...this.lis]
        .filter(item => {
          return this.map.has(item);
        })
        .map(item => {
          return `<span>${item.querySelector("span").innerHTML}</span>`;
        });
    }
    render() {
      this.countELem.innerHTML = `共选了${this.count()}课`;
      this.listElem.innerHTML = this.lists().join("");
    }
  }
  new Lesson().run();
</script>
```

