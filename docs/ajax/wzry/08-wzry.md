---
title: 后台管理员权限
---

## 后台管理员权限

>  1. 密码不能用明文保存

```
  1.1 在后端模型里面安装 npm i bcrypt 用于做密码的散列
  1.2 每次都会生成不一样的值 比md5 更安全
```

```
    password: { 
      type: String , 
      select: false,  =>用于显示或者隐藏密码明文 用户密码留空
      set ( val ) {
      return require('bcrypt').hashSync( val, 10 )
    }}
```
>    select 如为false 则不显示 不管怎么保存也不会把原来的改变