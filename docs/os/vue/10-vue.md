---
title: vue 组件生命周期
---

**组件生命周期:**



 **4个阶段:**

**1. Create: 创建Vue组件对象实例，并创建模型对象data**

**2. Mount: 将组件模板替换到DOM树，并替换组件内的绑定语法为data中的具体值**

**3. Update: 组件模型数据发生改变时**

**4. Destory: 主动销毁组件对象实例时**



 **8个生命周期钩子函数:**

**1. beforeCreate**

**2. created**

**el: undefined**  **暂时不能执行DOM操作**

**data: { … }   可使用data中的模型变量**

  **axios.get/post(…)**

  **bus.$on(…)**

**3. beforeMount**

**4. mounted**

**el: DOM树**   **可执行DOM操作**

**data: { … }   也可使用data中的模型变量**

 **axios.get/post(…)**

  **bus.$on(…)**

**5. beforeUpdate**

**6. updated**

**7. beforeDestroy**

**8. destroyed**



![image](https://raw.githubusercontent.com/kevin9281/-/master/lifecycle.png)