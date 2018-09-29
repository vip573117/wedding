// pages/date/date.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    wid:'',
    gender:['我是新娘','我是新郎'],
    index:0,
    wid:'',
    wedding_info:{},
    myiswho:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.wid)
    var page= this
    page.setData({
      wid:options.wid
    })
    if (options.wid){
      app.util.request({
        url: 'entry/wxapp/selectwedding',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
          //'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          wid: options.wid
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 200) {
            page.setData({
              wedding_info: res.data.data,
              myiswho: app.user.role
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
    }
   
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
    var wid= page.data.wid 
    var is_manager = app.user.is_manager
    if (is_manager == 1) {
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
          role_type: page.data.index,
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
    } else {
      app.util.request({
        url: 'entry/wxapp/selectmanager',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
          //'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          wid: wid
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '请使用' + res.data.data + '的微信进行设置',
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
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
});
