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
    fix: app.data.fix,
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    capsules: app.data.capsule,
    replyIndex: -1,
    page: 0,
    more: true
  },
  _writeComment: function _writeComment(e) {
    this.setData({
      focus: e.currentTarget.dataset.type === 'in',
      replyIndex: e.currentTarget.dataset.index
    });
  },
  _collection: function _collection() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().wordsCollect,
      data: {
        wid: that.data.info.id,
        uid: app.gs('userInfoAll').id || 10000,
        state: that.data.info.star + 1
      }
    });
    this.setData({
      'info.star': Math.abs(this.info.star - 1)
    });
  },
  getDiscuss: function getDiscuss() {
    var that = this;
    var url = null;
    var data = {};
    switch (this.data.options.type * 1) {
      case 1:
        data = {
          wid: that.data.options.wid,
          state: 2,
          did: that.data.options.did,
          page: ++that.data.page
        };
        url = app.getUrl().wordsDiscuss;
        break;
      case 2:
        data = {
          pid: that.data.options.wid,
          state: 2,
          did: that.data.options.did,
          page: ++that.data.page
        };
        url = app.getUrl().hundredDiscuss;
        break;
      default:
        return app.toast({ content: '服务器发生错误,请联系管理员' });
    }
    console.log(url);
    console.log(data);
    app.wxrequest({
      url: url,
      data: data
    }).then(function (res) {
      if (res.lists.length) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            v.create_at = app.momentFormat(v.create_at * 1000, 'YYYY-MM-DD HH:mm');
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
          comment: that.data.comment ? that.data.comment.concat(res.lists) : [].concat(res.lists)
        });
        that.data.more = res.lists.length >= res.pre_page;
      }
      that.data.replyIndex = -1;
    }, function () {
      --that.data.page;
    });
  },
  sendWordsDiscussSub: function sendWordsDiscussSub(e) {
    if (!e.detail.value.comment.trim()) return app.toast({ content: '评论内容不能为空' });
    var that = this;
    var data = {};
    var url = null;
    switch (this.options.type * 1) {
      case 1:
        url = app.getUrl().wordsDiscussSub;
        data = {
          wid: that.data.info.wid,
          uid: app.gs('userInfoAll').uid || 10000,
          bid: that.data.replyIndex >= 0 ? that.data.comment[that.data.replyIndex].uid : that.data.info.uid,
          did: that.data.replyIndex >= 0 ? that.data.comment[that.data.replyIndex].id : that.data.info.id,
          comment: e.detail.value.comment,
          state: 2
        };
        break;
      case 2:
        url = app.getUrl().hundredDiscussSub;
        data = {
          pid: that.data.info.pid,
          uid: app.gs('userInfoAll').uid || 10000,
          bid: that.data.replyIndex >= 0 ? that.data.comment[that.data.replyIndex].uid : that.data.info.uid,
          did: that.data.replyIndex >= 0 ? that.data.comment[that.data.replyIndex].id : that.data.info.id,
          comment: e.detail.value.comment,
          state: 2
        };
    }
    app.wxrequest({
      url: url,
      data: data
    }).then(function () {
      app.toast({ content: '评论成功' });
      that.setData({
        commentValue: ''
      });
      that.data.page = 0;
      that.data.comment = null;
      that.data.more = true;
      that.getDiscuss();
    });
  },
  changeStar: function changeStar(e) {
    var that = this;
    var url = '';
    var data = {};
    switch (this.options.type * 1) {
      case 1:
        url = app.getUrl().wordsDiscussStar;
        data = {
          did: e.currentTarget.dataset.index > -1 ? that.data.info.id : that.data.comment[e.currentTarget.dataset.index].id,
          uid: app.gs('userInfoAll').uid,
          wid: that.data.info.wid,
          state: e.currentTarget.dataset.index > -1 ? that.data.info.is_star > 0 ? 2 : 1 : that.data.comment[e.currentTarget.dataset.index].is_star > 0 ? 2 : 1
        };
        break;
      case 2:
        url = app.getUrl().hundredDiscussStar;
        data = {
          did: e.currentTarget.dataset.index < 0 ? that.data.info.id : that.data.comment[e.currentTarget.dataset.index].id,
          uid: app.gs('userInfoAll').uid,
          pid: that.data.info.pid,
          state: e.currentTarget.dataset.index < 0 ? that.data.info.is_star > 0 ? 2 : 1 : that.data.comment[e.currentTarget.dataset.index].is_star > 0 ? 2 : 1
        };
    }
    app.wxrequest({
      url: url,
      data: data
    }).then(function () {
      if (e.currentTarget.dataset.index < 0) {
        var _that$setData;

        that.setData((_that$setData = {}, _defineProperty(_that$setData, 'info.is_star', that.data.info.is_star > 0 ? -1 : 1), _defineProperty(_that$setData, 'info.star', that.data.info.is_star > 0 ? --that.data.info.star : ++that.data.info.star), _that$setData));
      } else {
        var _that$setData2;

        that.setData((_that$setData2 = {}, _defineProperty(_that$setData2, 'comment[' + e.currentTarget.dataset.index + '].is_star', that.data.comment[e.currentTarget.dataset.index].is_star > 0 ? -1 : 1), _defineProperty(_that$setData2, 'comment[' + e.currentTarget.dataset.index + '].star', that.data.comment[e.currentTarget.dataset.index].is_star > 0 ? --that.data.comment[e.currentTarget.dataset.index].star : ++that.data.comment[e.currentTarget.dataset.index].star), _that$setData2));
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    // type = 1 碑帖
    // type = 2 百家
    this.setData({
      options: options,
      info: app.gs('reply')
    }, this.getDiscuss);
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