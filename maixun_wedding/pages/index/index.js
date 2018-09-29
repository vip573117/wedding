//index.js
//获取应用实例
var app = getApp();
var indexData = require('../../data/index-data.js');

Page({
  data: {
    tabIndex: 9,
    addShow: 'none',
    popupShow: 'none',
    wid: ''
  },

  onLoad: function(e) {
    wx.showLoading({
      title: 'Loading',
      mask: true
    });
    var page = this
    //假数据填充
    page.setData({
      style: indexData.style,
      list: indexData.list,
      expendList: indexData.expendList,
      invitList: indexData.invitList
    });
    wx.login({
      success: function(res) {
        if (res.code) {
          app.util.request({
            url: 'entry/wxapp/index',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
              //'content-type': 'application/json'
            },
            method: 'POST',
            data: {
              code: res.code,
              openid: 3215644
            },
            success: function(res) {
              console.log(res)
              if (res.data.code == 200) {
                app.openid = res.data.data.openid
                app.user = res.data.data.info
                page.setData({
                  wid: res.data.data.info.id,
                  date: res.data.data.info.date,
                })
              } else if (res.data.code == 201) {
                app.openid = res.data.data.openid
              } else {

              }
              console.log(res)
            },
            fail: function() {
              wx.hideLoading()
            }

          })
        }
      }
    })




  },

  //切换变化函数
  tabShow: function(e) {
    //变化后的样式数组
    var style = {
      titleShow: 'none',
      timePdTop: 15 + 'rpx',
      timePdBot: 25 + 'rpx',
      formBgShow: 'block',
      tabTop: 980 + 'rpx',
      tabPadTop: 20 + 'rpx',
      tabMarTop: 0 + 'rpx'
    };
    this.setData({
      style: style,
      tabIndex: e.currentTarget.dataset.id
    });
    this.iconShow();
    this.picShow();
  },

  //返回首页函数
  toIndex: function() {
    var style = {
      titleShow: 'block',
      timePdTop: 60 + 'rpx',
      timePdBot: 60 + 'rpx',
      //显示选项表单
      formBgShow: 'none',
      //底部导航栏样式
      tabTop: 42 + '%',
      tabPadTop: 130 + 'rpx',
      tabMarTop: 0 + 'rpx'
    };
    this.setData({
      style: style,
      tabIndex: 9,
      addShow: 'none'
    });
  },

  // 显示添加事项函数
  iconShow: function(e) {
    var tabIndex = this.data.tabIndex;
    var that = this;
    if (tabIndex == 0 || tabIndex == 1 || tabIndex == 3 || tabIndex == 4) {
      that.setData({
        addShow: 'block'
      });
    } else {
      that.setData({
        addShow: 'none'
      });
    }
    console.log(tabIndex);
  },

  picShow: function() {
    var tabIndex = this.data.tabIndex;
    var that = this;
    if (tabIndex == 0 || tabIndex == 3) {
      that.setData({
        iconPic: 'add'
      });
    } else if (tabIndex == 1 || tabIndex == 4) {
      that.setData({
        iconPic: 'add1'
      });
    } else {
      that.setData({
        iconPic: ''
      });
    }
  },

  //打开关闭弹窗
  ctrlPopup: function(e) {
    console.log(e.currentTarget);
    var cur = e.currentTarget.dataset;
    if (this.data.popupShow === 'none') {
      this.setData({
        popupShow: 'block',
        curTxt: cur.txt,
        curInputList: cur.inputlist
      });
    } else {
      this.setData({
        popupShow: 'none'
      });
    }
  },

  //跳转到修改时间页面
  toDate: function(e) {
    var page = this
    var wid = page.data.wid
    wx.navigateTo({
      url: '../date/date?wid=' + wid
    });
  },

  //跳转添加页面
  toAdd: function(e) {
    var tabIndex = this.data.tabIndex;
    var that = this;
    if (tabIndex == 0 || tabIndex == 3) {
      wx.navigateTo({
        url: '../add/add'
      });
    } else {
      wx.navigateTo({
        url: '../expend/expend'
      });
    }
  }
});