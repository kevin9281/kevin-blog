---
title: 安装使用mock
---

## 安装使用mock

   删除多余的不需要的 

   初始格式化的时候 只要使用格式化就会在末尾添加分号 
   在根目录创建.prettierrc 配置文件就可以让格式化的时候 使用方便
```
{
  "semi":false,    //格式化代码的时候不要分号
  "singleQuote":true  //使用单引号来代替双引号
}
```

    使用mock 模拟数据接口
   src / mock / index.js 文件

```
Mock.mock( rurl?, rtype?, template|function( options ) )
第一个参数代表要拦截的请求地址 就是api接口
第二个参数是拦截的类型
第三个是访问的假数据
```
   在入口文件 main.js 中导入即可使用

```
// 导入mock
import './mock/'
```

   找到可视化界面的依赖
   安装 axios依赖 在main.js中配置
```
import axios from 'axios'
Vue.prototype.$http = axios
```

