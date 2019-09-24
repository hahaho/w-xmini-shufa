'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var UpLoad = require('../upLoad');
var x = null;
var y = null;
var moveYT = null;
var moveXT = null;
var canvas = null;
var start = null;
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    }
  },
  touchStart: function touchStart(e) {
    start = e.touches;
    if (e.touches.length <= 1) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
      moveYT = this.data.moveY;
      moveXT = this.data.moveX;
    } else if (e.touches.length <= 2) {
      start = e.touches;
    } else {
      app.toast({ content: '囧，小主人的手指太灵活了，无法识别呢，请双指或单指操作' });
    }
  },
  touchMove: function touchMove(e) {
    if (e.touches.length <= 1 && start.length <= 1) {
      this.setData({
        moveX: moveXT + (e.touches[0].pageX - x) * app.data.fixPxToRpx,
        moveY: moveYT + (e.touches[0].pageY - y) * app.data.fixPxToRpx
      });
    } else if (e.touches.length <= 2) {
      if (start.length < 1) start = e.touches;
      var now = e.touches;
      var scale = (this.getDistance(now[0], now[1]) / this.getDistance(start[0], start[1])).toFixed(1);
      var rotate = (this.getAngle(now[0], now[1]) - this.getAngle(start[0], start[1])).toFixed(1);
      this.setData({
        scale: scale > 2 ? 2 : scale < 1 ? 1 : scale,
        rotate: rotate
      });
    }
  },
  getDistance: function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX;
    var y = p2.pageY - p1.pageY;
    return Math.sqrt(x * x + y * y);
  },
  getAngle: function getAngle(p1, p2) {
    var x = p1.pageX - p2.pageX;
    var y = p1.pageY - p2.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
  },
  upload: function upload() {
    new UpLoad({ imgArr: 'imgArr' }).chooseImage();
  },
  checkAll: function checkAll() {
    if (new UpLoad({ imgArr: 'imgArr' }).checkAll()) {}
  },
  imgOp: function imgOp(e) {
    new UpLoad({ imgArr: e.currentTarget.dataset.img, index: e.currentTarget.dataset.index }).imgOp();
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getCourse()
  }
});