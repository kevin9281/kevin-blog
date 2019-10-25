---
title: 可视化创建vue
---

## 可视化创建vue

>  使用 vue ui 图形化界面 创建项目(打开也是一样)
```
vue ui
```

>  填写项目名称 包管理器 git初始化提交信息

>  点击下一步 进入预设

>  点击手动就 进入功能

>  pwa 技术 允许网页构建到手机桌面上

>  使用配置文件打开 简化 jackage.json 内的功能 使各自的配置 保存到各自的文件中

>  点击下一步 进入配置

>  选择ESLint 语法规则配置 Select 里面有很多选择 (ESLint + Standard config) //ESLint 加 标准的规则

>  Pick additional lint features: //选择eslint的功能项

>  Lint on save //当cart s的时候进行语法校验

>  Lint and fix on commit //当提交的时候 eslint自动解决掉有问题的语法 (不建议开启)

>  点击创建项目 弹出 预设名 下次如果需要这个预设的话 就可以直接使用

>  创建好了后的图形界面 侧边栏有5个选项

>  插件(基于依赖封装出来的): 已经安装的插件会列出来 也可以查看插件官方文档

```
比如: 搜索 element-ui 
就会弹出 vue-cli-plugin-element 点击图标后
右下角弹出安装 点击就可以实现自动安装
然后配置插件 
How do you want to import Element? (你想用哪种方式来引入Element)
    Fully import(完整引入可能导致项目体积过大)
    Import on demand(按需引入 推荐)
Choose the locale you want to load(选择语言模式)
    zh-CN(推荐选择中文)
点击完成 就可以自动化安装
修改过的文件 都会被自动化显示出来 可以做git提交
就可以查看 src / plugins / element.js 
main.js 也会自动引入
```

```
插件和依赖的区别是: 插件会进行自动化配置,如果是依赖 还需要手动配置
```


>  依赖: 

```
运行依赖: package.json / dependencies 下记录的包的名字
    
开发依赖: package.json / devDependencies 下记录的包的名字
    
安装mockjs 点击安装依赖
    搜索mockjs 安装成运行依赖 就实现自动化安装 
    (可视化安装的时候 不要使用编辑器内文件)
```

>  配置:  

```
可以更改输出目录,静态资源等等....
```

>  任务:  

```
serve(开发): 可以直接在可视化界面中 让项目跑起来 可以看到各种速度统计 文件大小 和 依赖项 可以详细的看到 优化的重点对象 
点击控制台 启动app 就可以自动打开页面 
分析:标识项目中各种资源的体积 由圆形图标识出来 外环是内环的子集 可以看到所有使用的东西 
输出: 有报错的 就在此处显示

build(生产) : 点击build 就打包压缩
```
