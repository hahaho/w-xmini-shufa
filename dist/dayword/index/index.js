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
    page: 0,
    list: [],
    more: true,
    capsules: app.data.capsule
  },
  _showColumn: function _showColumn() {
    this.setData({
      showColumn: !this.data.showColumn
    });
  },
  getList: function getList(e) {
    var url = app.getUrl().dayList;
    if (e && !e.detail.value.trim().length) {
      return app.toast({ content: '请输入搜索内容' });
    } else if (e && e.detail.value.trim().length) {
      this.data.page = 0;
      this.data.list = [];
      url = app.getUrl().stackingSearch;
    }
    var that = this;
    app.wxrequest({
      url: url,
      data: {
        page: ++this.data.page
      }
    }).then(function (res) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = res.lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          v.hits = v.hits > 10000 ? Math.floor(v.hits / 10000) + '万' : v.hits;
          v.create_at = v.create_at ? app.momentFormat(v.create_at * 1000, 'YYYY-MM-DD') : '时间不详';
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

      that.setData({
        list: that.data.list.concat(res.lists)
      });
      that.data.more = res.lists.length >= res.pre_page;
    }, function () {
      --that.data.page;
    });
  },
  getDesc: function getDesc() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().dayDesc
    }).then(function (res) {
      that.setData({
        des: res.des
      });
    });
  },
  onReachBottom: function onReachBottom() {
    if (!this.data.more) {
      return app.toast({ content: '没有更多内容了' });
    }
    this.getList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.getList();
    this.getDesc();
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
    app.checkUser({ login: false });
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
    this.data.page = 0;
    this.data.list = 0;
    this.getList();
    // this.getCourse()
  }
});