---
title: 动态链接库 dllPlugin
---

## 动态链接库 dllPlugin

>  在使用webpack进行打包时候，对于依赖的第三方库，比如vue，vuex等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库，那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，那么webpack就不会对这些库去打包，这样的可以快速的提高打包的速度。因此为了解决这个问题，DllPlugin 和 DllReferencePlugin插件就产生了。

>  DLLPlugin 它能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。

>  安装插件

```
yarn add react react-dom
```

>  优化 react react-dom 不再重新打包

>  根目录创建 webpack.config.react.js 配置

```
let path = require('path');

module.exports = {
  mode:'development',
  entry:{
    test:'./src/test.js',
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  }
}
```

>  src 创建 src / test.js

```
module.exports = 'kevin';
```

```
npx webpack --config webpack.config.react.js
```