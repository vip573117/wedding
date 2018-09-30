
//不需要数据库
var style = {
  //时间盒子样式
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

//需要数据库


//开销记录数据 id day week expen expdata pic title num finish
var expendList = [{
    id: 1,
    day: '9月1号',
    week: '星期五',
    expend: 60000,
    expdata: [{
        id: 11,
        pic: 'car1',
        title: '婚车1',
        num: '20000',
        finish: true
      },
      {
        id: 12,
        pic: 'car1',
        title: '婚车2',
        num: '20000',
        finish: true
      },
      {
        id: 13,
        pic: 'car1',
        title: '婚车3',
        num: '20000',
        finish: false
      }
    ]
  },
  {
    id: 2,
    day: '9月2号',
    week: '星期六',
    expend: 70000,
    expdata: [{
        id: 21,
        pic: 'car1',
        title: '婚车4',
        num: '30000',
        finish: false
      },
      {
        id: 22,
        pic: 'car1',
        title: '婚车5',
        num: '20000',
        finish: true
      },
      {
        id: 23,
        pic: 'car1',
        title: '婚车6',
        num: '20000',
        finish: false
      }
    ]
  }
];
//电子请柬
var invitList = [{
    id: 1,
    pic: 'invit1',
    finish: true
  },
  {
    id: 2,
    pic: 'invit2',
    finish: false
  }
];

module.exports = {
  style: style,
  expendList: expendList,
  invitList: invitList
};