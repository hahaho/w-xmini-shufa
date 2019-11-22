'use strict';

// 获取全局应用程序实例对象
var app = getApp();
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
    tabIndex: 0,
    tabId: 0,
    tabArr: ['关注', '推荐', '热议', '视频', '关注', '推荐', '热议', '视频'],
    secondIndex: 0,
    onePage: 0,
    oneMore: true,
    oneList: [],
    // twoPage: 0,
    // twoMore: true,
    twoList: [],
    threePage: 0,
    threeMore: true,
    threeList: []
  },
  chooseIndex: function chooseIndex(e) {
    var _this = this;

    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      tabId: e.currentTarget.dataset.index
    }, function () {
      _this.data.twoList = [];
      _this.getTabTwo();
    });
  },
  _secondChoose: function _secondChoose(e) {
    var _this2 = this;

    this.setData({
      secondIndex: e.currentTarget.dataset.index
    }, function () {
      _this2.data.threePage = 0;
      _this2.data.threeList = [];
      _this2.getTabThree();
    });
  },
  getTabOneScroll: function getTabOneScroll() {
    if (!this.data.oneMore) {
      return app.toast({ content: '没有更多内容了' });
    }
    this.getTabOne();
  },
  getTabOne: function getTabOne() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().wordsCategory,
      data: {
        page: ++that.data.onePage
      }
    }).then(function (res) {
      if (res.lists) {
        that.setData({
          oneList: that.data.oneList.concat(res.lists)
        }, function () {
          if (that.data.onePage === 1) {
            that.getTabTwo();
          }
        });
        that.data.oneMore = res.lists.length >= res.pre_page;
      }
    });
  },
  getTabTwo: function getTabTwo() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().wordsAll,
      data: {
        cid: that.data.oneList[that.data.tabIndex].id,
        page: 1
      }
    }).then(function (res) {
      if (res.lists) {
        that.setData({
          twoList: res.lists.slice(0, 9)
        }, function () {
          that._secondChoose({ currentTarget: { dataset: { index: 0 } } });
        });
        // that.data.twoMore = res.lists.length >= res.pre_page
      }
    });
  },
  getTabThree: function getTabThree() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().wordsPiece,
      data: {
        cid: that.data.twoList[that.data.secondIndex].cid,
        wid: that.data.twoList[that.data.secondIndex].id,
        page: ++that.data.threePage
      }
    }).then(function (res) {
      that.setData({
        threeList: that.data.threeList.concat(res.lists)
      });
      that.data.threeMore = res.lists.length >= res.pre_page;
    });
  },
  onReachBottom: function onReachBottom() {
    if (!this.data.threeMore) {
      return app.toast({ content: '没有更多内容了' });
    }
    this.getTabThree();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.getTabOne();
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
    // app.toast()
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