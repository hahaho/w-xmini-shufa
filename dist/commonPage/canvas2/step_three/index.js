'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 获取全局应用程序实例对象
var app = getApp();
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    height: app.data.height,
    imgArr: ['https://c.jiangwenqiang.com/lqsy/canvas_bottom_0.jpg'],
    chooseArr: [{
      t: '作品宽',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100', '100-100', '100-100', '100-100', '100-100', '100-100', '100-100']
    }, {
      t: '作品高',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100']
    }, {
      t: '摆放场景',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100']
    }, {
      t: '作品高',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100']
    }, {
      t: '摆放场景',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100']
    }, {
      t: '作品高',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100']
    }, {
      t: '摆放场景',
      tIndex: -1,
      items: ['100-100', '100-100', '100-100']
    }]
  },
  chooseImage: function chooseImage(e) {
    app.data['userBackImage'] = this.data.imgArr[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '/commonPage/canvas2/index'
    });
  },
  itemChoose: function itemChoose(e) {
    this.setData(_defineProperty({}, 'chooseArr[' + e.currentTarget.dataset.oindex + '].tIndex', e.currentTarget.dataset.iindex * 1 === this.data.chooseArr[e.currentTarget.dataset.oindex].tIndex.tIdnex * 1 ? -1 : e.currentTarget.dataset.iindex));
  },
  _toggleSpec: function _toggleSpec() {
    this.setData({
      showSpec: !this.data.showSpec
    });
  },
  typeChoose: function typeChoose() {
    wx.chooseImage({
      count: 1,
      success: function success(res) {
        app.data['chooseImage'] = res.tempFilePaths[0];
        wx.navigateTo({
          url: '/commonPage/canvas2/step_two/index'
        });
      }
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getCourse()
  }
});