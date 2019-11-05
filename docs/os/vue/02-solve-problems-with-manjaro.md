---
title: vue 后台管理界面搭建
---

## 1.创建脚手架

   在当前目录 vue ui 默认配置

   然后在插件选择 安装插件 vue-cli-plugin-element

    默认引入 不用scss zh-CN 中文

    main.js中就会自动引入

## 2.创建导航栏 nav

   使用的element ui 的组件

   app.vue

```
<template  
  <div id="app"  
    <myheader  </myheader  
    <section class="s-body"  
      <div class="s-body-sidebar"  
        <mysidebar  </mysidebar  
      </div  
      <article class="s-right"  
        <!-- 右边是由路由跳转 所以面包屑导航应该在对顶部不变 --  
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs"  
          <el-breadcrumb-item :to="{ path: '/' }"  首页</el-breadcrumb-item  
          <el-breadcrumb-item  用户管理</el-breadcrumb-item  
          <el-breadcrumb-item :to="{ path: '/userlist' }"  用户列表</el-breadcrumb-item  
        </el-breadcrumb  
        <!-- 路由出口 --  
        <!-- 路由匹配到的组件将渲染在这里 --  
        <router-view  </router-view  
      </article  
    </section  
  </div  
</template  

<script  
import { myheader, mysidebar } from "./components"

export default {
  components: {
    myheader,
    mysidebar
  },
  data() {
    return {}
  },
  methods: {}
}
</script  

<style  
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

#app {
  /* 总体 */
  display: flex;
  flex-direction: column; /* 上下排列 */
  height: 100vh;
}

.s-body {
  /* 内容主体 */
  display: flex;
  flex: 1;
}

.s-right {
  /* 右边内容 */
  flex: 1;
  padding: 10px;
  background: #fff;
}
</style  

```

   header.vue

```
<template  
  <div class="nav"  
    <div class="logo"  xx后台管理系统</div  
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      
      <el-submenu index="1"  
        <template slot="title"  管理员</template  
        <el-menu-item index="1-1"  登录</el-menu-item  
        <el-menu-item index="1-2"  注册</el-menu-item  
      </el-submenu  
      <el-menu-item index="2"  退出</el-menu-item  
    </el-menu  
  </div  
</template  

<script  
export default {
  data() {
    return {}
  },
  methods: {}
}
</script  

<style  
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #545c64;
  padding: 0 20px;
}
.nav .logo {
  color: #fff;
  font-size: 28px;
  letter-spacing: 3px; /* css 艺术字 */
}
</style  
```

## 3.便捷导入组件

   引入组件的便捷方式 因为每一个组件都只有一个出口 写一个index.js作为出口 外面只需要引入index.js即可 

   index.js 作为一个中转站

```
// 导出 创建这个方法 方法内部是导入文件
// 页面中就可以直接使用
export let myheader = () =   import("./header.vue")
export let mysidebar = () =   import("./sidebar.vue")

```

   app.vue 主文件内部就可以使用导入

```
import { myheader , mysidebar } from "./components"
```

```
<template  
  <div id="app"  
    <myheader  </myheader  
    <section class="s-body"  
      <mysidebar  </mysidebar  
      <article class="s-right"  </article  
    </section  
  </div  
</template  
```

## 4.侧边栏导航

   sidebar .vue

```
<template  
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="false"
    router
    
    <el-menu-item index="4" route="/"  
      <i class="el-icon-setting"  </i  
      <span slot="title"  工作平台</span  
    </el-menu-item  
    <el-submenu index="1"  
      <template slot="title"  
        <i class="el-icon-location"  </i  
        <span slot="title"  用户管理</span  
      </template  
      <el-menu-item-group  
        <el-menu-item index="1-1" route="/userlist"  用户列表</el-menu-item  
      </el-menu-item-group  
      <el-menu-item-group  
        <el-menu-item index="1-2" route="/adduser"  添加用户</el-menu-item  
      </el-menu-item-group  
    </el-submenu  
  </el-menu  
</template  

<script  
export default {}
</script  

<style  
/* s */

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.s-body {
  background: #545c64;
}
.el-menu-item-group__title{
  padding: 0;
}
</style  
```

   app.vue 
   给侧边栏设置高度 让主题内容后边撑满

```
<template  
  <div id="app"  
    <myheader  </myheader  
    <section class="s-body"  
      <div class="s-body-sidebar"  
        <mysidebar  </mysidebar  
      </div  
      <article class="s-right"  
        <!-- 右边是由路由跳转 所以面包屑导航应该在对顶部不变 --  
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs"  
          <el-breadcrumb-item :to="{ path: '/' }"  首页</el-breadcrumb-item  
          <el-breadcrumb-item  用户管理</el-breadcrumb-item  
          <el-breadcrumb-item :to="{ path: '/userlist' }"  用户列表</el-breadcrumb-item  
        </el-breadcrumb  
        <!-- 路由出口 --  
        <!-- 路由匹配到的组件将渲染在这里 --  
        <router-view  </router-view  
      </article  
    </section  
  </div  
</template  

<script  
import { myheader, mysidebar } from "./components"

export default {
  components: {
    myheader,
    mysidebar
  },
  data() {
    return {}
  },
  methods: {}
}
</script  

<style  
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

#app {
  /* 总体 */
  display: flex;
  flex-direction: column; /* 上下排列 */
  height: 100vh;
}

.s-body {
  /* 内容主体 */
  display: flex;
  flex: 1;
}

.s-right {
  /* 右边内容 */
  flex: 1;
  padding: 10px;
  background: #fff;
}
</style  

```

## 5.用户列表

   面包屑导航 + 主体内容

    view / user / userlist.vue


```
<template  
  <div class="my-body"  
    <el-table router border :data="tableData" style="width: 100%"  
      <el-table-column prop="dateof" label="日期" width="180"  </el-table-column  
      <el-table-column prop="name" label="姓名" width="180"  </el-table-column  
      <el-table-column prop="address" label="地址"  </el-table-column  
      <el-table-column label="操作"  
        <template slot-scope="scope"  
          <!-- 作用域插槽 外面可以通过scope拿到内部的值 --  
          <el-button size="mini" @click="jumped(scope.row.id)"  编辑</el-button  
          <el-button size="mini" type="danger" @click="deleteCustomer(scope.row.id)"  删除</el-button  
        </template  
      </el-table-column  
    </el-table  
    <div class="pagination"  
      <el-pagination background layout="prev, pager, next" :total="1000"  </el-pagination  
    </div  
  </div  
</template  

<script  
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getUsers() {
      this.$http.get("http://localhost:3000/users").then(function(res) {
        this.tableData = res.body
      })
    },
    jumped(id) {
      this.$router.push(`edituser/${id}`)
    },
    deleteCustomer(id) {
      this.$http
        .delete("http://localhost:3000/users/" + id)
        .then(function(res) {
          alert("删除成功!" + res)
          this.$router.go(0)
        })
    }
  },
  created() {
    this.getUsers()
  }
}
</script  

<style  
.crumbs {
  margin: 10px 0;
}
.pagination {
  text-align: center;
  margin: 10px 0;
}
</style  

```

   app.vue

```
<template  
  <div id="app"  
    <myheader  </myheader  
    <section class="s-body"  
      <div class="s-body-sidebar"  
        <mysidebar  </mysidebar  
      </div  
      <article class="s-right"  
        <!-- 右边是由路由跳转 所以面包屑导航应该在对顶部不变 --  
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs"  
          <el-breadcrumb-item :to="{ path: '/' }"  首页</el-breadcrumb-item  
          <el-breadcrumb-item  用户管理</el-breadcrumb-item  
          <el-breadcrumb-item :to="{ path: '/userlist' }"  用户列表</el-breadcrumb-item  
        </el-breadcrumb  
        <!-- 路由出口 --  
        <!-- 路由匹配到的组件将渲染在这里 --  
        <router-view  </router-view  
      </article  
    </section  
  </div  
</template  

<script  
import { myheader, mysidebar } from "./components"

export default {
  components: {
    myheader,
    mysidebar
  },
  data() {
    return {}
  },
  methods: {}
}
</script  

<style  
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

#app {
  /* 总体 */
  display: flex;
  flex-direction: column; /* 上下排列 */
  height: 100vh;
}

.s-body {
  /* 内容主体 */
  display: flex;
  flex: 1;
}

.s-right {
  /* 右边内容 */
  flex: 1;
  padding: 10px;
  background: #fff;
}
</style  



```

## 6.vue-router

   管理系统都是个单页面应用

```
导航栏 侧边栏 面包屑导航 都是不变动的 只有中间主体内容变化  


先安装依赖 vue-router  

然后配置路由 src目录下创建 routes / index.js

src目录下 创建 view / user / userlish.vue  用户文件夹中创建 userlist.vue 用户列表
```

   main.js 中注册路由

```
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './routes'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  router,
  render: h =   h(App),
}).$mount('#app')

```

   routes / index.js配置路由

```
import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: "/",
      component: () =   import('@/view/home')
    },
    {
      path: "/userlist",
      component: () =   import('@/view/users/userlist')
    },
    {
      path: "/edituser/:id",
      component: () =   import('@/view/users/edituser')
    },
    {
      path: "/adduser",
      component: () =   import('@/view/users/adduser')
    }
  ]
})

export default router
```

    app.vue 中只需要标签即可将其渲染

```
  <!-- 路由出口 --  
  <!-- 路由匹配到的组件将渲染在这里 --  
<router-view  </router-view  
```

## 7.使用echarts

   安装依赖 echarts  

    npm install echarts --save

   就可以直接使用

   home.vue

```
<template  
  <div  
    <div id="main" class="home-main"  </div  
  </div  
</template  

<script  
import echarts from 'echarts'

export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"))
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script  

<style  
.home-main {
  width: 500px;
  height: 300px;
}
</style  
```

## 8.使用蚂蚁AntV

   安装依赖 npm install @antv/g2 --save

   成功安装完成之后，即可使用 import 或 require 进行引用。

```
<template  
  <div  
    <p class="gg"  G2 示例</p  
    <div id="c1"  </div  
    <br  
  </div  
</template  

<script  
import G2 from "@antv/g2"

export default {
  methods: {
    aaa() {
      const data = [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 }
      ] // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      const chart = new G2.Chart({
        container: "c1", // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 300 // 指定图表高度
      })
      // Step 2: 载入数据源
      chart.source(data)
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .interval()
        .position("genre*sold")
        .color("genre")
      // Step 4: 渲染图表
      chart.render()
    }
  },
  mounted() {
    //此处调用G2 
    this.aaa()
  }
}
</script  

<style  
.gg {
  padding-left: 20px;
  font-size: 17px;
}
</style  

```

## 9.使用highcharts

   安装依赖 npm install highcharts --save

    使用 highcharts 还需要jquery

   home.vue

```
<template  
  <div  
    <p class="gg"  Highcharts 示例中国地图</p  
    <div id="highmaps" class="container"  </div  
  </div  
</template  

<script  
import Highcharts from "highcharts/highstock"
import Highmaps from "highcharts/modules/map"
import $ from "jquery"
Highmaps(Highcharts)

export default {
  methods: {
    //highmaps是中国地图
    highmaps() {
      Highcharts.setOptions({
        lang: {
          drillUpText: "< 返回 “{series.name}”"
        }
      })
      var map = null,
        geochina = "https://data.jianshukeji.com/jsonp?filename=geochina/"
      $.getJSON(geochina + "china.json&callback=?", function(mapdata) {
        var data = []
        // 随机数据
        Highcharts.each(mapdata.features, function(md) {
          var tmp = {
            name: md.properties.name,
            value: Math.floor(Math.random() * 100 + 1) // 生成 1 ~ 100 随机值
          }
          if (md.properties.drilldown) {
            tmp.drilldown = md.properties.drilldown
          }
          data.push(tmp)
        })
        map = new Highcharts.Map("highmaps", {
          chart: {
            events: {
              drilldown: function(e) {
                //console.log(e)
                // 异步下钻
                if (e.point.drilldown) {
                  var pointName = e.point.properties.fullname
                  map.showLoading("下钻中，请稍后...")
                  // 获取二级行政地区数据并更新图表
                  $.getJSON(
                    geochina + e.point.drilldown + ".json&callback=?",
                    function(data) {
                      data = Highcharts.geojson(data)
                      Highcharts.each(data, function(d) {
                        if (d.properties.drilldown) {
                          d.drilldown = d.properties.drilldown
                        }
                        d.value = Math.floor(Math.random() * 100 + 1) // 生成 1 ~ 100 随机值
                      })
                      map.hideLoading()
                      map.addSeriesAsDrilldown(e.point, {
                        name: e.point.name,
                        data: data,
                        dataLabels: {
                          enabled: true,
                          format: "{point.name}"
                        }
                      })
                      map.setTitle({
                        text: pointName
                      })
                    }
                  )
                }
              },
              drillup: function() {
                map.setTitle({
                  text: "中国"
                })
              }
            }
          },
          title: {
            text: "中国地图"
          },
          subtitle: {
            text:
              '<a href="https://www.hcharts.cn/mapdata"  点击查看地图数据及详情，注意县级数据为收费数据，如果您有需要，请联系我们购买</a  '
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: "bottom"
            }
          },
          tooltip: {
            useHTML: true,
            headerFormat: "<table  <tr  <td  {point.name}</td  </tr  ",
            pointFormat:
              "<tr  <td  全称</td  <td  {point.properties.fullname}</td  </tr  " +
              "<tr  <td  行政编号</td  <td  {point.properties.areacode}</td  </tr  " +
              "<tr  <td  父级</td  <td  {point.properties.parent}</td  </tr  " +
              "<tr  <td  经纬度</td  <td  {point.properties.longitude},{point.properties.latitude}</td  </tr  ",
            footerFormat: "</table  "
          },
          colorAxis: {
            min: 0,
            minColor: "#fff",
            maxColor: "#006cee",
            labels: {
              style: {
                color: "red",
                fontWeight: "bold"
              }
            }
          },
          series: [
            {
              data: data,
              mapData: mapdata,
              joinBy: "name",
              name: "中国地图",
              states: {
                hover: {
                  color: "#a4edba"
                }
              }
            }
          ]
        })
      })
    },
  },
  mounted() {
    //此处调用地图
    this.highmaps()
  }
}
</script  
```

## 10.使用json-server

   完整代码

   db.json

```
{
  "users": [
    {
      "name": "莫相澧",
      "username": "adanew",
      "password": "123456",
      "dateof": "2016-05-02",
      "id": 1,
      "address": "湖南省长沙市丝茅冲",
      "companyId": 1
    },
    {
      "name": "周杰伦",
      "username": "zhoujielun123",
      "password": "adanew",
      "dateof": "2019-10-29",
      "address": "湖南省长沙市五矿紫湖香醍520",
      "id": 2
    },
    {
      "name": "范冰冰",
      "username": "adanew123123",
      "password": "adanew",
      "dateof": "2019-10-29",
      "address": "湖南省长沙市丝茅冲",
      "id": 3
    }
  ]
}
```