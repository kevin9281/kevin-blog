
// 介绍
const guide = require('./guide/index.js');

// 基础
const git = require('./base/git/index.js');
const css = require('./base/css/index.js');
const html = require('./base/html/index.js');
const javascript = require('./base/javascript/index.js');
const node = require('./base/node/index.js');
const webpack = require('./base/webpack/index.js');

// 框架与库
const angularjs = require('./os/angularjs/index.js');
const vue = require('./os/vue/index.js');
const react = require('./os/react/index.js');
const jquery = require('./os/jquery/index.js');

// 随手笔记
// 页面布局
// 自适应布局
const selfadaption = require('./frontend/selfadaption/index.js');

//响应式布局
const responsetype = require('./backend/responsetype/index.js');

// 数据交互与请求
const jsajax = require('./ajax/jsajax/index.js');
const jqajax =require('./ajax/jqajax/index.js');
const vueajax = require('./ajax/vueajax/index.js');
const wzry = require('./ajax/wzry/index.js');

// 面试题
const cssSubject = require('./more/cssSubject/index.js');
const jsSubject = require('./more/jsSubject/index.js');
const vueSubject = require('./more/vueSubject/index.js');
const difficulty = require('./more/difficulty/index.js');
/**
 * 侧边栏的配置
 * 当路由深度越深时应当排序在更前方
 * 示例: /frontend 和 /frontend/css
 * 
 * 应当将 /frontend/css 写在更上方
 */

module.exports = {
  // 指南 Guide
  '/guide/': guide,
  
  // 基础 Base
  '/base/git/': git,
  '/base/css/': css,
  '/base/javascript/': javascript,
  '/base/html/': html,
  '/base/node/': node,
  '/base/webpack/': webpack,

  // 框架与库 OS
  '/os/vue/': vue,
  '/os/angularjs/': angularjs,
  '/os/react/': react,
  '/os/jquery/': jquery,

  /* 随手笔记 */
  // 页面布局
  // 自适应
  '/frontend/selfadaption/': selfadaption,
  // 响应式
  '/backend/responsetype/': responsetype,

  // 数据请求与交互
  '/ajax/jsajax/': jsajax,
  '/ajax/jqajax/': jqajax,
  '/ajax/vueajax/': vueajax,
  '/ajax/wzry/': wzry,

  // 面试题
  '/more/cssSubject/': cssSubject,
  '/more/jsSubject/': jsSubject,
  '/more/vueSubject/': vueSubject,
  '/more/difficulty/': difficulty,
  
  // 根目录下的 sidebar, 对于所有未匹配到的都会应用该 sidebar
  // '/': [''] // 此处选择禁用
};