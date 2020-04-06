const base = process.env.NODE_ENV ? '/docs/' : '/';
const path = require('path');
module.exports = {
  // 设置路径别名，解决引入图片路径问题
  configureWebpack: {
    resolve: {
      alias: {
        '@vuepress': path.join(__dirname, '../images/vuepress'),
      }
    }
  },
  theme: 'reco',
  title: 'Notes',
  description: '我的个人博客',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: './imgs/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  // dest: './dist',  // 设置输出目录
  base, // 这是部署到github相关的配置
  // repo: 'https://github.com/MyNetdisk/vuepressDemo', // 添加 github 链接
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    type: 'blog',
    logo: './imgs/avatar.png',
    author: 'kungfu迷',
    authorAvatar: './imgs/avatar.png',
    autoHideNavbar: true,
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    },
    nav: [
      { text: 'Home', link: '/', icon: "reco-home" },
      { text: 'TimeLine', link: '/TimeLine/', icon: 'reco-date' },
      { text: 'About', link: '/views/about/', icon: "reco-account" },
      {
        text: 'Contact',
        icon: "reco-message",
        items: [
          { text: 'Github', link: 'https://github.com/MyNetdisk', icon: "reco-github" },
          { text: 'Email', link: 'mailto:peregrinator@yeah.net', icon: "reco-message" },
          // { text: 'QQ', link: 'http://qr.topscan.com/api.php?text=http://qm.qq.com/cgi-bin/qm/qr?k=1PbIl8QPOkF0ErJKX-GmjA-E8e53djl4', icon: "reco-qq" },
          // { text: 'Wechat', link: 'http://qr.topscan.com/api.php?text=https://u.wechat.com/EPDjgRrQutXUU-K1XzT9X_0', icon: "reco-wechat" }
        ]
      },
      { text: 'Repo', link: 'https://github.com/MyNetdisk/vuepressDemo' }
    ],
    friendLink: [ //添加友链
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com'
      },
    ],
    // 备案
    record: 'ICP 备案文案',
    recordLink: 'ICP 备案指向链接',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2020',
  }
};