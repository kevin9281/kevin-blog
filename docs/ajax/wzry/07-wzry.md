---
title: element ui 自带插件 上传功能
---

## element ui 自带插件 上传功能

>  上传图片是我们选择图片之后 他会要发起一个异步请求 把图片传给某一个接口

>  然后在后端接口保存这张图片 保存后并返回给客户端一个图片的整个url网址是什么

>  最终前端拿到响应之后 把地址展示出来

```
参数:
:action:地址 类似表单地址form active  上传的借口地址
:on-success  : 表示成功之后做什么
:before-upload : 上传之前做什么
```

>  把服务端返回的一堆东西 把其中表示图片地址的 赋值给model.icon 就能展示图片了 同时model.icon也赋值了

>  file 字段名 (binary) 二进制

>  服务端上传接口:

>  1.安装中间键插件 专门用来上传数据的  npm i multer

>  2.服务端 后台界面 admin/index.js

```
  const multer = require('multer')
  const upload = multer({dest: __dirname + '../../uploads'}) /* 绝对地址 */
  app.post('/admin/api/upload', upload.single('file') , async(req,res) => {
    const file = req.file
    file.url = `http:localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
```

>  3.把上传文件夹使用静态文件托管  服务端 index

```
app.use('/uploads' , express.static(__dirname + '/uploads'))
```

>  4.就会多一个url 然后前端展示出来

```
  afterUpload(res){
    this.model.icon = res.url
  },
```

>  会发现无法赋值问题 vue内显示赋值

>  5.前端界面

```
<el-input v-model="model.name"></el-input>
  </el-form-item>
  <el-form-item label="图标">
    <el-input v-model="model.icon"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="$http.defaults.baseURL + '/upload'"
      :show-file-list="false"
      :on-success="afterUpload"
    >
      <img v-if="model.icon" :src="model.icon" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">保存</el-button>

<script>
export default {
  props:{
    id:{}
  },
  data(){
    return {
      model: {}
    }
  },
  methods:{
    afterUpload(res){
      this.$set(this.model, 'icon', res.url) /* VUE提供的上传 set方法 */
      // this.model.icon = res.url
    },
    async save(){
      let res 
      /* 如果有id 用 put方法提交 否则 用post */
      if(this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else{
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      /* 发接口请求 请求英文名称*/
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created(){
    this.id && this.fetch();  /* 如果有this.id 才执行 fetch()方法 */
  }
}
</script>
```

```
<el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
<el-button></el-button>