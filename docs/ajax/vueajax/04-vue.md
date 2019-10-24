---
title: vue 中间件
---

## 中间件管道

>  通常，在构建SPA时，需要保护某些路由。例如假设有一个只允许经过身份验证的用户访问的 dashboard 路由，我们可以通过使用 auth 中间件来确保合法用户才能访问它。

>  在本教程中，我们将学到怎样用 Vue-Router 为Vue应用程序实现中间件管道。

>  什么是中间件管道？

>  中间件管道（middleware pipeline）是一堆彼此并行运行的不同的中间件。

>  继续前面的案例，假设在 /dashboard/movies 上有另一个路由，我们只希望订阅用户可以访问。我们已经知道要访问 dashboard 路由，你需要进行身份验证。那么应该怎样保护 /dashboard/movies 路由以确保只有经过身份验证和订阅的用户才能访问呢？通过使用中间件管道，可以将多个中间件链接在一起并确保它们能够并行运行。

>  开始

>  首先用 Vue CLI 快速构建一个新的 Vue 项目。

```
vue create vue-middleware-pipeline
```

>  安装依赖项
> 创建并安装项目目录后，切换到新创建的目录并从终端运行以下命令：

```
npm i vue-router vuex
```

>  Vue-router — 是Vue.js的官方路由器
>  Vuex — 是 Vue 的状态管理库

>  创建组件

>  我们的程序将包含三个组件。

```
Login — 此组件展示给尚未通过身份验证的用户。

Dashboard — 此组件展示给已登录的用户。

Movies — 我们会向已登录并拥有有效订阅的用户显示此组件。
```

>  让我们创建这些组件。切换到 src/components 目录并创建以下文件：Dashboard.vue、Login.vue和Movies.vue

>  使用以下代码编辑 Login.vue 文件：

```
<template>
  <div>
    <p>This is the Login component</p>
  </div>
</template>
```

>  使用以下代码编辑 Dashboard.vue 文件：

```
<template>
  <div>
    <p>This is the Dashboard component for authenticated users</p>
    <router-view/>
  </div>
</template>
```

>  最后，将以下代码添加到 Movies.vue 文件中

```
<template>
  <div>
    <p>This is the Movies component for authenticated and subscribed users</p>
  </div>
</template>
```

>  创建store
>  就 Vuex 而言，store 只是一个用于保存我们程序状态的容器。它允许我们确定用户是否经过身份验证以及检查用户是否已订阅。
>  在 src 文件夹中，创建一个 store.js 文件并将以下代码添加到该文件中：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            isSubscribed: false
        }
    },
    getters: {
        auth(state) {
            return state.user
        }
    }
})
```

>  store 在其 状态 内包含一个 user 对象。 user 对象包含 loggedIn 和 isSubscribed 属性，它可以帮助我们确定用户是否已登录并具有有效订阅。我们还在 store 中定义了一个 getter 来返回 user 对象。

>  定义路由
>  在创建路由之前，应该先定义它们，并关联将要附加到其上的对应的中间件。
>  除了通过身份验证的用户之外，每个人都可以访问 /login。当通过身份验证的用户访问此路由时，应重定向到 dashboard 路由。这条路由应该附有一个 guest 中间件。
>  只有通过身份验证的用户才能访问 /dashboard。否则用户在访问此路由时应重定向到 /login 路由。我们把 auth 中间件与此路由相关联。
>  只有通过身份验并订阅的用户才能访问 /dashboard/movies。该路由受到 isSubscribed和 auth 中间件的保护。

>  创建路由

>  接下来，在 src 目录中创建一 个router 文件夹，然后在该文件夹中创建一个 router.js 文件。使用以下代码编辑文件：

```
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Movies from '../components/Movies'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            children: [{
                path: '/dashboard/movies',
                name: 'dashboard.movies',
                component: Movies
            }
        ],
        }
    ]
})


export default router
```

>  在这里，我们创建了一个新的 router 实例，同时传递了几个配置选项以及一个 routes 属性，它接受我们之前定义的所有路由。要注意目前这些路由还都是不受保护的。我们很快就会解决这个问题。

>  接下来将路由和 store 注入Vue 实例。使用以下代码编辑 src/main.js 文件：

```
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
```

##  创建中间件

>  在 src/router 目录中创建一个 middleware 文件夹，然后在该文件夹下创建 guest.js，auth.js和IsSubscribed.js文件。将以下代码添加到 guest.js 文件中：


```
export default function guest ({ next, store }){
    if(store.getters.auth.loggedIn){
        return next({
           name: 'dashboard'
        })
    }

    return next()
   }
```

>  guest 中间件检查用户是否通过了身份验证。如果通过了身份验证就会被重定向到 dashboard 路径。

>  接下来，用以下代码编辑 auth.js 文件：

```
export default function auth ({ next, store }){
 if(!store.getters.auth.loggedIn){
     return next({
        name: 'login'
     })
 }

 return next()
}
```

>  在 auth 中间件中，我们用 store 检查用户当前是否已经 authenticated。根据用户是否已经登录，我们要么继续请求，要么将其重定向到登录页面。

>  使用以下代码编辑 isSubscribed.js 文件：

```
export default function isSubscribed ({ next, store }){
    if(!store.getters.auth.isSubscribed){
        return next({
           name: 'dashboard'
        })
    }

    return next()
   }
```

>  isSubscribed 中的中间件类似于 auth 中间件。我们用 store检查用户是否订阅。如果用户已订阅，那么他们可以访问预期路由，否则将其重定向回 dashboard 页面。

>  保护路由

>  现在已经创建了所有中间件，让我们利用它们来保护路由。使用以下代码编辑 src/router/router.js 文件：

```
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Movies from '../components/Movies'

import guest from './middleware/guest'
import auth from './middleware/auth'
import isSubscribed from './middleware/isSubscribed'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                middleware: [
                    auth
                ]
            },
            children: [{
                path: '/dashboard/movies',
                name: 'dashboard.movies',
                component: Movies,
                meta: {
                    middleware: [
                        auth,
                        isSubscribed
                    ]
                }
            }],
        }
    ]
})

export default router
```

>  在这里，我们导入了所有中间件，然后为每个路由定义了一个包含中间件数组的元字段。中间件数组包含我们希望与特定路由关联的所有中间件。

>  Vue 路由导航守卫

>  我们使用 Vue Router 提供的导航守卫来保护路由。这些导航守卫主要通过重定向或取消路由的方式来保护路由。

>  其中一个守卫是全局守卫，它通常是在触发路线之前调用的钩子。要注册一个全局的前卫，需要在 router 实例上定义一个 beforeEach 方法。

```
const router = new Router({ ... })
router.beforeEach((to, from, next) => {
 //necessary logic to resolve the hook
})

beforeEach 方法接收三个参数：

to: 这是我们打算访问的路由。

from: 这是我们目前的路由。

next: 这是调用钩子的 function
```

>  运行中间件

>  使用 beforeEach 钩子可以运行我们的中间件。

```
const router = new Router({ ...})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context
    })
})
```

>  我们首先检查当前正在处理的路由是否有一个包含 middleware 属性的元字段。如果找到 middleware 属性，就将它分配给 const 变量。接下来定义一个 context 对象，其中包含我们需要传递给每个中间件的所有内容。然后，把中间件数组中的第一个中间件做为函数去调用，同时传入 context 对象。

>  尝试访问 /dashboard 路由，你应该被重定向到 login 路由。这是因为 /src/store.js 中的 store.state.user.loggedIn 属性被设置为 false。将 store.state.user.loggedIn 属性改为 true，就应该能够访问 /dashboard 路由。

>  现在中间件正在运行，但这并不是我们想要的方式。我们的目标是实现一个管道，可以针对特定路径运行多个中间件。

```
return middleware[0]({ …context})
```

>  注意上面代码块中的这行代码，我们只调用从 meta 字段中的中间件数组传递的第一个中间件。那么我们怎样确保数组中包含的其他中间件（如果有的话）也被调用呢？这就是管道派上用场的地方。

>  创建管道

>  切换到 src/router 目录，然后创建一个 middlewarePipeline.js 文件。将以下代码添加到文件中：

```
function middlewarePipeline (context, middleware, index) {
    const nextMiddleware = middleware[index]

    if(!nextMiddleware){
        return context.next 
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )

        nextMiddleware({ ...context, next: nextPipeline })

    }
}

export default middlewarePipeline
```

>  middlewarePipeline 有三个参数：

```
context: 这是我们之前创建的 context 对象，它可以传递给栈中的每个中间件。

middleware: 这是在 route 的 meta 字段上定义的middleware 数组本身。

index: 这是在 middleware 数组中运行的当前中间件的 index。
```

```
const nextMiddleware = middleware[index]
if(!nextMiddleware){
return context.next
}
```

>  在这里，我们只是在传递给 middlewarePipeline 函数的 index 中拔出中间件。如果在 index 没有找到 middleware，则返回默认的 next 回调。

```
return () => {
const nextPipeline = middlewarePipeline(
context, middleware, index + 1
)
nextMiddleware({ ...context, next: nextPipeline })
}
```

>  我们调用 nextMiddleware 来传递 context， 然后传递 nextPipeline const。值得注意的是，middlewarePipeline 函数是一个递归函数，它将调用自身来获取下一个在堆栈中运行的中间件，同时将index增加为1。

>  把它们放在一起
>  让我们使用middlewarePipeline。像下面这段代码一样编辑 src/router/router.js 文件：

```
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Movies from '../components/Movies'

import guest from './middleware/guest'
import auth from './middleware/auth'
import isSubscribed from './middleware/isSubscribed'
import middlewarePipeline from './middlewarePipeline'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                middleware: [
                    auth
                ]
            },
            children: [{
                path: '/dashboard/movies',
                name: 'dashboard.movies',
                component: Movies,
                meta: {
                    middleware: [
                        auth,
                        isSubscribed
                    ]
                }
            }],
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
```

>  在这里，我们使用 <code> middlewarePipeline <code>来运行栈中包含的后续中间件。

```
return middleware[0]({
...context,
next: middlewarePipeline(context, middleware, 1)
})
```

>  在调用第一个中间件之后，使用 middlewarePipeline 函数，还会调用栈中包含的后续中间件，直到不再有中间件可用。

>  如果你访问 /dashboard/movies 路由，应该被重定向到 /dashboard。这是因为 user 当前是 authenticated 但没有有效订阅。如果将 store 中的 store.state.user.isSubscribed 属性设置为 true，就应该可以访问 /dashboard/movies 路由了。

>  结论

>  中间件是保护应用中不同路由的好方法。这是一个非常简单的实现，可以使用多个中间件来保护 Vue 应用中的单个路由。你可以在（https://github.com/Dotunj/vue-middleware-pipelines）找到所有的源码。


