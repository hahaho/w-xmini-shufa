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
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    capsules: app.data.capsule,
    codeText: '获取验证码'
  },
  upFormId: function upFormId(e) {
    app.upFormId(e);
  },
  _getCode: function _getCode(phone) {
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
    app.wxrequest({
      url: app.getUrl().userCode,
      data: {
        phone: phone
      }
    }).then(function () {
      app.toast({ content: '验证码已发送,请注意查收' });
    });
  },
  _phoneLogin: function _phoneLogin() {
    this.setData({
      phoneLogin: !this.data.phoneLogin
    });
  },
  _login: function _login(phone, code) {
    // let that = this
    app.wxrequest({
      url: app.getUrl().userToken,
      data: {
        phone: phone,
        code: code
      }
    }).then(function (res) {
      res.phone = phone;
      if (app.gs('userInfoAll')) {
        app.su('userInfoAll', Object.assign(app.gs('userInfoAll'), res));
      } else {
        app.su('userInfoAll', res);
      }
      app.su('access_token', res.access_token);
      app.toast({
        content: '登录成功'
      });
      wx.redirectTo({
        url: '/pages/index/index'
      });
    });
  },
  phoneLogin: function phoneLogin(e) {
    if (e.detail.value.phone.length !== 11) return app.toast({ content: '请输入正确的手机号码' });
    if (e.detail.target.id === 'code') {
      this._getCode(e.detail.value.phone);
    } else {
      if (!e.detail.value.code) return app.toast({ content: '请输入验证码' });
      this._login(e.detail.value.phone, e.detail.value.code);
    }
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