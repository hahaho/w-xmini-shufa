'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 获取全局应用程序实例对象
var app = getApp();
// const UpLoad = require('../upLoad')
var baseScale = 1; // 底图缩放率
var currentIndex = 0; // 当前的图片
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
        width: 500,
        height: 500
      }]
    },
    upImgArr: [{
      src: 'https://c.jiangwenqiang.com/lqsy/nav_0.png'
    }],
    tabBorderArr: {
      i: -1,
      item: ['https://c.jiangwenqiang.com/lqsy/canvas_border_0.jpg', 'https://c.jiangwenqiang.com/lqsy/canvas_border_1.jpg', 'https://c.jiangwenqiang.com/lqsy/canvas_border_2.jpg', 'https://c.jiangwenqiang.com/lqsy/canvas_border_3.jpg', 'https://c.jiangwenqiang.com/lqsy/canvas_border_4.jpg', 'https://c.jiangwenqiang.com/lqsy/canvas_border_5.jpg']
    },
    bgColorArr: {
      i: -1,
      item: ['#ffffff', '#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff']
    },
    borderColorArr: {
      i: 0,
      item: ['#ffffff', '#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff']
    },
    operationArr: {
      chooseIndex: 0,
      tab: [{
        t: '画框',
        img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
        imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
        sliderText: '缩放',
        currentSlider: 0,
        minSlider: 0,
        maxSlider: 80
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
   * slider对应不同内容处理
   * @param e
   */
  sliderChanage: function sliderChanage(e) {
    if (this.data.operationArr.chooseIndex === 0) {
      var _setData;

      // 改变整体大小
      this.setData((_setData = {}, _defineProperty(_setData, 'operationArr.tab[0].currentSlider', e.detail.value), _defineProperty(_setData, 'upImgArr[0].scale', (100 - e.detail.value) / 100), _setData));
    } else if (this.data.operationArr.chooseIndex === 1) {
      var _setData2;

      // 改变图片大小
      var inScale = 1 - e.detail.value / 40;
      this.setData((_setData2 = {}, _defineProperty(_setData2, 'operationArr.tab[1].currentSlider', e.detail.value), _defineProperty(_setData2, 'upImgArr[' + currentIndex + '].width', this.data.upImgArr[currentIndex].startWidth * inScale), _defineProperty(_setData2, 'upImgArr[' + currentIndex + '].height', this.data.upImgArr[currentIndex].startHeight * inScale), _defineProperty(_setData2, 'upImgArr[' + currentIndex + '].xx', (1 - inScale) * this.data.upImgArr[currentIndex].startWidth / 2), _defineProperty(_setData2, 'upImgArr[' + currentIndex + '].yy', (1 - inScale) * this.data.upImgArr[currentIndex].startHeight / 2), _setData2));
      if (this.data.operationArr.tab[2].currentSlider > 0) {
        var _setData3;

        var value = this.data.operationArr.tab[2].currentSlider * 2;
        this.setData((_setData3 = {}, _defineProperty(_setData3, 'upImgArr[' + currentIndex + '].border.x', this.data.upImgArr[currentIndex].xx - value / 2), _defineProperty(_setData3, 'upImgArr[' + currentIndex + '].border.y', this.data.upImgArr[currentIndex].yy - value / 2), _defineProperty(_setData3, 'upImgArr[' + currentIndex + '].border.width', this.data.upImgArr[currentIndex].width + value), _defineProperty(_setData3, 'upImgArr[' + currentIndex + '].border.height', this.data.upImgArr[currentIndex].height + value), _setData3));
      }
    } else if (this.data.operationArr.chooseIndex === 2) {
      var _setData4;

      // 改变局条颜色
      var _value = 2 * e.detail.value;
      this.setData((_setData4 = {}, _defineProperty(_setData4, 'operationArr.tab[2].currentSlider', e.detail.value), _defineProperty(_setData4, 'upImgArr[' + currentIndex + '].border.x', this.data.upImgArr[currentIndex].xx - _value / 2), _defineProperty(_setData4, 'upImgArr[' + currentIndex + '].border.y', this.data.upImgArr[currentIndex].yy - _value / 2), _defineProperty(_setData4, 'upImgArr[' + currentIndex + '].border.width', this.data.upImgArr[currentIndex].width + _value), _defineProperty(_setData4, 'upImgArr[' + currentIndex + '].border.height', this.data.upImgArr[currentIndex].height + _value), _setData4));
    }
  },

  /**
   * 修改不同分类的索引
   * @param e
   */
  chooseIndex: function chooseIndex(e) {
    var _this = this;

    if (e.currentTarget.dataset.type === 'type') {
      // 选择类型
      this.setData(_defineProperty({}, 'operationArr.chooseIndex', e.currentTarget.dataset.index));
    } else if (e.currentTarget.dataset.type === 'type0') {
      // 选择边框
      this.setData(_defineProperty({}, 'tabBorderArr.i', e.currentTarget.dataset.index), function () {
        _this.getBorderInfo(_this.data.tabBorderArr.item[e.currentTarget.dataset.index]);
      });
    } else if (e.currentTarget.dataset.type === 'type1') {
      var _setData7;

      // 选择卡纸
      this.setData((_setData7 = {}, _defineProperty(_setData7, 'bgColorArr.i', e.currentTarget.dataset.index), _defineProperty(_setData7, 'upImgArr[' + currentIndex + '].bgc', this.data.bgColorArr.item[e.currentTarget.dataset.index]), _setData7));
    } else if (e.currentTarget.dataset.type === 'type2') {
      var _setData8;

      // 选择局条
      this.setData((_setData8 = {}, _defineProperty(_setData8, 'borderColorArr.i', e.currentTarget.dataset.index), _defineProperty(_setData8, 'upImgArr[' + currentIndex + '].border.color', this.data.borderColorArr.item[e.currentTarget.dataset.index]), _setData8));
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
    var _this2 = this;

    this.getImageInfo(src).then(function (res) {
      res.fixWidth = app.data.system.windowWidth;
      baseScale = app.data.system.windowWidth / res.width;
      res.fixHeight = baseScale * res.height;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this2.data.backImageInfo.positionItem[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          v.x = baseScale * v.x;
          v.y = baseScale * v.y;
          // v.width = baseScale * v.width / 8
          // v.height = baseScale * v.height / 8
          v.width = baseScale * v.width;
          v.height = baseScale * v.height;
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

      _this2.setData({
        backImageInfo: Object.assign(_this2.data.backImageInfo, res)
      }, function () {
        _this2.data.upImgArr[0].src = app.data.userUseImg || 'https://c.jiangwenqiang.com/lqsy/nav_0.png';
        _this2.getItemImageInfo(0);
      });
    });
  },

  /**
   * 获取每个图片的信息和位置
   * @param index
   */
  getItemImageInfo: function getItemImageInfo(index) {
    var _this3 = this;

    this.getImageInfo(this.data.upImgArr[index].src).then(function (res) {
      if (res.width >= res.height) {
        var temp = _this3.data.backImageInfo.positionItem[index].width * res.height / res.width;
        res.width = _this3.data.backImageInfo.positionItem[index].width.toFixed(1);
        res.height = temp.toFixed(1);
      } else {
        var _temp = _this3.data.backImageInfo.positionItem[index].height * res.width / res.height;
        res.height = _this3.data.backImageInfo.positionItem[index].height.toFixed(1);
        res.width = _temp.toFixed(1);
      }
      // 记录图片的宽高
      res.startWidth = res.width;
      res.startHeight = res.height;
      res.useWidth = res.width < res.height;
      res.scale = 1;
      res.x = _this3.data.backImageInfo.positionItem[index].x - res.width / 2;
      res.y = _this3.data.backImageInfo.positionItem[index].y - res.height / 2;
      res.xx = 0;
      res.yy = 0;
      res.bgc = '#ffffff';
      res.border = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        color: '#ffffff'
      };
      _this3.setData(_defineProperty({}, 'upImgArr[' + index + ']', res));
    });
  },

  /**
   * 获取对应图片的边框信息
   * @param src
   * @param index
   */
  getBorderInfo: function getBorderInfo(src) {
    var _this4 = this;

    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!src) {
      return this.setData({
        borderImageInfo: null
      });
    }
    this.getImageInfo(src).then(function (res) {
      res.width = (res.width * baseScale).toFixed(1);
      var x = _this4.data.upImgArr[index].startWidth / (res.width / 2);
      var y = _this4.data.upImgArr[index].startHeight / (res.width / 2);
      res.x = x === Math.floor(x) ? Math.floor(x) - 1 : Math.floor(x);
      res.y = y === Math.floor(y) ? Math.floor(y) - 1 : Math.floor(y);
      _this4.setData({
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