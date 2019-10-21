const navConfig = require('../../config/navConfig.js');
const sidebarConfig = require('../../config/sidebarConfig/index.js');

module.exports = {
  "title": "Kevin-Blog",
  "description": "",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon2.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    [ 'link', 
      {
        "rel": 'stylesheet',
        "href": '/css/style.css'
      }
    ],
    [
      'script', 
      {
        "charset": 'utf-8',
        "src": '/js/main.js'
      }
    ]
  ],
  "theme": "reco", //主题
  "themeConfig": {
    "repo": 'kevin9281/kevin-blog',
    "nav": navConfig,
    "sidebar": sidebarConfig,
    "sidebarDepth":2,
    "type": "blog",
    "logo": "/head.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "kevin",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    "@vuepress/medium-zoom",
    "flowchart"
  ]
}