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
      t: '我的收益',
      i: 'jwqjindutiaoshouyidaozhang',
      c: '#ff0000'
    }, {
      t: '我的赞',
      i: 'jwqshoucang',
      c: '#f39800',
      url: '/user/collect/index?type=zan'
    }, {
      t: '意见反馈',
      i: 'jwqyoujian',
      c: '#0068b7',
      url: '/commonPage/talk/index?type=suggest'
    }],
    uiOp: [{
      t: '帖子',
      n: 13,
      url: '/user/collect/index?type=send'
    }, {
      t: '评论',
      n: 13,
      url: '/user/comment/index?type=comment'
    }, {
      t: '粉丝',
      n: 13,
      url: '/user/comment/index?type=fans'
    }],
    tabArr: [{
      t: '我的师友',
      i: '',
      url: '/user/team/index'
    }, {
      t: '邀约好友',
      i: '',
      url: '/share/carShare/carShare?type=user'
    }, {
      t: '关于刘谦',
      i: '',
      url: ''
    }, {
      t: '我的消息',
      i: '',
      url: '/user/message/index'
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