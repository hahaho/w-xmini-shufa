'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 获取全局应用程序实例对象
var app = getApp();
// const UpLoad = require('../upLoad')
var baseScale = 1; // 底图缩放率
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backImageInfo: {
      src: 'https://c.jiangwenqiang.com/lqsy/canvas_bottom_0.jpg',
      positionItem: [{
        x: 375,
        y: 375,
        width: 350,
        height: 350
      }]
    },
    upImgArr: [{
      src: 'https://c.jiangwenqiang.com/lqsy/nav_0.png'
    }],
    tabBorderArr: ['关注', '推荐', '热议', '视频', '关注', '推荐', '热议', '视频'],
    operationArr: {
      chooseIndex: 0,
      tab: [{
        t: '画框',
        img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
        imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
        sliderText: '缩放',
        currentSlider: 0,
        minSlider: 0,
        maxSlider: 100
      }, {
        t: '卡纸',
        img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
        imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
        sliderText: '宽度',
        currentSlider: 0,
        minSlider: 0,
        maxSlider: 20
      }, {
        t: '局条',
        img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
        imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
        sliderText: '宽度',
        currentSlider: 0,
        minSlider: 0,
        maxSlider: 3
      }]
    }
  },
  /**
   * 获取图片信息
   * @param src // 传入图片路径
   * @returns {Promise}
   */
  getImageInfo: function getImageInfo(src) {
    wx.showLoading({
      title: '加载中...'
    });
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: src,
        success: function success(res) {
          wx.hideLoading();
          resolve(res);
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },

  /**
   * 获取底图的尺寸信息
   * @param src
   */
  getBackImageInfo: function getBackImageInfo(src) {
    var _this = this;

    this.getImageInfo(src).then(function (res) {
      res.fixWidth = app.data.system.windowWidth;
      baseScale = app.data.system.windowWidth / res.width;
      res.fixHeight = baseScale * res.height;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.data.backImageInfo.positionItem[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          v.x = baseScale * v.x;
          v.y = baseScale * v.y;
          // v.width = baseScale * v.width / 8
          // v.height = baseScale * v.height / 8
          v.width = baseScale * v.width / 2;
          v.height = baseScale * v.height / 2;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _this.setData({
        backImageInfo: Object.assign(_this.data.backImageInfo, res)
      }, function () {
        _this.data.upImgArr[0].src = app.data.userUseImg;
        _this.getItemImageInfo(0);
      });
    });
  },

  /**
   * 获取每个图片的信息和位置
   * @param index
   */
  getItemImageInfo: function getItemImageInfo(index) {
    var _this2 = this;

    this.getImageInfo(this.data.upImgArr[index].src).then(function (res) {
      if (res.width >= res.height) {
        var temp = _this2.data.backImageInfo.positionItem[index].width * res.height / res.width;
        res.width = _this2.data.backImageInfo.positionItem[index].width.toFixed(1);
        res.height = temp.toFixed(1);
      } else {
        var _temp = _this2.data.backImageInfo.positionItem[index].height * res.width / res.height;
        res.height = _this2.data.backImageInfo.positionItem[index].height.toFixed(1);
        res.width = _temp.toFixed(1);
      }
      // 记录图片的宽高
      res.startWidth = res.width;
      res.startHeight = res.height;
      res.useWidth = res.width < res.height;
      res.scale = 1;
      res.x = _this2.data.backImageInfo.positionItem[index].x - res.width / 2;
      res.y = _this2.data.backImageInfo.positionItem[index].y - res.height / 2;
      res.bgc = '#ffffff';
      res.border = {
        width: 0,
        color: '#ffffff'
      };
      _this2.setData(_defineProperty({}, 'upImgArr[' + index + ']', res), function () {
        _this2.getBorderInfo('https://c.jiangwenqiang.com/lqsy/canvas_border_1.jpg', 0);
      });
    });
  },

  /**
   * 获取对应图片的边框信息
   * @param src
   * @param index
   */
  getBorderInfo: function getBorderInfo(src) {
    var _this3 = this;

    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    this.getImageInfo(src).then(function (res) {
      res.width = (res.width * baseScale / 2).toFixed(1);
      var x = _this3.data.upImgArr[index].startWidth / (res.width / 2);
      var y = _this3.data.upImgArr[index].startHeight / (res.width / 2);
      res.x = x === Math.floor(x) ? Math.floor(x) - 1 : Math.floor(x);
      res.y = y === Math.floor(y) ? Math.floor(y) - 1 : Math.floor(y);
      _this3.setData({
        borderImageInfo: res
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.getBackImageInfo(this.data.backImageInfo.src);
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
    // console.log(' ---------- onUnload ----------')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getCourse()
  }
});