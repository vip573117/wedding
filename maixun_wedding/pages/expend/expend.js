// pages/expend/expend.js
const app = getApp()
var expendData = require('../../data/expend-data.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    display: 'none',
    zdy:'',
    disabled:true,
    curPic:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this 
    app.util.request({
      url: 'entry/wxapp/selectitem',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          page.setData({
            iconList: res.data.data
          });
        }
        else if (res.data.code == 201) {
          wx.showToast({
            title: '未找到数据',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  //提交
  additem:function(e){
      console.log(e)
    var page = this 
    var money = e.detail.value.money
    var title = e.detail.value.title
    if (title==''){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (money == '') {
      wx.showToast({
        title: '开销不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    app.util.request({
      url: 'entry/wxapp/additem',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        icon: page.data.curPic,
        openid:app.openid,
        wid: app.user.wid,
        title: title,
        money: money,
        id:page.data.id
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          app.kx_num = app.kx_num +1
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        }
        else if (res.data.code == 201) {
          wx.showToast({
            title: '未找到数据',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function () {
        wx.hideLoading()
      }
    })

  },
  selectItem: function (e) {
    console.log(e.currentTarget);
    var cur = e.currentTarget.dataset
    if (cur.id == -1){
      this.setData({
        disabled:false,
        zdy: '请输入标题',
        curPic: cur.icon,
        display: 'block',
        curTxt:'',
        id: -1
      })
    }else{
      this.setData({
        curTxt: cur.title,
        curPic: cur.icon,
        display: 'block',
        id: cur.id
      })
    }
   
  }
});
