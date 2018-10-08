// maixun_wedding/pages/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: ['我是新娘', '我是新郎'],
    index: 2,
    myiswho: ''
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  test:function(e){
    console.log("点击成功")
  }
})