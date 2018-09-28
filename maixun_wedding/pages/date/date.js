// pages/date/date.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    wid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value
    });
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    console.log(app.openid)
    var page =this
    if (page.data.date=='') {
      wx.showToast({
        title: '请选择婚礼日期',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (!e.detail.value.bride || e.detail.value.bride==''){
      wx.showToast({
        title: '请填写新娘姓名',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
      }
    if (e.detail.value.bridephone == '' || !e.detail.value.bridephone) {
      wx.showToast({
        title: '请填写新娘电话',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (e.detail.value.groom == '' || !e.detail.value.groom) {
      wx.showToast({
        title: '请填写新郎姓名',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (e.detail.value.groomphone == '' || !e.detail.value.groomphone) {
      wx.showToast({
        title: '请填写新郎电话',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    app.util.request({
      url: 'entry/wxapp/index',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        openid: app.openid,
        bride: e.detail.value.bride,
        bridephone: e.detail.value.bridephone,
        groom: e.detail.value.groom,
        groomphone: e.detail.value.groomphone,
        weddate: page.data.date
      },
      success: function (res) {
        if (res.data.code == 200) {
          app.openid = res.data.data.openid
          app.user = res.data.data.user
          page.setData({
            wid: res.data.data.user
          })
          wx.redirectTo({
            url: '../../pages/index/index?redIndex=9'
          });
        }
        else if (res.data.code == 201) {
          app.openid = res.data.data.openid
        } else {

        }
        console.log(res)
      },
      fail: function () {
        wx.hideLoading()
      }

    })
  },
});
