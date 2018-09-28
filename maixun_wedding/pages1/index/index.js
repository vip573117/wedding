//index.js
//获取应用实例
var app = getApp()
Page({
	data: {
		navs: [],
		slide: [],
		commend: [],
		userInfo: {}
	},
	onLoad: function () {
		var that = this
		app.util.footer(that);
		//初始化导航数据
    app.util.request({
      url: 'entry/wxapp/index',
      cachetime: '0',
      success: function (res) {
        console.log(res);
      }
    });
	}
});
