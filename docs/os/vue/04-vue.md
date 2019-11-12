---
title: vue 封装的组件
---



## 1. Table 组件

```
1.在components下创建组件 Table.vue

<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column label="日期" width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="住址" width="180">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date:'2019年10月19日',
          name:'莫相澧',
          address:'湖南省丝茅冲'
        }
      ]
    };
  },
  methods:{
    handleEdit(){
      console.log(123);
    },
    handleDelete(){
      console.log(456);
    }
  },

};
</script>

<style scoped>
</style>
```

```
2. 在需要使用的页面地方引入

<template>
  <Table></Table>
</template>

<script>
import Table from '@/components/Table.vue'

export default {
  name: 'about',
  components: {
    Table
  }
}
</script>

```

## 2.Charts 组件

**1.先安装 echarts**

```
npm i v-charts echarts -S
```



```
2. 在components下创建组件 Charts.vue

<template>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  components: { VeLine },
  data () {
    return {
      chartData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      }
    }
  }
}
</script>
```



```
3. 在需要使用的页面地方引入

<template>
  <Charts></Charts>
</template>

<script>
import Charts from "@/components/Charts.vue";

export default {
  name: 'about',
  components: {
    Charts
  }
}
</script>
```

