// pages/expend/expend.js
var expendData = require('../../data/expend-data.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    display:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      iconList: expendData.iconList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  test: function() {
    console.log('点击成功');
  },

  toIndex: function() {
    wx.redirectTo({
      url: '/pages/index/index?redIndex=9'
    });
  },

  selectItem:function (e) {
    console.log(e.currentTarget);
    var cur = e.currentTarget.dataset
    this.setData({
      curTxt:cur.title,
      curPic:cur.icon,
      curNum:cur.num,
      display:'block'
    })
  }
});
