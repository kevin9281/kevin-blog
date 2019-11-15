---
title: 12.模型设计
---

## 模型设计

模块是比对象与函数更大的单元，使用模块组织程序便于维护与扩展。

- 虽然JS没有命名空间的概念，使用模块可以解决全局变量冲突
- 模块需要隐藏内部实现，只对外开发接口
- 模块可以避免滥用全局变量，造成代码不可控

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#实现原理)实现原理

下面通过定义一个类似 `require.js` 的 `AMD` 模块管理引擎，来体验模块的使用。

```text
let Module = (function() {
  //模块列表集合
  let moduleList = {};

  function define(name, modules, func) {
    for (var i = 0; i < modules.length; i++) {
      //提取模块
      modules[i] = moduleList[modules[i]];
    }
    moduleList[name] = func.apply(func, modules);
  }
  return {
    define
  };
})();

//声明模块
Module.define("user", [], function() {
  return {
    show() {
      return "user module";
    }
  };
});
//模块依赖
Module.define("news", ["user"], function(User) {
  console.log(User.show());
});
```

## [#](http://houdunren.gitee.io/note/js/11 模块设计.html#es6模块)ES6模块

ES6使用基于文件的模块，即一个文件一个模块。

- 使用`export` 将开发的接口导出
- 使用`import` 导入模块接口
- 使用`*`可以导入全部模块接口
- 导出是以引用方式导出，无论是标量还是对象，即模块内部变量发生变化将影响已经导入的变量

> 有关于模块打包知识请在 后盾人搜索 `webpack`

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#常用指令)常用指令

| 表达式                                           | 说明             |
| ------------------------------------------------ | ---------------- |
| export function show(){}                         | 导出函数         |
| export const name='后盾人'                       | 导出变量         |
| export class User{}                              | 导出类           |
| export default show                              | 默认导出         |
| const name = '后盾人' export {name}              | 导出已经存在变量 |
| export {name as hd_name}                         | 别名导出         |
| import defaultVar from 'houdunren.js'            | 导入默认导出     |
| import {name,show} from 'a.j'                    | 导入命名导出     |
| Import {name as hdName,show} from 'houdunren.js' | 别名导入         |
| Import * as api from 'houdunren.js'              | 导入全部接口     |

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#导出模块)导出模块

下面定义模块 `modules/houdunren.js` ，使用 `export` 导出模块接口，没有导出的变量都是模块私有的。

```text
const name = "后盾人";
const show = function() {
  return "is a module function";
};
export { name, show };
```

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#导入模块)导入模块

在html文件中导入模块，需要定义属性 `type="module"`

```text
<script src="modules/houdunren.js" type="module"></script>
<script type="module">
  import { name, show } from "/modules/houdunren.js";
  console.log(show());
</script>
```

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#批量导入)批量导入

批量导入模块接口

```text
import * as api from "/modules/houdunren.js";
console.log(api.show());
```

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#默认导出)默认导出

使用`default` 定义默认导出的接口，导入时不需要使用 `{}`

- 可以为默认导出自定义导入名称
- 只能存在一条默认导出指令

使用`export default` 导出默认接口，使用 `export {}` 导入普通接口

```text
const name = "后盾人";
const show = function() {
  return "is a module function";
};
export default show;
export { name };
```

导入默认接口时不需要使用 `{}` ，普通接口还用 `{}` 导入

```text
<script src="modules/houdunren.js" type="module"></script>
<script type="module">
  import show from "/modules/houdunren.js"; // 也可以将 show 换成自定义名称
  import { name } from "/modules/houdunren.js";
  console.log(show());
  console.log(name);
</script>
```

可以使用一条语句导入默认接口与常规接口

```text
import show, { name } from "/modules/houdunren.js";
```

### [#](http://houdunren.gitee.io/note/js/11 模块设计.html#重命名)重命名

使用 `as` 为导出的接口重命名

```text
const name = "后盾人";
const show = function() {
  return "is a module function";
};
export { name as hdName, show };
```

模块导入使用 `as` 对接口重命名

```text
<script src="modules/houdunren.js" type="module"></script>
<script type="module">
  import { show, hdName as name } from "/modules/houdunren.js";
  console.log(show());
  console.log(name);
</script>
```