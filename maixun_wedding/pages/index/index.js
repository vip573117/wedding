//index.js
//获取应用实例
var app = getApp();
var indexData = require('../../data/index-data.js');

Page({
  data: {
    tabIndex: 9,
    addShow: 'none',
    popupShow: 'none',
    popupShow2: 'none',
    wid:'',
    list: [],
    wc_list: [],
    indexx:'',
    cb_num:0,
    kx_num:0,
    kx_list:[],
    show1:false,
    show2:true
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
      // list: indexData.list,
      //expendList: indexData.expendList,
      invitList: indexData.invitList
    });
    wx.login({
      success: function (res) {
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
            },
            success: function (res) {
              if (res.data.code == 200){
                app.openid = res.data.data.openid
                app.user = res.data.data.info
                page.setData({
                  wid: res.data.data.info.wid,
                  date: res.data.data.info.wd_date,
                  cb_num: res.data.data.info.cb_num,
                  kx_num: res.data.data.info.kx_num,
                  show1:true,
                  show2:false,
                  showdate: res.data.data.info.wd_time
                })
              }
              else if (res.data.code == 201){
                app.openid = res.data.data.openid
              }else{
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
/**
 * 生命函数
 * */ 
    onShow:function(){
      var page = this
      var typeid = page.data.tabIndex

      if (typeid!=9){
        page.tabShow(null, typeid),
        page.setData({
          kx_num: page.data.kx_num + app.kx_num
        })
      }
    },
  //切换变化函数
  tabShow: function(e,typeid) {
    if (!app.user.wid) {
      wx.showToast({
        title: '请先添加婚礼',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return false;
    }
    var page= this
    var typeID
    if(e){
      typeID = e.currentTarget.dataset.id 
      }else{
     typeID =  typeid
      }
  
    //变化后的样式数组
    var style = {
      titleShow: 'none',
      timePdTop: 15 + 'rpx',
      timePdBot: 25 + 'rpx',
      formBgShow: 'block',
      tabTop: 74 + '%',
      tabTop: 980 + 'rpx',
      tabPadTop: 20 + 'rpx',
      tabMarTop: 0 + 'rpx'
    };
    
    app.util.request({
      url: 'entry/wxapp/selecttask',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        openid: app.openid,
        wid:app.user.wid,
        type_id: typeID
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          if (typeID == 0){
            page.setData({
              list: res.data.data,
            });
          }
          if (typeID == 1) {
            page.setData({
              expendList: res.data.data,
            });
          }
          if (typeID == 3) {
            page.setData({
              wc_list: res.data.data,
            });
          }
      
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
    this.setData({
      style: style,
      tabIndex: typeID
    });
    this.iconShow();
    this.picShow();
  },

    //跳转邀请页面
  goinvite:function(e){
    wx.navigateTo({
      url: '../invite/invite?wid=' + app.user.wid
    });
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
      tabTop: 550 + 'rpx',
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
    if (tabIndex == 0) {
      that.setData({
        iconPic: 'add'
      });
    } else if (tabIndex == 1) {
      that.setData({
        iconPic: 'add1'
      });
    } else {
      that.setData({
        iconPic: ''
      });
    }
  },
  ctrlPopup: function (e) {
    var page = this
    console.log(e);
    var indexx = e.currentTarget.dataset.index
    var inputlist = e.currentTarget.dataset.inputlist
    var txt = e.currentTarget.dataset.txt
   if (this.data.popupShow === 'none') {
      this.setData({
        popupShow: 'block',
        curTxt: txt,
        curInputList: inputlist,
        indexx: indexx
      });
    } else {
      this.setData({
        popupShow: 'none'
      });
    }
  },
  //打开关闭弹窗
  ctrlPopuptj: function(e) {
    var page =this
    console.log(e);
    var com_id = e.detail.target.dataset.id;
    var remarks = e.detail.value.remarks;
    var indexx = e.detail.value.indexx;
    var itemid = page.data.list[indexx].id 
    app.util.request({
      url: 'entry/wxapp/completecase',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        openid: app.openid,
        wid: app.user.wid,
        com_id: com_id,
        remarks: remarks,
        caseid: itemid,
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '恭喜完成',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          page.setData({
            popupShow: 'none',
            value:'',
            cb_num: cb_num+1
          });
          page.tabShow(null, 0)
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
  ctrlPopuplook:function(e){
    var page = this
    console.log(e);
    var indexx = e.currentTarget.dataset.index
    var txt = e.currentTarget.dataset.txt
    if (this.data.popupShow2 === 'none') {
      this.setData({
        popupShow2: 'block',
        curTxt: txt,
        remarks: page.data.wc_list[indexx].remarks
      });
    } else {
      this.setData({
        popupShow2: 'none'
      });
    }
  },

  //跳转到修改时间页面
  toDate: function(e) {
    var page =this
    var wid =page.data.wid 
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
    if (tabIndex == 0) {
      wx.navigateTo({
        url: '../add/add?wid=' + app.user.wid
      });
    } else if (tabIndex == 1) {
      wx.navigateTo({
        url: '../expend/expend?wid=' + app.user.wid
      });
    }
  }

});
