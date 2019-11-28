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
      data: e ? {
        word: e.detail.value.trim(),
        page: ++this.data.page
      } : {
        page: ++this.data.page
      }
    }).then(function (res) {
      if (e && e.detail.value) {
        var newArr = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = v.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var s = _step2.value;

                newArr.push(s);
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

        res.lists = newArr;
      }
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = res.lists[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _v = _step3.value;

          _v.hits = _v.hits > 10000 ? Math.floor(_v.hits / 10000) + '万' : _v.hits;
          _v.create_at = _v.create_at ? app.momentFormat(_v.create_at * 1000, 'YYYY-MM-DD') : '时间不详';
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
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
    return {
      path: '/dayword/index/index'
    };
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.data.page = 0;
    this.data.list = [];
    this.getList();
    // this.getCourse()
  }
});