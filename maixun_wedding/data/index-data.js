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

//结婚事项数据 id  time  txt check finish
var list = [{
    id: 0,
    txtStyle: '',
    time: '15',
    txt: '计划婚庆用车',
    check: false,
    finish: true,
    inputList: [{
        place: '婚车公司住哪哦'
      },
      {
        place: '婚车公司的大名'
      },
      {
        place: '联系婚车的电话啊'
      },
    ]
  },
  {
    id: 1,
    txtStyle: '',
    time: '22',
    txt: '买菜',
    check: true,
    finish: false,
    inputList: [{
        place: '菜市场地址在哪？'
      },
      {
        place: '买菜买了多少钱啊？'
      }
    ]
  }
];

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
  list: list,
  expendList: expendList,
  invitList: invitList
};