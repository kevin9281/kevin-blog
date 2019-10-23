---
title: 一套本人使用的初始SCSS
---

##  style.scss  

```
// reset
//存放所有的实现 变量以删除
//引入变量 scss 引入不需要加下划线 但是被包含的文件需要加下划线
@import './variables';   

* {  //全局的所有元素
  box-sizing: border-box; //必须加的 以边框为准
  outline: none;  //取消高亮
}

html {  //html字体
  font-size: 13px;
}

body{   //解决初始化
  margin: 0;    
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.2em;
  background: #f1f1f1;
  -webkit-font-smoothing: antialiased;
}

a{
  text-decoration: none;  //去除下划线
  color: #999;
}

p{
  line-height: 1.5em;   //行高
}


//   前面的名字  后面具体的值  变量colors
// 就可以在页面中使用class .text-danger 类似于这样 显示字体颜色
// 就可以在页面中使用class .bg-danger 类似于这样 显示背景颜色
@each $colorKey , $color in $colors {
  .text-#{$colorKey} {
    color:$color !important
  }
  .bg-#{$colorKey} {
    background-color:$color
  }
}

//字体对齐方式 class  .text-left 类似
// text align
@each $var in (left , center , right) {
  .text-#{$var} {
    text-align: $var !important;
  }
}

//字体大小  class  .fs-xxs 类似  
@each $sizeKey , $size in $font-sizes {
  .fs-#{$sizeKey}{
    font-size: $size * $base-font-size 
  }
}

//text overflow 文字超出隐藏不换行只显示一行
//class text-ellipsis 
.text-ellipsis {
  display: inline-block;  //行内块元素 就是不独占一行的块级元素 不占一行 能设置宽高 能用padding margin
  overflow: hidden;  // overflow 属性规定当内容溢出元素框时发生的事情。 内容会被修剪，并且其余内容是不可见的。
  text-overflow:ellipsis; //text-overflow 属性规定当文本溢出包含元素时发生的事情。显示省略符号来代表被修剪的文本。
  white-space:nowrap; //white-space 属性设置如何处理元素内的空白。 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
}

//width height
.w-100{  //宽度100%
  width: 100%;
}
.h-100{  //高度100%
  height: 100%;
}


//flex
.d-flex {
  display: flex ;  //设置为弹性盒模型容器 所有子元素都是成员
}

.flex-column{  //纵向排列
  flex-direction: column;  //row：横向从左到右排列（左对齐），默认的排列方式。 在父容器上设置 同时需要设置父容器为弹性盒模型
}
.flex-wrap{  //换行
  flex-wrap: wrap; //wrap：当子元素溢出父容器时自动换行。 同样设置在父容器上 也需要父容器为弹性盒模型
}


// class .jc-start  
//为 justify-content: flex-start,
//弹性盒子元素将向行起始位置对齐。
//该行的第一个子元素的主起始位置的边界将与该行的主起始位置的边界对齐，
//同时所有后续的伸缩盒项目与其前一个项目对齐。 同样设置在父容器上 也需要父容器为弹性盒模型
@each $key , $value in $flex-jc {
  .jc-#{$key}{
    justify-content: $value;
  }
}

// class .ai-start
//为 align-items: flex-start
//设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式。
//弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴（纵轴）起始边界。
//同样设置在父容器上 也需要父容器为弹性盒模型
@each $key , $value in $flex-ai {
  .ai-#{$key}{
    align-items: $value;
  }
}

//适用于弹性盒模型容器子元素
//设置flex:1的时候中间的部分就会自动填充父布局的剩余空间
.flex-1{
  flex: 1;
}

//适用于弹性盒模型容器子元素
//flex-grow 属性决定了父元素在空间分配方向上还有剩余空间时，
//如何分配这些剩余空间。其值为一个权重（也称扩张因子），
//默认为 0（纯数值，无单位），剩余空间将会按照这个权重来分配。
//设置为 1 它就可以占满水平剩余空间
.flex-grow-1{
  flex-grow: 1;
}

//此处设置的是边距
// m-0 , mx-0
@each $typeKey , $type  in $spacing-types {
  // .m-1
  @each $sizeKey , $size in $spacing-sizes {
    .#{$typeKey}-#{$sizeKey}{
      #{$type} : $size * $spacing-base-size
    }
  }
  // .mx-1  .my-1
  @each $sizeKey , $size in $spacing-sizes {
    .#{$typeKey}x-#{$sizeKey}{
      #{$type}-left : $size * $spacing-base-size;
      #{$type}-right : $size * $spacing-base-size;
    }
    .#{$typeKey}y-#{$sizeKey}{
      #{$type}-top : $size * $spacing-base-size;
      #{$type}-bottom : $size * $spacing-base-size;
    }
  }
  // .mt-1
  @each $directionKey , $direction in $spacing-directions {
    @each $sizeKey , $size in $spacing-sizes {
      .#{$typeKey}#{$directionKey}-#{$sizeKey}{
        #{$type}-#{$direction} : $size * $spacing-base-size
      }
    }
  }
}

//borders 边框颜色 light-1
@each $dir in (top, right, bottom, left) {
  .border-#{$dir} {
    border-#{$dir}:1px solid $border-color;
  }
}

//------------------后面的可要可不要 -------------------------

//button 按钮初始化
.btn{
  border: none;
  border-radius: 0.1538rem;
  font-size: map-get($font-sizes, 'sm') * $base-font-size;
  padding: 0.2rem 0.6rem;
}

//nav 
.nav {  //导航栏
  display: flex;
  .nav-item {  //正常导航
    border-bottom: 3px solid transparent;
    padding-bottom: 0.2rem;
    &.active {
      color: map-get( $colors , 'primary');
      border-bottom-color:map-get( $colors , 'primary');
    }
  }
  &.nav-inverse{  //反色导航
    .nav-item {
      color: map-get( $colors , 'white');
      &.active{
        border-bottom-color: map-get( $colors , 'white');
      }
    }
  }
}



//sprite
.sprite {  
  background: url(../images/index.png) no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  //九宫格精灵图
  &.sprite-news{
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }
  &.sprite-story{
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 90.483% 15.614%;
  }
  &.sprite-shopping{
    width: 1.4615rem;
    height: 1.6923rem;
    background-position: 36.746% 0.924%;
  }
  &.sprite-experience{
    width: 1.5385rem;
    height: 1.5385rem;
    background-position: 10.408% 15.517%;
  }
  &.sprite-people{
    width: 1.5385rem;
    height: 1.6154rem;
    background-position: 89.733% 1.266%;
  }
  &.sprite-inherit{
    width: 1.8462rem;
    height: 1.5385rem;
    background-position: 36.467% 15.287%;
  }
  &.sprite-community{
    width: 2rem;
    height: 1.6154rem;
    background-position:  9.728% 1.266%;
  }
  &.sprite-campsite{
    width: 1.8462rem;
    height: 1.8462rem;
    background-position: 63.3% 0.927%;
  }
  &.sprite-public{
    width: 1.8462rem;
    height: 1.5385rem;
    background-position: 0 96.207%;
  }
  &.sprite-introduce{
    width: 1.5385rem;
    height: 1.5385rem;
    background-position: 10.408% 15.517%;
  }
  //收起箭头精灵图
  &.sprite-arrow{
    width: 0.7692rem;
    height: 0.7692rem;
    background-position: 38.577% 52.076%;
  }
}

```

## _variables.scss  

```
//存放所有变量

// colors
$colors:(
  'danger':#860C06,
  'info': #4b67af,
  'blue':#4394e4,
  'blue-1':#093794,
  'primary':#db9e3f,
  'white':#fff,
  'light':#f9f9f9,
  "grey":#999,
  'grey-1' : #666,
  'dark-1':#343440,
  'dark':#222,
  'black':#000,
  'light-1': #d4d9de,
);

$border-color:map-get($colors,'light-1');


//font size
$base-font-size: 1rem;
$font-sizes:(
  xxs: 0.6154,
  xs : 0.7692,
  sm : 0.9231,
  md: 1,
  lg: 1.0769,
  xl: 1.2308,
);

//主轴
$flex-jc:(
  start: flex-start,
  end: flex-end,
  center: center,
  between: space-between,
  around: space-around,
);

//交叉轴
$flex-ai:(
  start: flex-start,
  end: flex-end,
  center: center,
  stretch: stretch,
);

// spacing 边距

$spacing-types: (
  m : margin,
  p : padding
);
$spacing-directions:(
  t : top,
  r : right,
  b : bottom,
  l : left
);
$spacing-base-size: 1rem;
$spacing-sizes:(
  0 : 0,
  1 : 0.25,
  2 : 0.5,
  3 : 1,
  4 : 1.5,
  5 : 3,
);
```