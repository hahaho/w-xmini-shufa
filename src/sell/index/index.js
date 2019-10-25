// 获取全局应用程序实例对象
const app = getApp()
// const bmap = require('../../utils/bmap-wx')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      transparent: true,
      bgc: ''
    },
    capsules: app.data.capsule,
    op: [
      {
        t: '评价管理',
        i: 'https://c.jiangwenqiang.com/lqsy/sell_op_0.png',
        c: '#ff0000',
        url: '/user/money/index'
      },
      {
        t: '流谦公约',
        i: 'https://c.jiangwenqiang.com/lqsy/sell_op_1.png',
        c: '#f39800',
        url: '/user/collect/index?type=zan'
      }
    ],
    uiOp: [
      {
        t: '我的提醒',
        n: 13,
        url: '/user/collect/index?type=send'
      },
      {
        t: '发布的商品',
        n: 13,
        url: '/user/comment/index?type=comment'
      },
      {
        t: '仓库中的商品',
        n: 13,
        url: '/user/comment/index?type=fans'
      }
    ],
    tabArr: [
      {
        t: '待付款 ',
        n: 1,
        i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
        url: '/user/team/index'
      },
      {
        t: '待发货 ',
        i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
        n: 1,
        url: '/share/carShare/carShare?type=user'
      },
      {
        t: '待收货 ',
        i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
        n: 1,
        url: ''
      },
      {
        t: '已完成 ',
        i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
        n: 1,
        url: '/user/message/index?type=user'
      },
      {
        t: '退货中 ',
        i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
        url: '/user/message/index?type=user'
      }
    ]
  },
  upFormId (e) {
    app.upFormId(e)
  },
  _toggleSign () {
    this.setData({
      sign: !this.data.sign
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // clearInterval(timer)
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // clearInterval(timer)
    // console.log(' ---------- onUnload ----------')
  },
  onShareAppMessage () {
    // return {
    //   title: app.gs('shareText').t || '绣学问，真纹绣',
    //   path: `/pages/index/index`,
    //   imageUrl: app.gs('shareText').g
    // }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // this.getCourse()
  }
})
