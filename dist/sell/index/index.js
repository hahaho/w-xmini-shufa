'use strict';

// 获取全局应用程序实例对象
var app = getApp();
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
    op: [{
      t: '评价管理',
      i: 'https://c.jiangwenqiang.com/lqsy/sell_op_0.png',
      c: '#ff0000',
      url: '/user/money/index'
    }, {
      t: '流谦公约',
      i: 'https://c.jiangwenqiang.com/lqsy/sell_op_1.png',
      c: '#f39800',
      url: '/user/collect/index?type=zan'
    }],
    uiOp: [{
      t: '我的提醒',
      n: 13,
      url: '/sell/notice/index'
    }, {
      t: '发布的商品',
      n: 13,
      url: '/sell/goods/index?type=sell'
    }, {
      t: '仓库中的商品',
      n: 13,
      url: '/sell/goods/index?type=warehouse'
    }],
    tabArr: [{
      t: '待付款 ',
      n: 1,
      i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
      url: '/shop/order/index'
    }, {
      t: '待发货 ',
      i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
      n: 1,
      url: '/shop/order/index'
    }, {
      t: '待收货 ',
      i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
      n: 1,
      url: '/shop/order/index'
    }, {
      t: '已完成 ',
      i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
      n: 1,
      url: '/user/message/index?type=user'
    }, {
      t: '退货中 ',
      i: 'https://c.jiangwenqiang.com/lqsy/sell_tab_0.png',
      url: '/shop/order/index'
    }]
  },
  upFormId: function upFormId(e) {
    app.upFormId(e);
  },
  _toggleSign: function _toggleSign() {
    this.setData({
      sign: !this.data.sign
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // console.log(' ---------- onReady ----------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // clearInterval(timer)
    // console.log(' ---------- onHide ----------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // clearInterval(timer)
    // console.log(' ---------- onUnload ----------')
  },
  onShareAppMessage: function onShareAppMessage() {
    // return {
    //   title: app.gs('shareText').t || '绣学问，真纹绣',
    //   path: `/pages/index/index`,
    //   imageUrl: app.gs('shareText').g
    // }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getCourse()
  }
});