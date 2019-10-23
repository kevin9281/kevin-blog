---
title: CRUD 通用接口
---

## CRUD 通用接口

>  把服务器后端页面的接口 第四个参数换成动态路径

>  1.子路由挂载的路径 加前缀改动态

>  2.把前面的所有发送请求的路径 都把 categories 删掉

>  3.加入中间键 自定义中间键

```
  app.use('/admin/api/rest/:resource', async (req,res,next) => { /* 中间键 */
    const modelName = require('inflection').classify(req.params.resource)
    /* 利用插件转换 接口路径的参数的格式 */
    /* return res.send ({ modelName }) */
    req.Model = require(`../../models/${modelName}`) 
    next()
  },router) 
```

>    4.然后把所有的请求加前缀为 req.Model
```
  const model = await req.Model.findById(req.params.id)  //示例
```