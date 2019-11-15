'use strict';

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
    replyIndex: -1,
    page: 0,
    capsules: app.data.capsule
  },
  _follow: function _follow() {
    var _this = this;

    var that = this;
    app.wxrequest({
      url: app.getUrl().hundredFollow,
      data: {
        fid: that.data.info.uid,
        uid: app.gs('userInfoAll').uid,
        state: that.data.info.is_follow * 1 + 1
      }
    }).then(function () {
      _this.setData({
        'info.is_follow': Math.abs(that.data.info.is_follow - 1)
      });
    });
  },
  _writeComment: function _writeComment(e) {
    this.setData({
      focus: e.currentTarget.dataset.type === 'in'
    });
    if (e.currentTarget.dataset.type === 'in') {
      this.data.replyIndex = e.currentTarget.dataset.index;
    }
  },
  _collection: function _collection() {
    this.setData({
      collection: !this.data.collection
    });
  },
  _shareType: function _shareType() {
    this.setData({
      showShare: !this.data.showShare
    });
  },
  _goPicShare: function _goPicShare() {
    this._shareType();
    wx.navigateTo({
      url: '/share/carShare/carShare?type=2'
    });
  },
  getDetail: function getDetail() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().hundredDetail,
      data: {
        pid: that.data.options.id,
        uid: app.gs('userInfoAll').uid
      }
    }).then(function (res) {
      res.create_at = app.momentFormat(res.create_at * 1000, 'YYYY-MM-DD HH:mm');
      res.hits = res.hits > 10000 ? Math.floor(res.hits / 10000) + '万' : res.hits;
      res.imgs_url = JSON.parse(res.imgs_url);
      that.setData({
        info: res
      });
    });
  },
  getHundredDiscuss: function getHundredDiscuss() {
    var that = this;
    app.wxrequest({
      url: app.getUrl().hundredDiscuss,
      data: {
        pid: that.data.options.id,
        state: 1,
        page: ++that.data.page
      }
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
      }
      that.data.replyIndex = -1;
    });
  },
  sendHundredDiscussSub: function sendHundredDiscussSub(e) {
    if (!e.detail.value.comment.trim()) return app.toast({ content: '评论内容不能为空' });
    var that = this;
    app.wxrequest({
      url: app.getUrl().hundredDiscussSub,
      data: {
        pid: that.data.info.id,
        uid: app.gs('userInfoAll').uid || 10000,
        bid: that.data.replyIndex >= 0 ? that.data.comment[that.data.replyIndex].bid : '',
        did: that.data.replyIndex >= 0 ? that.data.comment[that.data.replyIndex].did : '',
        comment: e.detail.value.comment,
        state: that.data.replyIndex >= 0 ? 2 : 1
      }
    }).then(function () {
      app.toast({ content: '评论成功' });
      that.setData({
        commentValue: ''
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var _this2 = this;

    this.setData({
      options: options
    }, function () {
      _this2.getDetail();
      _this2.getHundredDiscuss();
    });
    // let that = this
    // if (!app.gs() || !app.gs('userInfoAll')) return app.wxlogin()
    // this.getUser()
    // app.getNavTab({
    //   style: 3,
    //   cb (res) {
    //     that.setData({
    //       swiperArr: res.data.data
    //     })
    //     app.getNavTab({
    //       style: 2,
    //       cb (res) {
    //         that.setData({
    //           tabNav: res.data.data
    //         })
    //         that.getCourse()
    //       }
    //     })
    //   }
    // })
    // this.Bmap(this)
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