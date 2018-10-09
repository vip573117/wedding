// maixun_wedding/pages/invite/invite.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: ['新娘', '新郎', '新娘母亲', '新娘父亲', '新郎母亲', '新郎父亲','其他'],
    index: 2,
    myiswho: '',
    wid:''
  },

  //提交表单
  userupload:function(e){
      console.log(e)
    var page = this 
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var role = e.detail.value.role
    var wid = page.data.wid

    if(name==''){
      wx.showToast({
        title: '姓名为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false
    }
    if (phone == '') {
      wx.showToast({
        title: '电话为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false
    }
    app.util.request({
      url: 'entry/wxapp/useradd',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        wid: wid,
        name: name,
        phone: phone,
        role:role,
        openid: app.openid
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index'
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
  onLoad:function(option){
    console.log(option)
    var  page = this 
    wx.login({
      success: function (res) {
        if (res.code) {
          app.util.request({
            url: 'entry/wxapp/code',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
              //'content-type': 'application/json'
            },
            method: 'POST',
            data: {
              code: res.code,
            },
            success: function (res) {
              if (res.data.code == 200) {
                app.openid = res.data.data.openid
                app.util.request({
                  url: 'entry/wxapp/selectwedding',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                    //'content-type': 'application/json'
                  },
                  method: 'POST',
                  data: {
                    wid: option.wid,
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.code == 200) {
                      page.setData({
                        wedding: res.data.data,
                        wid: option.wid
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
              }
              else if (res.data.code == 201) {
                app.openid = res.data.data.openid
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
              console.log(res)
            },
            fail: function () {
              wx.hideLoading()
            }
          })
        }
      }
    })
 
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})