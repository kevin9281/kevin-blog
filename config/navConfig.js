module.exports = [
  { text: '首页', link: '/' ,"icon": "reco-home"},
  { text: '介绍', link: '/guide/', "icon":"reco-tag" },
  { text: '基础', "icon": "reco-message",
  items: [
    { text: 'HTML', link: '/base/html/' },
    { text: 'CSS', link: '/base/css/' },
    { text: 'JavaScript', link: '/base/javascript/' },
    { text: 'TypeScript', link: '/base/typescript/' },
    { text: 'Node', link: '/base/node/' },
    { text: 'Webpack', link: '/base/webpack/' },
    { text: 'GIT', link: '/base/git/' },
  ]},
  { text: '框架与库', "icon": "reco-message",
  items: [
    { text: 'Vue', link: '/os/vue/' },
    { text: 'AngularJS', link: '/os/angularjs/' },
    { text: 'React', link: '/os/React/' },
    { text: 'jQuery', link: '/os/jquery/' },
  ]},
  {
    text: '随手笔记',"icon": "reco-message",
    items: [
      { text: '自适应布局', 
      items: [
        { text: '详解自适应', link: '/frontEnd/selfadaption/' },
      ]},
      { text: '响应式布局', items: [
        { text: '详解响应式', link: '/backend/responsetype/' },
      ]},
      { text: '数据交互与请求', items: [
        { text: '原生Ajax', link: '/ajax/jsajax/' },
        { text: 'jQuery的Ajax', link: '/ajax/jqajax/' },
        { text: 'Vue的后台管理', link: '/ajax/vueajax/' },
        { text: 'ESLint', link: '/ajax/wzry/' },
        { text: 'mock的使用', link: '/ajax/mock/' },
      ]},
    ]
  },
  { text: '面试题', "icon": "reco-message",items: [
    { text: 'CSS', link: '/more/cssSubject/' },
    { text: 'JavaScript', link: '/more/jsSubject/' },
    { text: 'Vue', link: '/more/vueSubject/' },
    { text: '项目难点', link: '/more/difficulty/' },
    { text: 'BING', link: 'https://cn.bing.com' },
  ]},
];



