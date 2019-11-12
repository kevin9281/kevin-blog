---
title: vue 图片引入三种方式
---


## 给图片地址绑定变量


```
<template>
  <div>
    我是test.vue中的图片
    <img :src="imgUrl" alt />
  </div>
</template>

<script>
// require imgUrl from "../assets/test.png"

export default {
  name: "test",
  data() {
    return {
      // imgUrl:require("../assets/test.png")
      imgUrl: ""
    };
  },
  created() {
    let urlTemp = "assets/test.png";
    this.imgUrl = require("@/" + urlTemp);
  }
};
</script>
```



**方法一: 直接将图片引入为模块**

```
在script中设置变量
<script>
    require imgUrl from "../assets/test.png"
```

**方法二: 将imgUrl放在数据里**

```
data(){
    return {
        imgUrl:require("../assets/test.png")
    }
}
```

**方法三: 在生命周期函数中设置**

```
data(){
    return {
        imgUrl:""
    }
}

created(){
    this.imgUrl = require("@/"+urlTemp)
}
</script>
```