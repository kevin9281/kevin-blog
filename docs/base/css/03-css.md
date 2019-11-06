---
title: css 小课1-20 
---

##  html 结构

   

   Web创建的初 是  可发布内容, 去纠结代码语法,这就使得HTML 写法很随意, 如下 这段代 码写的很乱,很难阅读,但是浏览 可以正常解析:

```
<!DOCTYPE html 
<html lang="en" 
<head 
  <meta charset="UTF-8" 
  <meta name="viewport" content="width=device-width,initial-scale=1.0" 
	<Title HTML结构</TITLE  
</head 
  <bOdy 
    <P 欢迎来到前端 课,共同学习前端</p 
  </BODY 
</HTML 
```


    从浏览 中的 Elements 中可以看到,浏览 已经把代码转换成 种「好看」的格式,标签 再包含  写字 ,格式也重新进  排 。虽然 HTML 写法很随意,但是为 「  阅读代码」,需要把 HTML 写的结构化,如同上图显示的那样。在 VSCode 中点击右键,选择 「Format Document」 可以  地 格式化 HTML 代码。
     
    可以通过这个 站来验证 HTML 是否有错:
    https://validator.w3.org/#validate_by_input  


​    

    在开始讲 HTML 结构前,试想 下, 个纯 本的 html  件,在浏览 中是否可以正常显示。


​    

    在浏览 中打开这个 html  件,效果如下,你会发现浏览 可以正常地显示,只 过浏览  动添加   html、head 和 body 标签,这就是 HTML 的基本结构:

  

   但是为  好地显示  ,我们还需要 些额外元素, 如  的元数据 meta 标签, 档的编码格 式,标题。浏览 是 能直接 解 HTML 的,需要把 HTML 转换成 DOM,HTML 和 DOM 是  样 的,虽然它们看起来 太 的差别,你可把 DOM  解成内存中的树状结构,

   

   可以通过 JavaScript 来动 态获取到某个节点。下 这段代码是 HTML 的基本结构:

```
<!DOCTYPE html 
<html lang="en" 
  <head 
  <meta charset="UTF-8" 
  <meta name="viewport" content="width=device-width, initial-scale=1.0"  <title HTML结构</title 
  </head 
  <body 
  <p 欢迎来到前端 课和我 起学习前端</p  </body 
</html 
```

   通过 歌浏览 可以查看 DOM 结构:
    我们  来说明各个标签的作 :
meta 标签 来定义 些元数据,提供 站的基本信息,供搜索引擎抓取,还可以做 SEO。其中下 这 段代码是为  持 HTML5:

```
<meta name="viewport" content="width=device-width, initial-scale=1.0"  总结
```

   本节内容对 HTML 基本结构做  次介绍,通过本节内容希望你能够掌握,在任何编辑 中可以写出  个 HTML 结构,对 HTML转换成 DOM 有 个基本的 解。可以通过 歌浏览 查看任何节点元素。 HTML 相对来说 较简单,你可以把它 解为 个 档,通过 同的标签来表示 同的内容。

---
##  html 中的 head 标签



   MDN 关于 head 标签的说明:

   

```
The Head is the part of an HTML document that contains metadata about that document, such
as author, description, and links to CSS or JavaScript files that should be applied to the HTML.
```

```
也就是说 head 标签中的内容是为 描述  的「额外」信息,主要给浏览 或者搜索引擎使 的。  具体展示给 户的信息是在 body 中定义的。其中 较重要的是元数据标签 meta,它通过类似于 key 和 value 的形式提供 同的内容。总的来说 head 中可以定义:
```

   

   1.定义基本的元数据信息,提供关于 档的额外信息;

   

```
定义  的编码 格式
<meta charset="UTF-8" 
//  viewport 为可视区域,它的宽度为设备的宽度
<meta name="viewport" content="width=device-width, initial-scale=1.0"  //  http-equiv 表示执  个命令,下 设置 HTTP 的 content-type
<meta http-equiv="content-type" content="text/html; charset=UTF-8"    
//  的描述信息,可供搜索引擎显示
<meta name="description"content="前端 课" 
```



   2.定义 CSS 样式,可通过 style 标签或 link 的 式引 。在后续 章中我们会详细说明 CSS;

   

```
直接定义css样式 
<style 
  .title {
      font-size: 20px;
      color: red;
  }
</style 

使 外部定义的 css
<link rel="stylesheet" href="./day3.css" 
```



   3.定义 JavaScript 内容,可通过 script 或 link 的 式引 ,这 需要强调 点 head 中定义的 JavaScript 将会在  加载前执行 ,会阻塞  加载,所以往往会把 JavaScript 定义在 body 标签中;

   

```
<!DOCTYPE html 
	<html lang="en" 
		<head 
			<meta charset="UTF-8" 
			<meta name="viewport" content="width=device-width, initial-scale=1.0" 
			<meta http-equiv="X-UA-Compatible" content="ie=edge" 
			<title HTML Head</title 
			<script 
 				let name = "前端 课";  console.log(name);
			</script 
			<script src="./day3.js" </script 
		</head 
		<body 
			<p class="title" 欢迎来到前端 课,共同学习前端</p  
			<script 
         console.log("body js");
			</script 
		</body 
	</html 
	
	
	//  通过 onload  方法可以监听  加载完成,在这个时机可以对 DOM 进 操作:
	
	 <head 
     <script 
        window.onload = function() {
          console.log('window loaded');
				}
			</script 
		</head 
```



   4.定义 title 标签,也就是 文档的标题。

   

```
今天介绍  head 标签,学完本节内容,希望你能够掌握如何使 外部定义的 CSS 和 JavaScript,内部 直接定义 CSS 和 JavaScript,对 head 标签中的内容能  么事情有 个 解。 多 meta 标签内容, 可以参考 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta 。
```





##  html demo 



  MDN （https://developer.mozilla.org/en-US/#）来系统学习 


  这是 css世界 的demo https://demo.cssworld.cn/   


   CSS手册，如果遇到不太清楚的 CSS，可以查看这个 CSS 手册 https://css.doyoe.com/    

   比较好的整理到了 GitHub 上。有需要的朋友可以前往查看：*https://github.com/lefex/DSA/issues/45*。 



***场景1:点击按钮后没效果***

   如果点击「鼓励自己一下」这个按钮没效果，最简单的方法是打断点，确定点击事件有没有被执行。需要掌握断点调试技巧。

   



   ***场景2：标题间距不对***

  按钮距离左右的边距不正确，需要调整成 30px。按照下面箭头方向点击，你会看到按钮的详细信息，比如CSS颜色，HTML代码，盒模型。





  ***场景3：查看某些变量的值***

  有时候想查看某个变量的值，直接在控制台打印对应的变量名即可，比如在上面的 demo 中，我定义了一个 titles 全局变量，通过控制台输入变量名，然后按回车即可。同时也可以打印其它全局变量的值，比如 document 对象，window 对象，函数名：




  ***场景4：查看页面使用的源文件***

  通过 source 标签可以看到，当前页面使用了 3 个文件，分别为 day4.html, day4.js 和 day4.css。通过这个可以方便找到页面所对应的文件名，还可以查看源码。  





   ***源码学习***

```

// day4.js
let titles = [
    '我要坚持完成前端小课第一阶段的内容！',
    '我的目标是学好前端！',
    '大家共同努力！',
    '前端小课开课啦！',
    '今天是学习的第四天，继续加油！'
];
let addText = function () {
    let index = Math.floor(Math.random() * titles.length + 0);
    let div = document.createElement("div");
    let textNode = document.createTextNode(titles[index]);
    div.appendChild(textNode);
    div.style.color = "#FE7235";
    div.style.lineHeight = 2;
    let contentDiv = document.getElementById('content');
    contentDiv.appendChild(div);
}
```

```

// day4.css
body {
    background-color: #2A3950;
}
.button {
    border: 1px solid white;
    text-align: center;
    padding: 10px 30px;
    margin: 40px 50px;
    border-radius: 4px;
    background-color: #7089FF;
    color: white;
    font-weight: bold;
}
.title {
    text-align: center;
    color: white;
}
#content {
    margin: 20px;
}
```

```

<html lang="en" 
<head 
    <meta charset="UTF-8" 
    <meta name="viewport" content="width=device-width, initial-scale=3.0" 
    <title 调试工具</title 
    <script src="./day4.js" </script 
    <link rel="stylesheet" href="./day4.css" 
</head 
<body 
    <h1 class="title" 给自己一句鼓励的话</h1 
    <div id="content" </div 
    <div class="button" onclick="addText()" 鼓励自己一下</div 
</body 
</html 
```



## 读懂 HTML 标签

   今天我们详细学习一下 HTML 中的标签。HTML 提供的标签有很多，比如 div、span、em、a、img、p 等等。显示文字时，可以使用 div、p、span 等任意一个标签来实现，可为什么还会需要这么多标签呢？



   HTML 其实最初是为了展示文档而发明的，而标签的出现是为了满足文档的需求。比如一个文档包含标题、段落、强调等，而这一切于 HTML 中的标签一一对应，比如标题对应于 H1-H6，段落对应于 p，而这些标签是具有「语义」的，也就是说它们带有一定的感情色彩。小学的时候，老师常教我们要「有感情地朗读原文」，我想「感情」就是HTML 中的「语义」吧。带有语义的标签能够更好地被「别人」理解，比如屏幕阅读器会更容易读懂文档的内容。

   div 和 span 是没有「语义」的标签，适合于任何没有语义的场景。下面是关于标签的语法。




   HTML 比较简单，而关键的内容是 CSS 的学习，我为今天的课程准备了一个 demo，其中包含了 CSS 的知识和基本的标签使用。demo 效果如下：

  




   你需要掌握这些 CSS 的使用。可能，有些人会告诉你 CSS 非常简单，用的时候查一下就行。如果你听了这个建议，那么后续开发中你会遇到很多问题，也许一个需求一行CSS搞定，你却写了10行。切记要系统学一遍：



```
// day5.css
.code-bg {
    border-left: 3px solid #2a7ae2;
    background-color: #eef;
    border-radius: 3px;
    padding: 10px;
}
hr {
    height: 0.5px;
}
.name {
    color: #2a7ae2;
}
.title {
    text-align: center;
}
h3 {
    border-left: 3px solid #2a7ae2;
    background-color: #eef;
    border-radius: 3px;
    padding: 10px;
}
```

```
<!DOCTYPE html 
<html lang="en" 

<head 
    <meta charset="UTF-8" 
    <meta name="viewport" content="width=device-width, initial-scale=1.0" 
    <title HTML结构</title 
    <link rel="stylesheet" href="./day5.css" 
</head 
<!-- <br  -- 

<body 
    <h1 class="title" 《前端小课》</h1 
    <h2 一本帮你入门与进阶的前端书
        <hr 
    </h2 
    <div class="code-bg" 
        <code 
            const p = document.querySelector('p');
            p.onclick = function() {
                alert('噢，噢，噢，别点我了。');
            }
        </code 
    </div 
    <p 欢迎来到<a href="https://weibo.com/5953150140/profile/" title="微博"  Lefe </a 的前端小课，与 200 位好友共同进步，每天一课，坚持 20 天，掌握前端开发。</p 
    <h3 课程大纲</h3 
    <ol 
        <li 第一阶段开课啦</li 
        <li HTML 5天课程</li 
        <li CSS 15 天课程</li 
        <li 最后实践，交作业</li 
    </ol 
    <h3 关键字</h3 
    <ul 
        <li 前端小课</li 
        <li 图解数据结构与算法</li 
        <li 超越技术</li 
        <li iOS知识小集</li 
    </ul 
    <h3 参与方式</h3 
    <p 关注素燕公众号，添加 wsy9871 微信，加入微信群。</p 
    <h3 合作伙伴</h3 
    <div <a href="https://lefex.github.io/" title="图解数据结构和算法" 超越技术官网</a </div 
    <div <a href="https://awesome-tips.github.io/" title="iOS进价" 知识小集官网</a </div 
</body 

</html 

```



   你会发现整个 demo 非常简单，只简单用了 CSS 和 HTML 中的一些标签。甚至你不设置某些标签的样式，也可以正常使用，这一切归功于标签自带的默认样式。

  






##  使用CSS的三种方式

下图是 CSS 的加载过程：




1.通过 link 的方式引用 CSS 样式，也就是外部引入，这种方式需要一个 css 文件，比如 css 的名字为 style.css。这种方式可以把样式和HTML分离，方便维护。（常用）：

```
<!DOCTYPE html 
<html lang="en" 
<head 
    <meta charset="UTF-8" 
    <link rel="stylesheet" href="style.css" 
    <title CSS的使用</title 
</head 
<body 
    <h1 《前端小课》</h1 
    <p class="title" 《前端小课》是一本关于前端入门到进阶的多媒体电子书，
    通过公众号的形式呈现内容，并与粉丝形成互动，推动读者自我驱动，利用
        业余时间学习前端，迎合大前端的浪潮。</p 
</body 
</html 
```



```

/* style.css */
.title {
    color: red;
    font-size: 18px;
}
```



2.内部引入，在 HTML 中的 head 位置添加 style 标签，CSS 样式放到 style 标签中。这种方式把 HTML 和 CSS 样式放到了一起，如果页面太复杂将导致页面代码太臃肿。（偶尔用）



```
<!DOCTYPE html 
<html lang="en" 

<head 
    <meta charset="UTF-8" 
    <title CSS的使用</title 
    <style 
        .title {
            color: red;
            font-size: 18px;
        }
</style 
</head 

<body 
    <h1 《前端小课》</h1 
        <p class="title" 《前端小课》是一本关于前端入门到进阶的多媒体电子书，
    通过公众号的形式呈现内容，并与粉丝形成互动，推动读者自我驱动，利用
        业余时间学习前端，迎合大前端的浪潮。</p 
</body 

</html 
```



3.内联样式：直接作用于元素上，只会对一个元素起作用（不到万不得已不用）。



```

<!DOCTYPE html 
<html lang="en" 

<head 
    <meta charset="UTF-8" 
    <title CSS的使用</title 
</head 

<body 
    <h1 《前端小课》</h1 
    <p style="color: red; font-size: 18px;" 《前端小课》是一本关于前端入门到进阶的多媒体电子书，
    通过公众号的形式呈现内容，并与粉丝形成互动，推动读者自我驱动，利用
        业余时间学习前端，迎合大前端的浪潮。</p 
</body 

</html 
```



##  设计一个左右滑动的菜单

CSS的作用是「给HTML元素添加样式和布局」，也就是说通过 HTML 元素来搭建整个网页的框架，网页中的字体大小、颜色等样式靠 CSS 来描述，元素的该如何放，放到哪个位置也是靠 CSS。总的来说CSS非常重要，如果不系统学习的后果是你不知道为何会出现奇奇怪怪的现象，为什么某些效果不起作用。



今天，我们学习使用CSS如何让元素可滚动。在下面的例子中，顶部菜单栏支持左右滑动，有部分内容是不可见的，这种效果类似于App中的联动效果。




我们先预览下效果，点击底部按钮「知识小集」菜单会滚动到中间：


点击按钮后：


想要实现这种效果，需要做三件事：

***1***.所有的菜单单行显示，不折行：

前端的默认布局方式是「流式布局」，布局方式和代码书写顺序一致，在流式布局中，span 是 inline 标签，而 div 是块级标签，这两个标签的区别是块级标签独占一行，而 inline 标签会「累加」，如同打字一样，一个字一个字往后拼接，单行显示不全会折行显示。

使用 span 标签效果能实现我们要的效果，只不过我们需要「不折行」。CSS 中提供了一个属性 white-space，它的作用就是告诉浏览器遇到「空格」该如何处理，这里的空格不是单纯意义上的空格。

它的默认值是 nomal，也就是遇到空格字符就会折叠，而另外一个属性 nowrap 恰好与它相反，意思是不折叠一直显示，恰好满足我们的需求。所有我们的 CSS 是这样定义的：

```
#nav-box {
    white-space: nowrap;
    background-color: #0077FF;
}
```

***2***.菜单可左右滑动

左右滑动意味着对超出「可视区域」的内容进行滚动处理。CSS 有一个属性 overflow，它可以控制对于超出可视区域的内容如何处理。从下面各个值所表示的含义可以知道我们选择 scroll。滑动上下左右滑动，可通过 overflow-x 和 overflow-y 分别控制各个方向的具体表现。

```

/* 默认值。内容不会被修剪，会呈现在元素框之外 */
overflow: visible;

/* 内容会被修剪，并且其余内容不可见 */
overflow: hidden;

/* 内容会被修剪，浏览器会显示滚动条以便查看其余内容 */
overflow: scroll;

/* 由浏览器定夺，如果内容被修剪，就会显示滚动条（默认值） */
overflow: auto;

/* 规定从父元素继承overflow属性的值 */
overflow: inherit;
```

最终容器的 CSS 是这样的，x轴可以滚动，y轴内容超出时隐藏：

```
#nav-box {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: #0077FF;
}
```

***3***.点击按钮，让某个菜单滚动中间，比如让菜单「知识小集」滚动到中间

我第一次接触左右滚动时，这个是我写前端走过最多的坑。网上都是介绍上下滚动的，唯独没找到左右滚动的，我还尝试使用第三方库 iScroll。后来反思了下，还是基础不牢，其实就一个 api。下面的代码涉及到了 DOM 操作和 JavaScript 的使用，看不懂没关系，后面还会讲，我一直喜欢「先用后学，有目的性地学习」。

```
element.scrollTo(x, y);
```

到这里我们的效果就做完了，先看下源码：

```

<!-- day6.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>滚动</title>
    <link rel="stylesheet" href="./day6.css">
    <script src="./day6.js"></script>
</head>

<body>
    <h1 class="title">《前端小课》</h1>
    <div class="line"></div>
    <div id="nav-box">
        <span id="a">超越技术</span>
        <span id="b">数据结构</span>
        <span id="c">前端小课</span>
        <span id="d">知识小集</span>
        <span id="e">iOS开发</span>
        <span id="f">算法</span>
    </div>
    <!-- 点击事件 -->
    <div id="button" onclick="clickScroll()">点击滚动菜单</div>
</body>

</html>
```

```

// day6.js
let clickScroll = function() {
    let dBox = document.getElementById('d');
    if (dBox) {
        let left = dBox.offsetLeft;
        let navBox = document.getElementById('nav-box');
        if (navBox) {
           // clientWidth 元素的宽度
            navBox.scrollTo(navBox.clientWidth / 2 - dBox.clientWidth / 2 - 15, 0);
        }
    }
}
```

```
/* day6.css */
/*清除标签默认边距*/
* {
    margin: 0;
    padding: 0;
}
/* class 选择器，经常用到，以 . 开头*/
.title {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
}
.line {
    height: 1px;
    background-color: gray;
    margin-bottom: 2px;
}
/* 伪选择器 */
div > span {
    font-size: 20px;
    color: white;
    margin-right: 20px;
    line-height: 40px;
}
div :first-child {
    margin-left: 15px;
}
div :last-child {
    margin-right: 15px;
}
/* id选择器，以 # 号开头，一个 HTML 中只能有一个*/
#nav-box {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: #0077FF;
}
#button {
    height: 40px;
    line-height: 40px;
    background-color: #0077FF;
    border-radius: 4px;
    color: white;
    margin: 100px auto;
    width: 200px;
    text-align: center;
}
#d {
    color: red;
}
```

通过一个实例讲解了 white-space 和 overflow 两个重要的 CSS 属性，以及各种选择器的使用



## CSS中的选择器详解

CSS 相关的语法可以通过下面这张图来读懂：


>  注意：写 CSS 代码的时候，即使某个属性写错，浏览器也不会报错，只会忽略无法识别的 CSS 样式。

***选择器***

下面的CSS会把所有的 p 标签字体颜色改为红色：

```
p { color: red; }
```

```

<p>超越技术</p>
<div>哈哈.</div>
<p>一起学前端!</p>
```


***class 选择器***：以 “.” 开头，后跟一个名字。在一个HTML中，类选择器可以作用于多个 HTML 标签。

```

p {
    color: red;
}
.first {
    font-weight: bold;
    text-decoration: line-through;
}
```

```
<p class="first">超越技术</p>
<div>哈哈.</div>
<p>一起学前端!</p>
```


***ID 选择器***：以 “#” 开头，后跟一个选择器的名字，名字必须在当前文档唯一;

```

#second {
    color: blue;
}
```

```
<body>
    <p class="first">超越技术</p>
    <div>哈哈.</div>
    <p id="second">一起学前端!</p>
</body>
```


***通用选择器（Universal selector）***：单独一个“ * ”，作用于所有的标签。下面的例子，清除 HTML 中所有标签的默认边距。

```
* {    margin: 0;    padding: 0;}
```

***属性选择器（Attribute selectors）***：根据属性来匹配HTML元素，通过下面的例子你可以明白如何使用属性选择器。

```

/* 匹配所有使用属性 "lefe" 的元素 */
[lefe] {
    color: green;
}

/*匹配所有使用属性为 "lefe"，且值为 liquid 的元素*/
[lefe="liquid"] {
    background-color: goldenrod;
}

/*匹配所有使用属性为 "lefe"，且值包含 spicy 的元素*/
[lefe~="spicy"] {
    color: red;
}
```

还有类似于“正则表达式”的属性选择器，比如：[attr^=val] 匹配以 val 开头的元素，[attr$=val] ,匹配以 val 结尾的元素，[attr*=val]匹配包含 val 的字符串的元素。

```
<body>
    <ul>
        <li data-quantity="1kg" lefe>Tomatoes</li>
        <li data-quantity="3" lefe>Onions</li>
        <li data-quantity="3" lefe>Garlic</li>
        <li data-quantity="700g" lefe="not spicy like chili">Red pepper</li>
        <li data-quantity="2kg" data-meat>Chicken</li>
        <li data-quantity="optional 150g" data-meat>Bacon bits</li>
        <li data-quantity="optional 10ml" lefe="liquid">Olive oil</li>
        <li data-quantity="25cl" lefe="liquid">White wine</li>
    </ul>
</body>
```


***伪选择器（pseudo-selectors）***：它包含伪类（pseudo-classes）和伪元素（pseudo-elements）。这类选择器不是真正意义上的选择器，它作为选择器的一部分，起到选择器匹配元素的限定条件。比如，匹配 dom 树中某个元素的第一个孩子，匹配鼠标点击后的状态等。

```

/* 匹配超链接样式 */
a {
    color: blue;
    font-weight: bold;
}

/* 访问后的状态 */
a:visited {
    color: yellow;
}

/* 鼠标悬停、点击、聚焦时的样式 */
a:hover,
a:active,
a:focus {
    color: darkred;
    text-decoration: none;
}
```

```

<a href="https://developer.mozilla.org/" target="_blank">Click me</a>

```

伪元素（pseudo-elements）选择器，它以“ :: ” 为标识符。比如修改首字母的样式。在超链接后添加一个向上的弯曲的箭头：

```

 p::first-letter{
  font-weight: bold;
}
 p::first-line{
  font-size: 3em;
 }
```

```

[href^=http]::after {
  content: '⤴';
}
```




***组合选择器（Combinators）***: 这种选择器可以作用于多个 HTML 元素，有多种组合方式，下面这些方式，CSS 都会作用于 B 元素。通过下面的例子来讲解这些选择器，例子类似于一个树形，表示不同的层级：




代码如下：

```

<body>
    <div>
        <p>|__div->p1</p>
        <p>|__div->p2</p>
        <section>
            <p>|_____div->section->p</p>
            <p>|_____div->section->p</p>
            <div>|_____div->section->div</div>
        </section>
    </div>
    <p>|__p1</p>
    <p>|__p2</p>
</body>
```

***A B {}*** : A 元素的所有后代元素 B 都会起作用。下面的例子中 div p {}，它会遍历 div 中所有的子元素 p，只要找到 p 元素就应用对应的 CSS 样式，故所有的 p 元素都变成了红色；

```
div p {
    color: red;
}
```




***A > B {}*** : A 元素的直接子节点会起作用，也就是只适用于 A 节点的第一层所有的子节点。例子中 div > p { } , 只会找到 div 的第一层子节点 p。

```

div > p {
    color: red;
}
```




***A + B {}*** : 匹配 A 的下一个兄弟节点，AB具有相同的父节点，并且 B 紧跟在 A 的后面；例子中 div + p { } 只会匹配 div 的下一个兄弟节点 p；

```

div + p {
    color: red;
}
```




***A ~ B {}*** : B是 A 之后的任意一个兄弟节点。例子中 div ~ p { } 会匹配 div 的所有兄弟节点 p；

```

div ~ p {
    color: red;
}
```




***组选择器 A, B***：A 和 B 元素具有同一规则的 CSS 样式，不同元素使用逗号隔开。

```

div,p {
    color: red;
}
```





## 一个选择器问题（一定要看）

> 问个问题，这个选择器的作用是针对这个div标签的父元素的首个子元素的所有div标签，对吗？
>
> 

```
div : first-child {
	margin-left: 15px;
}
```

> 所以在这一段里面，这个选择器并没有发挥作用？因为div并不是他的父元素body的首个子元素？




然后截了一张 w3c 的图：


w3c 这段描述的时候，看的不是很明白，「很官方」。那我就斗胆说下自己的看法。



首先这是个好问题，看到这个问题，我也不能很明确给出一个答案，然后我就在浏览器里输入：:first-child MDN，MDN中关于它的描述：

> The :first-child CSS pseudo-class 
>
> represents the first element among a group of sibling elements.
>
> 
>
> 它的意思是 :first-child 匹配兄弟姐妹中第一个元素。然后 MDN 上举了一个例子：
>
> 

```

/* Selects any <p> that is the first element
   among its siblings */
p:first-child {
  color: lime;
}
```

注释中的话：

Selects any <p> that is the first element among its siblings 。

这句话的意思是选择「所有」「孩子节点」是「p」的元素。



首先需要明确什么是 siblings ，它的中文意思是兄弟姐妹，这里的兄弟姐妹是指树这种数据结构中的兄弟姐妹。在 HTML 中，页面是由一颗树组成。想要彻底理解这里面涉及到的知识，需要掌握「树」这种数据结构，一图胜千言。




从图中可以明确，p:first-child 选择的是孩子节点中第一个元素是 p 的元素。所以被选中的元素为下图中「突出」显示的元素。




为这个问题，我特意给大家准备了一个例子：



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FirstChild</title>
    <style>
        .box,
        .box2,
        #box3 {
            background-color: #eeeeee;
            padding: 10px;
            margin-bottom: 10px;
        }
</style>
</head>

<body>
    <p>贵在坚持</p>
    <div class="box">
        <p>前端小课</p>
        <p>超越技术</p>
        <p>每日一课</p>
    </div>

    <div class="box2">
        <h2>中秋节快乐</h2>
        <p>花好月圆</p>
    </div>

    <div id="box3">
        <p>早上好！</p>
        <h3>前端小课，每日一课</h3>
    </div>
</body>

</html>
```

这段 HTML 对应的树状结构如下：


***1***  匹配元素的第一个孩子是 p 的所有元素：

````

p:first-child {
    color: red;
    background-color: black;
    padding: 10px;
}
````





***2***  匹配元素的第二个孩子是 div 的所有元素：

```

div:nth-child(2) {
    background-color: cornflowerblue;
    color: white;
}
```





***3***  匹配选择器为 .box2 的第一个孩子：

```

.box2 :nth-child(1) {
    background-color: red;
    color: white;
}
```




***4***  匹配选择器为 #box3 的第一个孩子：

```

#box3 :nth-child(1) {
    background-color: #0077FF;
    color: white;
}
```




***总结***

```
本节内容通过一个问题，深入对 :first-child 和 :nth-child(n) 做了一个讲解。其实它就是根据某个选择器找到与该选择器相关的元素。希望这次从提出问题，通过查询资料直到找到问题的答案能给你提供一个解决问题的思路。选择器的问题还有很多，不是光靠 第7天：CSS中的选择器详解 这篇文章就能掌握明白的，后续在做项目的时候还会逐步深入讲解，类似今天的内容。
```



## border 能干啥

今天的内容是 CSS 中的 border 属性，它的意思是「边框」。在超越技术官网上有这么一种设计，自我介绍、联系方式和公众号下面有一条横线，它会根据字数的不同，长度在变化。这里恰好用到了 border 这个属性：


border 是一个简写属性，它由一个或多个属性组成：border-width, border-style, border-color。往往会使用简写的方式，比如：

```
. title {
   border: 1px solid red;
}

```

border-width：表示边框的宽度，可以分别设置上下左右边框为不同的宽度，比如 border-bottom-width；

border-style: 表示边框的样式，可以分别设置上下左右边框为不同的样式，比如 border-bottom-style，可以取下面几种值：node、hidden、dotted、dashed、solid 等；

border-color：表示边框的颜色，可以分别设置上下左右边框为不同的颜色。

我们一起实现类似上面的效果：


上面效果的代码如下：

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Border</title>
    <style>
        .title {
            text-align: center;
        }

        .section-title {
            font-size: 20px;
            padding-bottom: 5px;
            margin-left: 10px;
            color: #258BD6;
            font-weight: 600;
            border-bottom-width: 1px;
            border-bottom-style: solid;
        }

        .des {
            font-size: 17px;
            padding: 10px;
            letter-spacing: 1px;
            line-height: 26px;
        }

        .num {
            color: red;
        }

        .triangle {
            width: 0;
            /* width style */
            border: 20px solid;
            /* top [left, tight] bottom*/
            border-color: #f30 transparent transparent;
        }

.icon {
    background-color: antiquewhite;
    width: 15px;
    height: 15px;
    border: 11px solid transparent;
}
</style>
</head>

<body>
    <h1 class="title">前端小课</h1>
    <span class="section-title">简介</span>
    <p class="des">《前端小课》是一本关于前端入门到进阶的多媒体电子书，
    通过公众号的形式呈现内容，并与粉丝形成互动，推动读者自我驱动，利用
        业余时间学习前端，迎合大前端的浪潮。
    </p>
    <span class="section-title">关于创办者</span>
    <p class="des">创办者，素燕，来自一线大厂互联网从业者，做过移动端开发，
    非常热爱大前端，热爱跨平台技术，希望能够把前端技术灵活运用到
        移动端。
    </p>
    <span class="section-title">打卡学习</span>
    <p class="des">目前共有<span class="num">220+</span>名同学加入打卡学习
    队伍中，他们来自不同的领域，有iOS, Android 和前端的小伙伴。添加微信 
    wsy9871，备注小课，便会有人邀请加入微信群。
    </p>
    <div class="triangle"></div>
    <div class="icon"></div>
</body>

</html>
```

关于 border 还有两个妙用：

1.做倒三角形图标：

```
.triangle {
      width: 0;
      /* width style */
      border: 20px solid;
      /* top [left, tight] bottom*/
      border-color: #f30 transparent transparent;
}
```




2. 扩大点击区域：

```
.icon {
    background-color: antiquewhite;
    width: 15px;
    height: 15px;
    border: 11px solid transparent;
}
```

***总结***

今天的内容是关于 border 的使用，希望能够灵活运用。border 对于理解后续盒子模型有一定的帮助。



##  自我介绍

HTML的设计的初衷是为了展示图文，它的排版能力非常强大。写文章的时候突发奇想，想到我还没有正式和同学们做过自我介绍，借这次机会做个自我介绍。通过这篇自我介绍，希望你能够对 HTML 有一个清晰的认识。文章最终效果如下：


```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>王素燕自我介绍</title>
    <link rel="stylesheet" href="./day9.css">
</head>

<body>
    <div class="content">
        <p class="title">王素燕自我介绍<p>
        <p class="greet">同学们好:</p>
        <p class="des" wo>我是王素燕，男（有的小伙伴总以为我是女生），网名 Lefe，我的微博是 <a href="https://weibo.com/5953150140/profile">Lefe_x</a>
            （因为 Lefe 已经被占用了）。目前在大厂一线做<span class="stress-word">iOS和前端</span>相关的工作。
           我这个人最大的特点是不愿意呆在舒适区，总喜欢自己琢磨一些事情，自我驱动能力和自控力比较强。希望通过
            技术能做一件<span class="stress-hard">有意义</span>的事情。
        </p>
        <p class="des">
            前半年，学习了数据结构和算法，学习的时候
            并没有找到比较好的电子版资料，故我把学到的数据结构和算法通过图解的形式写出来。画完
            了<span class="stress-word">链表、队列、双端队列、循环队列、栈、堆、二叉树、线段树、AVL 树、二分搜索树、红黑树</span>这些数据结构。这部分知识并没有
            想象的那么难，<span class="stress-hard">后续打算用前端的形式把它讲的更通俗易懂</span>。
        </p>
        <div class="dsa-box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <p class="des">学习前端这个想法一直都有，只是一直没找到它对我有什么作用。直到我想建一个网站的时候，才下定决心。最终通过 Jekyll 做了我第一个网站
            <a href="https://lefex.github.io/">超越技术</a>。做的时候发现前端的思想很超前，很多值得移动端的同学
            去学习。一次偶然的机会就开始做前端了。在学习的时候，深刻理解到<span class="stress-hard">万事开头难</span>，好在有公司同事的帮忙，一路磕磕绊绊也算走过来了。
        </p>
        <p class="des">我深知自学一个新的方向，会面对各种问题。看书，不太现实，每天忙得几乎没有半点时间，而书本上的内容大多数是从起源讲起，重点难以突出
            ，比如我学选择器的时候，看了半天没告诉选择器究竟是干吗用的。既然入门这么难，世面上却没有系统性学习前端的免费课程。
            那我为何不做呢？有了想法后，说干就干。由于和南大一起做过知识小集，有一些人脉，开始时还算顺利，200人很快就达到了，这不你现在才和我一起学习前端吗！
            所以要感谢这些帮我分享课程的小伙伴们。
        </p>
        <p class="des"><span class="stress-hard">《前端小课》</span>，我对它的定位是<span class="stress-hard">一本前端入门到进阶的多媒体电子书</span>。
            为什么定义成书呢？
            因为写书比较系统，质量有保证。写《前端小课》的时候我也是这样，每个知识点都会反复推敲，每篇文章都会反复看3遍以上。我觉得《前端小课》还有一个最大的特点是，
            它具有一定的活力，因为它融入了读者的思考与行动，每天有数百名同学在打卡，与我互动，互相鼓励。相信后续会有越来越多的同学加入到这个学习队伍中。
        </p>
        <div class="qrcode-box">
            <p class="qrcode-text">前端小课，每日一课</p>
            <img class="qrcode-img" src="./images/qrcode.jpg" alt="">
        </div>
        <p class="footer">素燕写于2019-09-12</p>
    </div>
</body>

</html>

```



## 撑起CSS布局的半壁江山---盒子模型

对于前端开发来说，盒子模型是必须要熟练掌握的内容，不然在后面写页面的时候，你会遇到很多坑。比如我当时遇到给  span  标签设置 width 和 height 不起作用，设置 margin 不起作用，设置 padding 后标签会自动变大等等，这一切问题，归根结底是我对盒子模型没有彻底掌握，今天会聊一聊盒子模型。



在网页中，你可以把各种标签统统看成盒子，对于不同的盒子表现是不一样的，我们可以利用这些盒子堆叠出各种好看的页面。



CSS中主要有两种盒子：



***一.块级盒子（block）***，它的表现如下：



***1***  尽可能扩大可利用的空间，比如 p 标签默认是一个块级标签，它的宽度会填满父元素；






***2***  独占一行，也就说一个块级元素占一行；






***3***  可以使用 width 和 height 属性，比如设置 width 来改变宽度；






***4*** 使用 padding、margin 和 border 会影响其它元素的位置，这句话比较抽象，比如当改变元素自己的 padding 的时候，其它元素的位置也会发生变化。






***二.行内盒子（inline box）：***

***1*** 不会单行显示，除非一行没有足够多的空间，它会一个接一个地排列；






***2*** width 和 height 属性不起作用，如果给 span 标签设置 width 或 height 时，发现无效；



***3*** padding、margin 和 border 会起作用，但不会影响其它元素。

标签都会有自己默认的显示方式，可以通过 display 来修改其显示方式，比如把块级元素变成行内元素，比如 p 标签默认的是块级元素，通过 display 来修改为 inline。



```

.title {
    display: inline;
}
```



比如 span 元素默认的是行内元素，通过 display 来修改为块级元素。



```

.title {
    display: block;
}
```



***盒模型***

块级元素使用了盒子模型的所有特性，而行内元素只使用了部分特性。一个完整的盒子模型如下：






margin（外边距）：它表示盒子之间的距离，可以通过 margin-top、margin-bottom、margin-left、margin-right 来控制各个方向的边距，***它们可以为负值***；

border（边框）：表示盒子的边框；

padding（内边距）：表示与内容之间的距离；

content（内容）：表示内容的大小；



盒子模型有两种模式，不同模式对于最终盒子的大小有所不同：



***1.标准的盒子模型***

对于这种盒子模式，给它设置的 width 和 height 是 content 的宽高，当给盒子添加 padding 和 border 的时候，会增加盒子的整体大小。「外边距不会计入盒子的大小，它只是表示外部的边距」。下面的代码盒子最终的宽 = 100+20+20+10+10 = 160px；

```

.std-box {
    width: 100px;
    height: 120px;
    padding: 20px;
    border: 10px solid red;
    margin: 30px;
    background-color: antiquewhite;
}
```






***2.诡异盒子模型（The alternative CSS box model）***

对于这种盒子模式，给它设置的 width 和 height 是盒子的宽高，也就是说内容 content 的宽需要减去 border 和 padding 的宽。谷歌浏览器默认的是标准的盒模型，可以通过：

```
box-sizing: border-box;
```

来修改盒模型为诡异盒模型，把上面的 CSS 修改成诡异盒模型。

```

.std-box {
    width: 100px;
    height: 120px;
    padding: 20px;
    border: 10px solid red;
    margin: 30px;
    background-color: antiquewhite;
    box-sizing: border-box; 
}
```






>  [设计一个左右滑动的菜单](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484021&idx=1&sn=2cf00827340698907f07c4221fc130d8&chksm=ec0c251fdb7bac098ce9e4ba33b915ce6a68db422a90d61ccb03beee93c54f366471f2bfbdaf&scene=21#wechat_redirect) 有用到盒子模型的相关概念





## web 在 PC 和手机上的适配

在PC上展示效果如下：


在手机上展示效果如下：




从上面的效果可以看到，这两种布局方式完全不一样，手机上显示 3 张图，而在 PC 上显示 5 张图，并且歌词和图片的排列方式也不一样。这一切归功于我们前面介绍的 @规则，可以在 [第7天：CSS中的选择器详解](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484022&idx=1&sn=ad15f8ea96ca947bb5d87b6b0683809b&chksm=ec0c251cdb7bac0ad851e2c2d7f7dd0c700d5052300aaa90fd0c330c45fccb7328876248b5dc&scene=21#wechat_redirect) 这节课程中找到。



前面的课程多数是在手机状态下查看的页面效果，现在移动端非常普及，大多数网页都会同时适配 PC 端和手机端。那么如何即适配手机端又适配 PC 端呢？



在CSS选择器的课程中，有讲过 @ 规则，但是没有细讲，借此机会再深入讲解一下 @ 规则。今天直讲 @media 这一个规则，其它关于 @ 的规则，后面遇到后再讲。@media 通俗地讲就是为了匹配不同的媒体，根据条件的不同使用不同的 CSS 样式。下面代码中的 screen 是媒体类型，在此表示带有屏幕的设备，比如电脑、手机，还有其它的媒体类型，比如 tv；and 用来组合多个条件，这里表示且，还有 not 和 only；min-width 是媒体功能，这里表示可视区域的最小宽度。整段代码的意思是匹配带有屏幕的设备，且最小尺寸是 700 像素。：



```

@media screen and (min-width: 700px) {
   // css
}

```



再来看个例子，这段代码的意思是匹配带有屏幕的设备，且最小尺寸是 700 像素，最大尺寸是 900像素。



```

@media screen and (min-width: 700px) and (max-width: 900px) {
   // css
}
```



@media 语法规则是：



```

@media mediaType and|not|only (media feture) {
  // css
}
```

语法规则理解以后，看看我们今天的实例是如何做的。



***实例代码***

代码涉及到“说好不哭”的歌词，和我从 MV 截取的一部分图。通过 @media 来控制不同屏幕的布局效果。选择器的使用在 [群里讨论的一个选择器问题（一定要看）](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484057&idx=1&sn=3becbefb82083dade574051504a409af&chksm=ec0c25f3db7bace5013991bb4e06d450a2ea1e0a38b018903c9113a005dd9047a6e590b784d8&scene=21#wechat_redirect)这个课程有讲解。



```

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>media</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            background-color: #eeeeee;
        }
        .app {
            background-color: #eeeeee;
        }

        .top {
            background-color: #eeeeee;
        }

        .top div {
            height: 200px;
            margin-bottom: 5px;
            background: white;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: 0 0;
        }

        .top :nth-child(1) {
            background-image: url('./images/1-1.png');
        }

        .top :nth-child(2) {
            background-image: url('./images/1-2.png');
        }

        .top :nth-child(3) {
            background-image: url('./images/1-3.png');
        }

        .top :nth-child(4) {
            background-image: url('./images/1-4.png');
        }

        .top :nth-child(5) {
            background-image: url('./images/1-5.png');
        }

        .content {
            background-color: white;
            padding-bottom: 30px;
        }

        .content p {
            text-align: center;
            padding: 10px;
            font-size: 17px;
        }

        .title {
            font-size: 24px;
            color: #258BD6;
            font-weight: bold;
            border-bottom: 1px solid #eeeeee;
            text-align: center;
            width: 160px;
            margin: 0 auto;
        }

        .title-active {
            color: red;
            font-size: 20px;
            font-weight: bold;
        }

        .hidden {
            display: none;
        }

        @media screen and (min-width: 700px) {
            .app {
                display: flex;
                flex-direction: row;
                margin-top: 30px;
            }

            .top {
                width: 40%;
                margin-left: 30px;
                margin-right: 30px;
            }

            .top div {
                height: 250px;
            }

            .content {
                width: 60%;
                margin-right: 30px;
            }

            .hidden {
                display: block;
            }
        }
</style>
</head>

<body>
    <div class="app">
        <div class="top">
            <div></div>
            <div></div>
            <div></div>
            <div class="hidden"></div>
            <div class="hidden"></div>
        </div>
        <div class="content">
            <h2 class="title">说好不哭</h2>
            <p>没有了联络后来的生活</p>
            <p>我都是听别人说</p>
            <p>说你怎么了说你怎么过</p>
            <p>放不下的人是我</p>
            <p class="title-active">人多的时候就待在角落</p>
            <p>就怕别人问起我</p>
            <p>你们怎么了你低着头</p>
            <p>护着我连抱怨都没有</p>
            <p>电话开始躲从不对我说</p>
            <p>不习惯一个人生活</p>
            <p>离开我以后要我好好过</p>
            <p>怕打扰想自由的我</p>
            <p>都这个时候你还在意着</p>
            <p>别人是怎么怎么看我的</p>
            <p>拼命解释着不是我的错是你要走</p>
            <p>眼看着你难过挽留的话却没有说</p>
            <p>你会微笑放手说好不哭让我走</p>
            <p>电话开始躲从不对我说</p>
            <p>不习惯一个人生活</p>
            <p>离开我以后要我好好过</p>
            <p>怕打扰想自由的我</p>
            <p>都这个时候你还在意着</p>
            <p>别人是怎么怎么看我的</p>
            <p>拼命解释着不是我的错是你要走</p>
            <p>眼看着你难过挽留的话却没有说</p>
            <p>你会微笑放手说好不哭让我走</p>
            <p>你什么都没有却还为我的梦加油</p>
            <p>心疼过了多久还在找理由等我</p>
        </div>
    </div>
</body>

</html>
```

***总结***

通过一首歌来讲解 @media 适配手机和PC，使它们采用不同的布局方式。同时，课程中使用了 flex 布局，有条件的同学可以先看看这篇文章，[Web 和移动端需要掌握的布局方式 - Flexbox](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247483796&idx=1&sn=e9730f74adc7828c0efd0c3564c57a54&chksm=ec0c26fedb7bafe81cde24f0ccb290a4903f8a7fe4239fd6f64faccc85e8105a25da77f6633b&scene=21#wechat_redirect) 。后面我们会详细讲解 CSS 中的布局



## 打破常规之 display

前面的课程讲解了盒子模型 [第10天：撑起CSS布局的半壁江山---盒子模型](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484083&idx=1&sn=2d02221949f29faa9fd19a01cfd13257&chksm=ec0c25d9db7baccfda3ca372cb3d3a079939227e4d40620aa4dacfd1c8e10b59dfa8d850ab14&scene=21#wechat_redirect)，盒子的表现形式可以通过 display 这个属性控制，比如让 p 元素变成行内元素，让 span 元素变成块级元素。display 能做的事情不止这些，它还有很多其它属性



*1*display：inline


使用 inline 告诉浏览器这是一个行内元素，布局的时候要按照行内元素的方式布局，比如 span 标签默认的就是这种布局方式。在有足够空间的时候，它不会换行。不能使用 width 和 height 属性。从图中可知 width 和 height 并没有起作用，margin 只会在水平方向起作用。

```
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: #2A3950;
        }
        .des {
            color: white;
            font-size: 20px;
            margin: 10px;
        }
        .strong {
            color: red;
            border: 1px solid yellow;
            padding: 10px;
            margin: 20px;
            background-color: antiquewhite;
            width: 150px;
            height: 80px;
        }
</style>
</head>
<body>
    <p class="des">《前端小课》是一本关于前端入门到进阶的
    <span class="strong">多媒体电子书</span>，通过公众号的形式呈现内容，
    并与粉丝形成互动，推动读者自我驱动，利用业余时间学习前端，
    迎合大前端的浪潮。
    </p>
</body>
</html>
```



*2*display：block

使用 block 告诉浏览器这是一个块级元素，布局的时候要按照块级元素的方式布局，比如 p 、div 标签默认就是这种布局方式。把上面的选择器 strong 添加 display：block，使 span 标签变为块级标签，效果如下：


```

.strong {
    display: block;
    color: red;
    border: 1px solid yellow;
    padding: 10px;
    margin: 20px;
    background-color: antiquewhite;
    width: 150px;
    height: 80px;
}
```



*3*display：inline-block

这种布局方式结合了 inline 和 block 这两种元素的特性，它与块级元素不同的是：元素不会单独占用一行；相同的是：可以使用 width 和 height，可以通过 padding、margin 和 border 来控制元素的显示位置。说白了就是除了不会单独占一行，其余的与块级元素一致。




```

.strong {
    display: inline-block;
    color: red;
    border: 1px solid yellow;
    padding: 10px;
    margin: 20px;
    background-color: antiquewhite;
    width: 150px;
    height: 80px;
}s
```



*4*display：none

这种布局方式会隐藏元素，下面的代码隐藏了 span 标签。在 [第11天：说好不哭](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484096&idx=1&sn=a7cfecb8df87a3d91e72de43ffaedf0e&chksm=ec0c25aadb7bacbcc7ea34b80248c71a6338aec4d6fe47a4531d643a5082d683d874a538ccb9&scene=21#wechat_redirect) 这节课程中使用了元素的显示与隐藏。






```

.strong {
    display: none;
    color: red;
    border: 1px solid yellow;
    padding: 10px;
    margin: 20px;
    background-color: antiquewhite;
    width: 150px;
    height: 80px;
}
```



***5***  display：flex

这是一种 flexbox 布局，它是一维的。在布局内容中，会详细讲解这种布局，可以通过 [Web 和移动端需要掌握的布局方式 - Flexbox](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247483796&idx=1&sn=e9730f74adc7828c0efd0c3564c57a54&chksm=ec0c26fedb7bafe81cde24f0ccb290a4903f8a7fe4239fd6f64faccc85e8105a25da77f6633b&scene=21#wechat_redirect) 提前了解这种布局方式。



***6***  display：grid

这是一种网格布局，它是二维的。在布局内容中，会详细讲解这种布局，可以通过 [开创新时代之 grid 布局](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247483808&idx=1&sn=623e7ac7935fa987eb8a3218f2db5937&chksm=ec0c26cadb7bafdcb13cc174713e0e23a6f8f352c13533fb2afa362affd8c9120d061df0f974&scene=21#wechat_redirect) 提前了解这种布局方式。

***总结***

本节内容讲了 display 相关属性，其中 inline、block、inline-block、none 需要重点掌握，flex 和 grid 在后续内容中会详细讲解。





## CSS中使用图



在实际开发中，图文是应用最多的场景，前面的课程讲解了文字的使用 [第9天：自我介绍](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484080&idx=1&sn=0df71fc48c05bffd229fcd07e1a57cbf&chksm=ec0c25dadb7baccc357f607a31de80f2de0a5763cb1528b6b0958a441babfbff718e4518fcc5&scene=21#wechat_redirect)，今天内容是关于在 web 中如何使用图片。CSS 中主要有两种方式可以显示图片，一种是通过设置背景图，另一种是使用 img 标签。



**img标签**



img标签比较特殊，它默认属于行内（inline）元素。比如下面这段代码在浏览器显示的样式是：






```
.mini-logo {
    width: 30px;
    /* 指定行内元素的垂直对齐方式 */
    vertical-align: middle;
}
```

```
<p>我这里有个min版的二维码，扫一扫<img class="mini-logo" 
src="./images/qrcode.jpg"></p>
```



width: 表示设置图片的宽度，如果只设置宽度，那么 img 标签的高度会根据图片的大小进行等比缩放。只设置高度也是同样的道理。如果即设置了高度又设置了宽度，那么图片的高度和宽度即为设置的宽高。

vertical-align: 表示在竖直方向上的对齐方式，它有 top、middle、bottom、baseline、sub 和 text-top 这几个值。



src：表示图片的来源，可以是「本地」的图片，也可以是「网络」中的图片。

alt：对图片的描述，供屏幕阅读器或者图片未加载出来时显示。



```
<img class="logo" src="./images/1.png" alt="公众号二维码">
```



**背景图**

背景图的作用是给某个元素添加背景，不会添加额外的元素。可以设置背景颜色或者背景图。



```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Day11</title>
    <style>
        body {
            background-color: #eeeeee;
        }

    .box {
        width: 200px;
        height: 200px;
        background-color: antiquewhite;
        background-image: url('./logo_suyan.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
</style>
</head>

<body>
    <p>背景图 background</p>
    <div class="box"></div>
</body>

</html>
```






1.background-postion: 表示背景图的起始位置；

background-postion：top | left | bottom | right，在某个边缘的位置，另一个维度为 50%。比如 top，背景图的起始位置为顶部，在X轴方向为 50%，居中显示；

background-postion：center，居中背景图；

background-postion：25% 75%，设置基于背景区域的开始位置，可以为负值；

2.background-postion-x：背景在 x 轴上的位置；

3.background-postion-y：背景在 y 轴上的位置；

4.background-repeat: 背景的重复方式， no-repat 不重复，repeat 重复，repat-x X轴上重复，还有其它关键字，读者可以自行查看

https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat。

5.background-size: 背景图的大小；
background-size: cover，缩放背景图以完全覆盖背景区，保持原图的宽高比，可能背景图部分会看不到，填满背景图；
background-size: contain，缩放背景图以完全显示背景图，保持原图的宽高比，可能背景部分区域空白，尽可能把图显示完整；

background-size: 50%，背景图的大小为背景区的百分比；

background-size: 12px，背景图的宽度为 12px，高度按照比例自动缩放；

background-size: 12px 14px，背景图的宽度为 12px，高度14px；



**总结**



本节内容主要讲解了在 CSS 中如何使用图，可以通过 img 和 background 的方式来设置图。希望本节内容能够重点掌握



## 在文字前、后插入一个图标



今天通过一个真实的例子来讲解伪选择器，伪选择器分为伪类选择器（Pseudo-classes）和伪元素选择器（Pseudo-elements）。这两个概念老混淆，你有没有好的记忆方式，欢迎留言。我认为伪选择器在于「伪」这个字，它很能「伪装」，比如它偶尔伪装成一个DOM中不存在的元素。



***1.***伪类选择器（Pseudo-classes）它的作用是选中某个元素中符合某些条件的元素。比如鼠标悬停到某个元素后的状态，某个元素的第一个孩子，使用1个冒号 : 。它的效果好像是为元素添加了一个新的选择器。「作用于现有元素，相当于给现有元素添加某些属性」。对于这类选择器在前面的课程中我们有提到过 [群里讨论的一个选择器问题（一定要看）](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484057&idx=1&sn=3becbefb82083dade574051504a409af&chksm=ec0c25f3db7bace5013991bb4e06d450a2ea1e0a38b018903c9113a005dd9047a6e590b784d8&scene=21#wechat_redirect)，它主要涉及到选择某些孩子节点。常用的伪类选择器有：



```

:first-child
:not
:nth-child()
:only-child()
:root()
:disabled

```



其实比较常用的 a 标签在不同状态下的展示效果。



```

a {
    font-size: 18px;
    color: black;
}
a:hover {
    color: blue;
}
a:visited {
    color: gray;
}
```

```

<body>
    <a href="https://lefex.github.io/">前端小课</a>
</body>
```



2.**伪元素选择器（Pseudo-elements）它的作用就是给现有元素添加某些新的内容，就好比给某个元素添加了一个新的标签，使用2个冒号 :: ，有些也可以使用1个:，但建议统一使用2个冒号 :: 。



比如在 [第9天：自我介绍](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484080&idx=1&sn=0df71fc48c05bffd229fcd07e1a57cbf&chksm=ec0c25dadb7baccc357f607a31de80f2de0a5763cb1528b6b0958a441babfbff718e4518fcc5&scene=21#wechat_redirect) 这节课程中，首字“我”不同于其它字，它的字体大小是 30px。实现这种效果可以通过添加一个 span 标签，也可以使用伪元素选择器 ::first-letter 实现。


对于「图+文字」这种效果可以利用 ::before 这个伪元素选择器。下面的 CSS 样式中的 content 属性必须有，否则将不会展示。




```
.left {
    color: black;
    font-size: 15px;
}
.left::before {
    /* content: 'before'; */
    content: '';
    display: inline-block;
    vertical-align: middle;
    background-image: url('./images/hert.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 4px;
    width: 30px;
    height: 30px;
}
```

```

<body>
    <p class="left">前端小课</p>
</body>
```

如果把上面的 ::before 换成 ::after，显示效果如下：


从上面可以看到，通过 ::before 和 ::after 可以给已知元素的前面或者后面拼接新的内容，好像添加了新的元素，我觉得这应该就是伪元素中“伪”的真正含义吧，它并不是一个真正的元素，但可以充当元素的角色。

当然也可以通过 ::before 和 ::after 给已有的元素添加新的文字内容，比如：

```
.right {
    color: black;
    font-size: 15px;
}
.right::after {
    content: '→';
    display: inline-block;
    color: red;
    margin-left: 5px;
}
```

```

<body>
    <p class="right">前端小课</p>
</body>
```

预览效果如下：


除了这两个伪元素外，还有其它的伪元素，比如：

```
::first-letter 表示对首字母进行操作
```

```
::first-line 对首行内容进行操作
```



**总结**

本节课程通过对 ::before 和 ::after 的使用，更进一步了解了伪元素选择器和伪类选择器。在实际使用场景中，这两类选择器使用的频次比较高，希望能够重点掌握。在实际使用场景中，如果你实在区分不开伪元素选择器和伪类选择器，可以先把伪元素选择器记住，常用的就 4 个，::before、::after、::first-letter、::first-line。剩下的就是伪类选择器，你有没有发现伪类选择器和类选择器差不多，你也可以通过一个类选择器实现伪类选择器的功能，只是不太优雅。



## 设计师的要求



无论是前端还是移动端开发，UI布局是基本功。今天设计师和我说：“用户信息这块只能显示两行文字，昵称只能显示一行文字”，我心中窃喜：“我在前端小课学过，这个难不倒我”。今天我们就学习在前端中如何显示 n 行文字。



**显示一行内容**

关于单行显示的相关属性，在前面的课程 [第 6 天：设计一个左右滑动的菜单](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484021&idx=1&sn=2cf00827340698907f07c4221fc130d8&chksm=ec0c251fdb7bac098ce9e4ba33b915ce6a68db422a90d61ccb03beee93c54f366471f2bfbdaf&scene=21#wechat_redirect) 有介绍过，它无非就是让要显示的内容不折行显示，对超出可视区域的内容进行隐藏即可。

```

.singal-line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```



这里重点讲一下 text-overflow 属性，另外两个属性看第6天的课程。这个属性只对块级元素起作用，表示对超出指定区域的内容该如何显示。它可以设置以下几个值：

ellipsis（省略号）: 以 ... 省略号显示；


clip : 截断显示；


**只显示两行**

显示两行且超出部分以省略号显示，这个需要使用 webkit 的 CSS 扩展属性 -webkit-line-clamp ，它用来控制内容的行数，如果想让这个属性起作用，需要满足：

*1*. display 为 -webkit-box 或者 -webkit-inline-box；

*2*. -webkit-box-orient 的属性值为 vertical；

```

.two-line {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```




如果想显示 3 行内容，把 -webkit-line-clamp 改为 -webkit-line-clamp：3；




今天完整代码如下：

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>只显示 n 行文字</title>
    <style>
        .box {
            width: 100%;
            height: 100px;
            background-color: bisque;
        }

        .title {
            font-size: 16px;
            background-color: red;
            color: white;
        }

        .singal-line {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .two-line {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
</style>
</head>

<body>
    <div class="box">
        <p class="title singal-line">学习前端这个想法一直都有，只是一直没找到它对我有什么作用。直到我想建一个网站的时候，才下定决心。最终通过 Jekyll 做了我第一个网站。</p>
    </div>
</body>

</html>
```



**总结**

本节课的内容主要介绍了 text-overflow 和 -webkit-line-clamp 这两个属性。



## 这3张宝图，搞懂CSS权重

CSS权重的知识点算是一个难点，需要掌握所有的选择器，起码看到选择器能分辨出是哪种选择器。我集齐了 3 张图，先看看这 3 张图能不能帮你搞懂 CSS 权重（优先级）问题。后面会有一天的课程会专门讲 CSS 的权重。










## 领导说，体验差

领导经常说：“体验太差了，没有一点动效，太生硬”。我窃喜：“我有办法让你觉得体验好，比如修改背景色可以添加个过渡动画，位移的时候也来点动画，这样元素发生变化的时候看起来不会太生硬。这些内容刚在前端小课学到，马上用起来”。



CSS中主要有两种方式实现动画：
1、animation：CSS动画，可设置不同帧的动效；
2、transition：这种属于过渡动画，也就是说在修改某些 CSS 属性的时候，属性会有一个渐变的过程。

**animation**

animation 是通过 CSS 给某个 HTML元素设置一个动画，可以通过下面这些属性来控制动画。

animation-name: 动画的名字，这个是通过 @keyframes 定义的名字，比如 @keyframes 定义如下，那么 animation-name 就为 move。@keyframes 指定某一帧的动画如何变化，可通过 % 来控制各个阶段的属性值，比如 0% 的时候，元素的 left 和 top 都为 0。

```
@keyframes move {
    0% {
        left: 0;
        top: 0;
    }
    100% {
        left: 0;
        top: 0;
    }
}
```

animation-duration：动画的持续时间；

animation-delay：动画开始时的延迟时间；

animation-iteration-count：动画循环次数；

animation-direction：动画的方向，比如 alternate 表示先正向后逆序，nomal 正向，reverse 逆序；

animation-timing-function：动画的时间曲线，它的值有 ease、ease-in、ease-out、ease-in-out、linear；

animation-fill-mode：动画执行后的填充模式，它的值有 forwards、backwards、none、both；



看一个具体的实例，可以给选择器设置一个动画：




```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>动画</title>
    <style>
        .bg-box {
            background-color: gray;
            width: 100px;
            height: 100px;
        }

        .bg-box-animation {
            /* 动画的名字和动画执行的时间，需要把动画绑定到某个选择器上才会执行*/
            animation: background-change 2s;
        }

        /* 动画的关键帧 ，帧数可以为任意多个 */
        @keyframes background-change {
            0% {
                background-color: antiquewhite;
            }

            50% {
                background-color: brown;
            }

            100% {
                background-color: blue;
            }
        }

        .move-box {
            background-color: red;
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 30px;
        }

        .move-box-animation {
            /* animation: name duration timing-function delay iteration-count direction fill-mode; */
            /* 名字，为 @keyframes 的名字 */
            animation-name: move;
            /*  动画的时间 */
            animation-duration: 5s;
            /* 动画执行函数 */
            animation-timing-function: ease-in-out;
            /* 动画延迟时间 */
            animation-delay: 1s;
            /* 动画重复次数 */
            animation-iteration-count: 10;
            /* 动画的方向，先正向后逆向 */
            animation-direction: alternate;
            /* 动画执行后的填充模式 */
            animation-fill-mode: backwards;
            /* 动画的运行状态 */
            animation-play-state: running;
        }

        @keyframes move {
            0% {
                left: 0;
                top: 0;
            }

            25% {
                left: 100px;
                top: 0;
            }

            50% {
                left: 100px;
                top: 100px;
            }

            75% {
                left: 0;
                top: 100px;
            }

            100% {
                left: 0;
                top: 0;
            }
        }
</style>
</head>

<body>
    <div class="bg-box bg-box-animation"></div>
    <div class="move-box move-box-animation"></div>
</body>

</html>
```

**transition**

transition 是过渡动画，修改某些属性的时候不会立刻生效，它会以动画的形式逐渐过渡到要设置的值。比如设置某个 HTML 元素的背景颜色，修改宽度和高度。



```

.move-transition {
    /* transition-property: all; */
    transition-property: background-color, height, width;
    transition-duration: 1.8s, 1.0s, 1.0s;
    transition-delay: 0.1s;
    transition-timing-function: linear;
}
```

transition-property: 指需要使用过渡动画的属性，这里设置了背景色，高度和宽度。也可以通过关键字 all 设置所有的属性；
transition-duration: 动画持续的时间，可以单独控制某个属性的时间， transition-duration：1.8s, 1.0s, 1.0s 表示修改 background-color 需要 1.8s, 修改 height 需要 1.0s,  修改 width 需要 1.0s;
transition-delay：动画开始时需要延迟多长时间才开始执行；
transition-timing-function：表示动画执行时的时间函数，不同函数走过的曲线不一样；



看一个完整的示例，运行下面的代码，赶快看看效果吧：



```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>动画</title>
    <style>
        #move-transition-box {
            background-color: cornflowerblue;
            width: 100px;
            height: 100px;
        }
        .move-transition {
            /* transition-property: all; */
            transition-property: background-color, height, width;
            transition-duration: 1.8s, 1.0s, 1.0s;
            transition-delay: 0.1s;
            transition-timing-function: linear;
        }
</style>
</head>

<body>
    <div id ="move-transition-box" class="move-transition" onclick="scale()"></div>
    <script>
    function scale() {
        let tbox = document.getElementById('move-transition-box');
        tbox.style.height = 200 + 'px';
        tbox.style.width = 200 + 'px';
        tbox.style.backgroundColor = 'red';
    }
</script>
</body>
</html>
```

当点击方块的时候，方块会变大，颜色逐渐变成红色。



**总结**

本节内容介绍了 CSS 动画的使用，可以通过实例来学习动画的实现过程。



## 屏幕尺寸这么多，前端却有高招

目前，设备的屏幕尺寸越来越多，比如,以前 iPhone 只有一种尺寸，如今不同尺寸的设备越来越多。而 web 的挑战更大一些，它既要适配iPhone，又要适配 Android 手机，还要适配 PC 端。web 中采用的适配可以通过 CSS 的长度单位和 @media 来实现，CSS中有两类长度单位，一类是相对单位，另一类是绝对单位。



**相对单位**

相对单位指它的尺寸是相对于另外一个元素的尺寸。常用的是 em、rem、vh、vw、vmin、vmax。理解相对单位的时候需要掌握 font-size 这个 CSS 属性，它表示字体的大小，同时也可以用来计算相对单位的长度。「避免认为 font-size 就是表示字体大小的思维定势」。

**em**: 它是相对于「自身或父元素」的 font-size 来计算自身的尺寸，看一段代码：

```
<body>
    <div class="content">
        <div class="title"></div>
    </div>
</body>

```

```
<style>
body {
    font-size: 16px;
}
.content {
    width: 200px;
    height: 300px;
    font-size: 20px;
    background-color: #258BD6;
}
.title {
    width: 9em;
    height: 4em;
    background-color: #FE7235;
}
</style>

```

选择器 content 的 font-size 是 20px，在选择器 title 的 width 属性的值为 9em，由于 title 所在的 div 标签父元素是 content 所在的标签，所以 width = 9*font-size=9*20=180px；同理 height = 4*20=80px；如果 title 所在的 div 标签 设置了 font-size，那么 em 计算的值将会依据自身的 font-size 计算。




**rem**（font size of root element）: 这个单位是依据「根元素 html 标签」的 font-size 来计算最终的值，这个单位对移动端web开发十分实用，通过设置 html 的 font-size 来等比缩放元素的大小。比如下面的代码，title 所在的 div 标签 width=15*9=135px，

height=15*4=60px；

```

<body>
    <div class="content">
        <div class="title"></div>
    </div>
</body>

```

```
<style>
html {
    font-size: 15px;
}
body {
    background-color: #eeeeee;
    font-size: 10px;
}
.content {
    width: 200px;
    height: 300px;
    font-size: 20px;
    background-color: #258BD6;
}
.title {
    font-size: 10px;
    width: 9rem;
    height: 4rem;
    background-color: #FE7235;
}
</style>
```




**vw（viewport width）**，可视区域宽度，比如设置 50vw，相当于可视区域宽度的一半；

**vh（viewport height）**，可视区域高度，比如设置 50vh，相当于可视区域高度的一半；



```

<body>
    <div class="content"></div>
</body>
```

```

<style>
* {
    padding: 0;
    margin: 0;
}
.content {
    width: 50vw;
    height: 50vh;
    font-size: 20px;
    background-color: #258BD6;
}
</style>
```






**vmax**: vw 和 vh 中最大的；
**vmin**: vw 和 vh 中最小的；

下面的代码将显示一个方形的块。

```
.content {
    width: 10vmax;
    height: 10vh;
    font-size: 20px;
    background-color: #258BD6;
}
```






**绝对单位**

绝对单位，我们常用的是像素 px，还有其它的单位比如 cm。



**时间单位**

时间单位有两种：

1.10s：表示10秒；

2.10ms：表示 10 毫秒；







**总结**



这节课程主要介绍了CSS中常用的单位，其中 rem 在移动 web 开发中比较常用，可以通过不同的屏幕尺寸动态调整 html 标签的 font-size 来达到 HTML 元素的等比缩放。vm 和 vh 是相对可视区域的布局单位，现在也在逐步流行起来。这节课程只是简单的介绍了 CSS 中基本的长度单位，后续会由这些基本的长度单位过渡到移动web的适配。



## CSS中的权重

有时候明明设置了某个CSS属性，但是在浏览器查看的时候却没效果；同时在类选择器和id选择设置某个标签的背景颜色，最终会是哪个选择器起作用？这些问题会涉及到 CSS 的权重问题，你可以把权重看做优先级。其实有的同学可能会疑惑，为什么或设计到权重问题，我举个简单的例子，下面“前端小课，每日一课”的字体颜色是什么：



```

div p {
    color: #8E24AA;
}
p {
    color: #1E88E5;
}
```

```

<body>
    <div>
        <p>前端小课，每日一课</p>
    </div>
</body>
```

再举一个例子，下面“前端小课，每日一课”的字体颜色是什么：

```

.title {
    color: #43A047;
}
#name2 {
    color: #3949AB;
}
```

```

<body>
    <div>
        <p id="name" class="title">前端小课，每日一课</p>
    </div>
</body>
```

上面两个例子就涉及到了 CSS 权重问题，浏览器最终总会要确定如何渲染 HTML 元素。CSS 的权重可以通过 4 个以 - 分开的数字来表示权重值的大小，比如：1-0-10-0，0-1-1-1，比较的时候先从高位开始对比，如果相同则对比下一位的值。举几个例子：

```
0-0-1-0 大于 0-0-0-1；
1-1-0-0 大于 1-0-12-30；
```



那么这些数值是如何来的呢？

每一类选择器可以给它分配一个特定的值。下图中分别用 g、z、y、x 表示各个选择器表示的值。如果你还不懂选择器，这几篇文章必须好好看：

[第14天：在文字前、后插入一个图标](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484136&idx=1&sn=9898b3c06ef588f870c414b88eff91f1&chksm=ec0c2582db7bac94116bd2b501b12bc952073551152cd7bc89cf992c9987e6b1999758310329&scene=21#wechat_redirect)
[群里讨论的一个选择器问题（一定要看）](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484057&idx=1&sn=3becbefb82083dade574051504a409af&chksm=ec0c25f3db7bace5013991bb4e06d450a2ea1e0a38b018903c9113a005dd9047a6e590b784d8&scene=21#wechat_redirect)
[第7天：CSS中的选择器详解](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484022&idx=1&sn=ad15f8ea96ca947bb5d87b6b0683809b&chksm=ec0c251cdb7bac0ad851e2c2d7f7dd0c700d5052300aaa90fd0c330c45fccb7328876248b5dc&scene=21#wechat_redirect)

一图胜千言：




g：直接在元素中使用属性，权重最高，可以看做 1-0-0-0；

z：id选择器，权重次子，可以看做 0-1-0-0；

y：类、伪类、属性选择器，权重低，可以看做 0-0-1-0；

x：元素、伪元素选择器，权重最低，可以看做 0-0-0-1；



我们一起学习下网上流行的 3 张宝图：



第一张宝图来自 *https://specifishity.com/* 


CSS specifical，可以翻译成 CSS 权重，图中通过鱼和鲨鱼来表示选择器的权重。



*：通用选择器，权重最低，就是 0，第 1 张图就是此意；

div、li>ul、body：元素选择器，有几个值权重值就是几。li>ul 是两个元素，> 号不会干扰权重计算；第 2、3、4张图能看懂了吧，就是元素选择器，1个元素选择器就是 0-0-1，12个元素选择器就是 0-0-12；

.myClass, [type=chekbox], :only-of-type : 类、属性、伪类选择器。第 5 张图，一个类选择器，权重值表示为 0-1-0；5-15张图能看懂了吧；

\#myDiv：id选择器，一条鲨鱼，权重比较高，权重值为 1-0-0；

style：权重值更高，权重值为 1-0-0-0；

!important: 无敌，我是老大，告诉浏览器必须使用我定义的属性；



第二张宝图来自: *https://stuffandnonsense.co.uk/archives/css_specificity_wars.html*

有了上面知识的基础，理解下面这张图就不难理解了。图中的权重值逐渐递增。不同的的小人代码不同选择器的权重值：


下面是不同选择器之间结合的权重值:


第三张宝图来自: *https://cssspecificity.com/*


我看看一看实际的例子来说明 CSS 的权重问题。

**实例**

1.下面代码中最终会显示什么颜色。

```
* {
    /* 权重值为 0-0-0 */
    color: blue;
}
/* 权重值为 0-0-1 ，元素选择器*/
p {
    background-color: #eeeeee;
    color: purple;
}
/* 权重值为 0-1-1 = 0-0-1（元素选择器） + 0-1-0（伪类选择器） */
p:nth-child(2) {
    color: red;
}
```

```
<body>
    <div class="box">
        <p>第1个p</p>
        <p>第2个p</p>
        <p>第3个p</p>
    </div>
</body>
```




2.多种选择器相结合，权重值该如何计算；

```
/* 权重值为 0-0-1 （1个元素选择器）*/
p {
    color: purple;
}
/* 权重值为 0-0-2 （2个元素选择器）*/
div p {
    color: bisque;
}
/* 权重值为 0-1-0（ class 选择器） */
.title {
    color: blue;
}
/* 权重值为 1-0-0 （id选择器）*/
#name, #name1, #name2, #name3 {
    color: green;
}
/* important 不会增加权重值，但是使用它的时候浏览器会直接使用这个属性值忽略其它属性值，它是老大 */
.imp {
    color: red !important;
}
/* 权重值为 1-0-1 = 1-0-0（id选择器）+ 0-0-1（伪元素选择器）*/
#name::first-letter {
    color: peru;
}
```

```

<body>
    <div class="box">
        <p id="name" class="title">第1个p</p>
        <p id="name1" class="title">第2个p</p>
        <p id="name2" class="title imp">第3个p</p>
        <!--  style 的权重中为 1-0-0-0 -->
        <p id="name3" class="title" style="color: brown">第4个p</p>
    </div>
</body>
```




**总结**

CSS权重其实理解起来并不是很难，整个权重的设计思路很符合正常的思想，选择器选择的范围越小，权重值一般就会很大。VSCode 中提供了一种方法可以看到具体的权重值，鼠标停到选择器上面，就会显示下图所示的权重值。




## 写出易复用、易维护、结构清晰的 CSS

写 CSS 的时候常会遇到很多痛点，比如不能定义变量、结构不清晰、不易维护等等。随着社区的不断发展，便出现了 less 这种类似于 CSS 的库，它能有效避免我所提到的问题。



>  Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
>
> Less中文网



你可以像使用 CSS 一样使用 Less，CSS 中的所有语法规则都适用于 Less，但是 Less 却为 CSS 增加了新的特性。在实际的项目开发中，一般需要把 Less 转换成 CSS 供浏览器使用。官方也提供了 Less 转换 CSS 的工具。



可以通过 npm（node package manager）安装 Less 转换 CSS 的工具，安装 node 后，npm 会自动安装。可以通过下面的地址来安装 node，http://nodejs.cn/download/。安装完 node 后通过 npm 来安装 less 工具，在终端执行命令：



```
npm install -g less
```



我们写一段 Less 代码来学习 Less 的使用，创建下面几个文件：



```
├── base.less 用来定义一些变量，比如字体颜色，背景颜色
├── index.html 显示最终结果的demo
├── layout.css 由 less 编译后生成的 css 文件
└── layout.less less 文件
```

base.less：

```

@main-color: #1565C0;
@text-color: #222222;
@des-color: #999999;
@backgroud-color: #eeeeee;
@edge-width: 16px;
@small-edge-width: 8px;
@strong-color: red;
@nomal-font-size: 18px;

.wx-border {
    border: solid 1px @main-color;
}
```

变量是通过 @name 来定义的，其它 less 可以使用已经定义好的变量。

layout.less：

通过 @import 来导入在 base.less 中定义的变量及选择器：

```
@import "./base.less";
```

定义 header 选择器，使用这种嵌套的方式可以有效避免 CSS 选择器名字重复的问题，它其实最后会被编译成后代选择器，A B  { } 。& 表示引用父选择器的名字。

```

.header {
    padding: 0 @edge-width;
    background-color: @backgroud-color;
    .title {
       // @text-color 在 base.less 定义好的变量
        color: @text-color;
        font-size: @nomal-font-size;
        &::first-letter {
            font-size: 24px;
            color: @strong-color;
        }
    }
    p a {
        color: @main-color;
        font-size: @nomal-font-size;
        /**&:hover 相当于 a:hover**/
        &:hover {
            color: @strong-color;
        }
    }
    p:nth-child(3) {
        width: 100px;
        text-align: center;
        padding: @small-edge-width;
        /**引用在 base.less 定义好的选择器 **/
        .wx-border();
    }
}
```

把这段代码通过 less 工具编译，在终端输入，会把结果输入到当前目录下的 layout.css 文件中：

```
lessc layout.less layout.css
```

编译结果：

```
.header {
  padding: 0 16px;
  background-color: #eeeeee;
}
.header .title {
  color: #222222;
  font-size: 18px;
}
.header .title::first-letter {
  font-size: 24px;
  color: red;
}
.header p a {
  color: #1565C0;
  font-size: 18px;
}
.header p a:hover {
  color: red;
}
.header p:nth-child(3) {
  width: 100px;
  text-align: center;
  padding: 8px;
  border: solid 1px #1565C0;
}
```

定义一个 footer 选择器，属性的值可以使用运算符做运算：

```

.footer {
    padding: 0 @edge-width;
    background-color: @backgroud-color;
    margin-top: @small-edge-width;
    #alert {
       // 编译后结果会被计算出来
        width: @edge-width + 80px;
        height: 100px;
        line-height: 100px;
        margin: 0 auto;
    }
}
```

通过 less 工具编译，在终端输入，会把结果输入到当前目录下的 layout.css 文件中：

```
lessc layout.less layout.css
```

编译结果：

```

.footer {
  padding: 0 16px;
  background-color: #eeeeee;
  margin-top: 8px;
}
.footer #alert {
  width: 96px;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
}
```

Less 中还提供了一些函数、字符串、数组的功能，这里举一个在 [第9天：自我介绍](http://mp.weixin.qq.com/s?__biz=MzI5MTY0ODAwNQ==&mid=2247484080&idx=1&sn=0df71fc48c05bffd229fcd07e1a57cbf&chksm=ec0c25dadb7baccc357f607a31de80f2de0a5763cb1528b6b0958a441babfbff718e4518fcc5&scene=21#wechat_redirect) 这节课程中使用的 CSS，定义如下：

```

.dsa-box div:nth-child(1) {
    background-image: url('./images/1.png');
}
.dsa-box div:nth-child(2) {
    background-image: url('./images/2.png');
}
.dsa-box div:nth-child(3) {
    background-image: url('./images/3.png');
}
.dsa-box div:nth-child(4) {
    background-image: url('./images/4.png');
}
.dsa-box div:nth-child(5) {
    background-image: url('./images/5.png');
}
.dsa-box div:nth-child(6) {
    background-image: url('./images/6.png');
}
.dsa-box div:nth-child(7) {
    background-image: url('./images/7.png');
}
.dsa-box div:nth-child(8) {
    background-image: url('./images/8.png');
}
.dsa-box div:nth-child(9) {
    background-image: url('./images/9.png');
}
```

这段 CSS 代码很长，但是很有规律，使用 Less，5 行代码即可搞定，以后如何想加入新的图片也非常方便。代码原理就是使用 rang 生成 1 到 9 这几个数字，通过 each 来遍历，然后生成对应的选择器。

```

each(range(9), {
    .dsa-box div:nth-child(@{value}) {
        background-image: url("./images/@{value}.png");
    }
});
```

使用也非常简单，和使用 CSS 一样，我们只是用被编译好的 layout.css 文件：

```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Less</title>
    <link rel="stylesheet" href="./layout.css">
</head>
<body>
    <div class="header">
        <p class="title">我是Less，使用我很方便</p>
        <p><a href="http://lesscss.org/#" target="_blank">想用我就点我吧</a></p>
        <p>LESS -> CSS</p>
    </div>
    <div class="footer">
        <p id="alert">到底了</p>
    </div>
</body>
</html>
```

最终效果如下：





**总结**

今天的内容主要介绍 Less 常用的知识点，还有好多高级的功能读者可以自行到官网上学习。





## 前端的第20天

这一阶段我们学习了：

*1*.HTML 常用标签的使用；
*2*.CSS 中各种选择器的定义和使用；
*3*.块级和行内元素在浏览器中的不同表现；
*4*.display 属性；
*5*.CSS 选择器的权重以及 Less 的使用；
*6*.CSS常用的属性；
*7.*盒子模型；
*8*.Node、npm、DOM、JavaScript、CSS布局；（了解）