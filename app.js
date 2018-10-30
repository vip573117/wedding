//app.js
App({
  data: {
    imageFilePath: '',//图片地址
    qrcode: '',
    path: "http://www.kaikai.com/api.php/move/",
    // path: "http://www.kaigirl.com/lyadmin/api.php/move/",
    ip: 'http://www.kaikai.com/',
  },
  openid: null,
  user: {},
  kx_num:0,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onError: function (msg) {
    console.log(msg)
  },
  util: require('we7/resource/js/util.js'),
  tabBar: {
    "color": "#123",
    "selectedColor": "#1ba9ba",
    "borderStyle": "#1ba9ba",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "/we7/pages/index/index",
        "iconPath": "/we7/resource/icon/home.png",
        "selectedIconPath": "/we7/resource/icon/homeselect.png",
        "text": "首页"
      },
      {
        "pagePath": "/we7_wxappdemo/pages/todo/todo",
        "iconPath": "/we7/resource/icon/todo.png",
        "selectedIconPath": "/we7/resource/icon/todoselect.png",
        "text": "ToDo"
      },
      {
        "pagePath": "/we7_wxappdemo/pages/pay/pay",
        "iconPath": "/we7/resource/icon/user.png",
        "selectedIconPath": "/we7/resource/icon/userselect.png",
        "text": "支付"
      },
      {
        "pagePath": "/rcdonkey_signup/pages/publish/publish",
        "iconPath": "/we7/resource/icon/user.png",
        "selectedIconPath": "/we7/resource/icon/userselect.png",
        "text": "报名"
      }
    ]
  },
  globalData: {
    userInfo: null,
    gloabalFomIds: []
  },
  siteInfo: {
    'uniacid': '2',
    'acid': '2',
    'multiid': '0',
    'version': '1.0.0',
    // 'siteroot' : 'http://demo.yoois.com/app/index.php',
    'siteroot': 'http://www.pengkai.com/app/index.php',
  }
});