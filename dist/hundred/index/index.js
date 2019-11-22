'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
      transparent: true,
      bgc: ''
    },
    more: true,
    capsules: app.data.capsule,
    tabIndex: 0,
    tabId: 0,
    tabArr: ['关注', '推荐', '热议', '视频'],
    page: 0
  },
  getHundredList: function getHundredList() {
    var that = this;
    app.wxrequest({
      url: app.getUrl()[this.data.options.from === 'main' ? 'communityList' : 'hundredList'],
      data: this.data.options.from === 'main' ? {
        uid: app.gs('userInfoAll').uid,
        page: ++that.data.page,
        // state: this.data.tabIndex * 1 + 1
        state: -1
      } : {
        uid: app.gs('userInfoAll').uid,
        page: ++that.data.page
      }
    }).then(function (res) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = res.lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          v.create_at = app.momentFormat(v.create_at * 1000, 'YYYY-MM-DD HH:mm');
          v.hits = v.hits > 10000 ? Math.floor(v.hits / 10000) + '万' : v.hits;
          try {
            v.imgs_url = JSON.parse(v.imgs_url ? v.imgs_url : '{"imgs":[]}');
          } catch (e) {
            v.imgs_url = { imgs: [] };
          }
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
        list: that.data.list ? that.data.list.concat(res.lists) : [].concat(res.lists)
      });
      that.data.more = res.lists.length >= res.pre_page;
    });
  },
  _follow: function _follow(e) {
    var that = this;
    app.wxrequest({
      url: app.getUrl()[this.data.options.from === 'main' ? 'communityFollow' : 'hundredFollow'],
      data: {
        fid: that.data.list[e.currentTarget.dataset.index].uid,
        uid: app.gs('userInfoAll').uid,
        state: that.data.list[e.currentTarget.dataset.index].is_follow > 0 ? 2 : 1
      }
    }).then(function () {
      var uid = that.data.list[e.currentTarget.dataset.index].uid * 1;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = that.data.list.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              i = _step2$value[0],
              v = _step2$value[1];

          if (v.uid * 1 === uid) {
            that.setData(_defineProperty({}, 'list[' + i + '].is_follow', that.data.list[i].is_follow > 0 ? -1 : 1));
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  },
  chooseIndex: function chooseIndex(e) {
    var _this = this;

    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      tabId: e.currentTarget.dataset.index
    }, function () {
      _this.data.page = 0;
      _this.data.list = [];
      _this.getHundredList();
    });
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
  changePostsStar: function changePostsStar(e) {
    var that = this;
    app.wxrequest({
      url: app.getUrl()[this.data.options.from === 'main' ? 'communityPostStar' : 'hundredPostsStar'],
      data: {
        uid: app.gs('userInfoAll').uid,
        pid: that.data.list[e.currentTarget.dataset.index].id,
        state: that.data.list[e.currentTarget.dataset.index].is_star > 0 ? 2 : 1
      }
    }).then(function (res) {
      var _that$setData2;

      that.setData((_that$setData2 = {}, _defineProperty(_that$setData2, 'list[' + e.currentTarget.dataset.index + '].is_star', that.data.list[e.currentTarget.dataset.index].is_star > 0 ? -1 : 1), _defineProperty(_that$setData2, 'list[' + e.currentTarget.dataset.index + '].star', that.data.info.is_star > 0 ? --that.data.list[e.currentTarget.dataset.index].star : ++that.data.list[e.currentTarget.dataset.index].star), _that$setData2));
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.setData({
      options: options
    }, this.getHundredList);
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
    this.data.page = 0;
    this.data.more = true;
    this.data.list = null;
    this.getHundredList();
  },
  onReachBottom: function onReachBottom() {
    if (!this.data.more) {
      return app.toast({ content: '没有更多内容了' });
    }
    this.getHundredList();
  }
});