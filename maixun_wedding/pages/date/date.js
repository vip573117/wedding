// pages/date/date.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    wid: '',
    gender: ['我是新郎', '我是新娘'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.wid)
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value
    });
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    console.log(app.openid)
    var page = this
    if (page.data.date == '') {
      wx.showToast({
        title: '请选择婚礼日期',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (!e.detail.value.bride || e.detail.value.bride == '') {
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
      url: 'entry/wxapp/addwedding',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        wid: e.detail.value.wid,
        openid: app.openid,
        bride: e.detail.value.bride,
        bridephone: e.detail.value.bridephone,
        groom: e.detail.value.groom,
        groomphone: e.detail.value.groomphone,
        weddate: page.data.date,
        role_type: 1
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../pages/index/index?redIndex=9'
            });
          }, 2000)
        }
        else if (res.data.code >= 201 && res.data.code <= 205) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          wx.showToast({
            title: '网络请求错误',
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
});
