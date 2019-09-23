'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var timer = null;
var second = 60;
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fix: app.data.fix,
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    capsules: app.data.capsule,
    codeText: '获取验证码'
  },
  _getCode: function _getCode() {
    if (timer) {
      return app.toast({ content: second + '\u79D2\u540E\u53EF\u518D\u6B21\u83B7\u53D6\u9A8C\u8BC1\u7801' });
    }
    var that = this;
    that.setData({
      codeText: second + '\u79D2'
    });
    timer = setInterval(function () {
      second--;
      if (second <= 0) {
        that.setData({
          codeText: '获取验证码'
        });
        clearInterval(timer);
        timer = null;
        second = 60;
      } else {
        that.setData({
          codeText: second + '\u79D2'
        });
      }
    }, 1000);
  },
  _phoneLogin: function _phoneLogin() {
    var _this = this;

    this.setData({
      phoneLogin: !this.data.phoneLogin
    }, function () {
      !timer && _this._getCode();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // console.log(' ---------- onReady ----------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // this.setKill()
    // console.log(' ---------- onShow ----------')
  },

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