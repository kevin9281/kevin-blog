---
title: 部署和发布
---

## 12.部署和发布

>  1.生产环境下的编译

```
1.1 生产环境下就不会有这些端口了 不需要在服务器上运行 npm run serve 这种命令了
1.2 只会当成纯粹的 html 访问
1.3 把admin web 都编译到server里面的某一个静态文件夹 让他可以访问到
    当访问localhost:3000的时候就访问web端
    当访问localhost:3000/admin 的时候就访问后台
1.4 在admin 输入命令 npm run build 生产模式
    会压缩代码 在源文件生成一个dist文件夹 里面会生成纯粹的html css js
1.5 安装插件 npm i -g serve
    就可以启动 serve dist 直接启动admin 端口 可以登录可以查看 只要开启了数据库
    dist文件夹复制到任何地方 启动一个web服务器就可以访问
1.6 接口地址需要根据开发和编译来进行替换 不然访问的3000本地域名
    更改http.js 静态写死的localhost:3000接口地址  改成动态/绝对地址(不能包含主机名)
    baseURL: process.env.VUE_APP_API_URL || 'admin/api',
1.7 在admin根文件目录 添加一个环境变量文件 
    .env.development (开发环境下用的vue变量) 本地访问的地址添加
    然后再编译 js文件内就不会有 localhost:3000的字节了
1.8 直接把 admin/dist 文件夹 复制到 server 然后改名为admin
    然后更改 server/index.js 静态托管
    更改html内应用生成css js 的地址 admin/vue.config.js 创建vue cli的配置文件
1.9 在前端 main.js 内更改baseURL 更改接口地址
    同样创建 web/vue.config.js    web/.env.development 
```

>  2 . 购买域名和服务器

```
    买好域名服务器后
   mac 直接终端 ssh rouut@47.75.79.126
   windows 直接官网远程连接 远程密码复制好 不出现第二次
  logon root  然后输入 password 
```

>  3.域名解析
>   同样就可以访问公共ip 和域名

>  4.Nginx 安装和配置