'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 获取全局应用程序实例对象
var app = getApp();
var UpLoad = require('../upLoad');
var x = null;
var y = null;
// let xx = null
// let yy = null
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
    },
    bottomImg: [{
      i: '',
      t: '无'
    }, {
      i: 'https://c.jiangwenqiang.com/lqsy/camera_mi.png',
      t: '米字格'
    }, {
      i: 'https://c.jiangwenqiang.com/lqsy/camera_hui.png',
      t: '回字格'
    }, {
      i: 'https://c.jiangwenqiang.com/lqsy/camera_jiu.png',
      t: '九宫格'
    }],
    bottomIndex: 0,
    rotate: 0,
    scale: 1.5,
    moveX: 166,
    moveY: 166,
    height: app.data.height,
    main: 'https://c.jiangwenqiang.com/lqsy/list1.png',
    cameraType: [{
      i: 'jwqshequ',
      t: '社区'
    }, {
      i: 'jwqweixin',
      t: '微信好友'
    }, {
      i: 'jwqpengyouquan',
      t: '朋友圈'
    }]
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
  changeSlider: function changeSlider(e) {
    this.setData({
      scale: e.detail.value / 100
    });
  },
  chooseType: function chooseType(e) {
    this.setData({
      bottomIndex: e.currentTarget.dataset.index
    });
  },
  _chooseLv: function _chooseLv(e) {
    this.setData({
      commentLV: e.currentTarget.dataset.index
    });
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
  choosePhoto: function choosePhoto() {
    if (this.data.options.type > 1) {
      var that = this;
      if (!app.gs('firstCamera')) app.toast({ content: '建议您选取图片后通过【预览】--【编辑】将图片裁剪为【正方形】以体验更佳的对比效果', image: '', time: 5000, mask: true });
      setTimeout(function () {
        app.su('firstCamera', true);
        wx.chooseImage({
          count: 1,
          sourceType: [that.data.options.type < 3 ? 'album' : 'camera'],
          success: function success(res) {
            that.setData({
              main: res.tempFilePaths[0]
            });
          },
          fail: function fail() {
            app.toast({ content: '您取消了操作~~' });
            setTimeout(function () {
              wx.navigateBack();
            }, 1000);
          }
        });
      }, app.gs('firstCamera') ? 100 : 5000);
    }
  },
  _toggleMask: function _toggleMask(e) {
    var _this = this,
        _setData2;

    var type = e.currentTarget.dataset.type;
    var animate = type + 'Animate';
    if (this.data[type]) {
      this.setData(_defineProperty({}, animate, !this.data[animate]));
      setTimeout(function () {
        _this.setData(_defineProperty({}, type, !_this.data[type]));
      }, 900);
      return;
    }
    this.setData((_setData2 = {}, _defineProperty(_setData2, animate, !this.data[animate]), _defineProperty(_setData2, type, !this.data[type]), _setData2));
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.setData({
      options: options
    }, this.choosePhoto);
    if (options.type > 1) {
      canvas = wx.createCanvasContext('cOne');
    }
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
  onShareAppMessage: function onShareAppMessage(e) {
    if (e.from === 'button') {
      console.log(1);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getCourse()
  }
});