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
    "nav": [{
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "面试题",
        "icon": "reco-message",
        "link": "/topic/",
      },
      {
        "text": "记录时间",
        "link": "/timeLine/",
        "icon": "reco-date"
      },
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "前端基础"
      },
      "tag": {
        "location": 4,
        "text": "标签记录"
      }
    },
    "logo": "/head.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
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