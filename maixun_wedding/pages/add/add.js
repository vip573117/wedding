// pages/add/add.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wid:'',
    startDate:'',
    endDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.wid)
    var page = this
    page.setData({
      wid: options.wid
    })
   },

  formSubmit:function(e){
    console.log(e)
    var page =this 
    var wid = e.detail.value.wid
    var title = e.detail.value.title
    var content = e.detail.value.remarks
    var startDate = page.data.startDate
    var endDate = page.data.endDate
    if (title==''){
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (startDate == '') {
      wx.showToast({
        title: '开始时间不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    if (endDate == '') {
      wx.showToast({
        title: '结束时间',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    app.util.request({
      url: 'entry/wxapp/addcase',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        openid: app.openid,
        wid: wid,
        title: title,
        content: content,
        startDate: startDate,
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
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
        
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  test: function () {
    console.log('点击成功');
  },

  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      startDate: e.detail.value
    });
  },

  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      endDate: e.detail.value
    });
  },
  // toIndex: function () {
  //   wx.redirectTo({
  //     url: '/pages/index/index?redIndex=9'
  //   });
  // }
});
