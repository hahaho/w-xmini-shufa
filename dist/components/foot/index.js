'use strict';

var app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  properties: {},
  observers: {},
  data: {
    fix: app.data.fix
    // bgc: '#f00'
  },
  ready: function ready() {
    var that = this;
    if (!app.gs('footArr')) {
      app.wxrequest({
        url: 'https://teach.idwenshi.com/teaching/public/index.php/home/page',
        data: {
          style: 1
        }
      }).then(function (res) {
        var current = getCurrentPages()[getCurrentPages().length - 1];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            v['active'] = false;
            if (v.url.indexOf(current) >= 0) {
              v['active'] = true;
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

        app.su('footArr', res);
        that.setData({
          footArr: res
        });
      });
    } else {
      this.setData({
        footArr: app.gs('footArr')
      });
    }
  },

  methods: {
    footOp: function footOp(e) {
      if (this.data.footArr[e.currentTarget.dataset.index]['active']) return;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.data.footArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var v = _step2.value;

          v['active'] = false;
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

      this.data.footArr[e.currentTarget.dataset.index]['active'] = true;
      this.setData({
        footArr: this.data.footArr
      });
      app.su('footArr', this.data.footArr);
      wx.reLaunch({
        // url: this.data.footArr[e.currentTarget.dataset.index].url
        url: '/shop/index/index'
      });
    }
  }
});