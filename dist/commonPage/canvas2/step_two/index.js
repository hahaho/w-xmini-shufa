'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 获取全局应用程序实例对象
// 创建页面实例对象
var app = getApp();
var maxSize = app.data.system.windowWidth - 40; // left & right give gap 20
var chooseArea = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    }
  },

  chooseAreaStart: function chooseAreaStart(e) {
    this.setData({
      cutAreaMove: true
    });
    chooseArea.x = e.touches[0].pageX;
    chooseArea.y = e.touches[0].pageY;
    chooseArea.xx = this.data.img.cutX;
    chooseArea.yy = this.data.img.cutY;
    chooseArea.w = this.data.img.cutW;
    chooseArea.h = this.data.img.cutH;
  },
  chooseAreaMove: function chooseAreaMove(e) {
    if (e.currentTarget.dataset.type === 'img') {
      var _setData;

      this.setData((_setData = {}, _defineProperty(_setData, 'img.cutX', chooseArea.xx + (e.touches[0].pageX - chooseArea.x)), _defineProperty(_setData, 'img.cutY', chooseArea.yy + (e.touches[0].pageY - chooseArea.y)), _setData));
    } else if (e.currentTarget.dataset.type === 'point') {
      var _setData2;

      var width = chooseArea.w + (e.touches[0].pageX - chooseArea.x) < 30 ? 30 : chooseArea.w + (e.touches[0].pageX - chooseArea.x);
      var height = chooseArea.h + (e.touches[0].pageY - chooseArea.y) < 30 ? 30 : chooseArea.h + (e.touches[0].pageY - chooseArea.y);
      this.setData((_setData2 = {}, _defineProperty(_setData2, 'img.cutW', width), _defineProperty(_setData2, 'img.cutH', height), _setData2));
    }
  },
  chooseAreaEnd: function chooseAreaEnd() {
    this.setData({
      cutAreaMove: false
    });
  },
  getImageInfo: function getImageInfo(src) {
    var that = this;
    wx.getImageInfo({
      src: src,
      success: function success(res) {
        wx.hideLoading();
        var width = res.width,
            height = res.height;

        var useWidth = width >= height;
        var img = {
          path: res.path,
          y: 20,
          width: useWidth ? maxSize : maxSize * res.width / res.height,
          height: !useWidth ? maxSize : maxSize * res.height / res.width
        };
        img.x = img.width < maxSize ? 20 + (maxSize - img.width) / 2 : 20;
        img.y = img.height < maxSize ? 20 + (maxSize - img.height) / 2 : 20;
        img.cutX = img.x - 2;
        img.cutY = img.y - 2;
        img.cutW = img.width + 4;
        img.cutH = img.height + 4;
        img.cutOW = img.width + 4;
        img.cutOH = img.height + 4;
        that.setData({
          img: img
        });
      }
    });
  },
  go: function go(e) {
    if (e.currentTarget.dataset.type === 'back') wx.navigateBack();else {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    wx.showLoading({
      title: '加载图片中',
      mask: true
    });
    this.getImageInfo(app.data.chooseImage);
  },

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