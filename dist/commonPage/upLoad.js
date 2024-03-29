'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by kkk on 2019/3/11.
 */
var app = getApp();
var config = require('./config');
var COS = require('./cos-js-sdk-v5.min');
var cos = new COS({
  getAuthorization: function getAuthorization(params, callback) {
    var authorization = COS.getAuthorization({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Method: params.Method,
      Key: params.Key
    });
    callback(authorization);
  }
});

var upLoad = function () {
  function upLoad(param) {
    _classCallCheck(this, upLoad);

    this.count = param['count'] || 999;
    this.sourceType = param['sourceType'] || ['album', 'camera'];
    this._that = param['this'] || getCurrentPages()[getCurrentPages().length - 1];
    this.imgArr = param['imgArr'] || 'imgArr';
    this.fileIndex = param['index'] * 1 + 1 > 0 ? param['index'] : -1;
    this.tempFilpaths = [];
    this.itemList = param['itemList'] || ['查看图片', '替换图片', '删除图片'];
  }

  _createClass(upLoad, [{
    key: 'imgOp',
    value: function imgOp() {
      var that = this;
      wx.showActionSheet({
        itemList: that.itemList,
        success: function success(res) {
          if (res.tapIndex === 0) {
            app.showImg(that._that.data[that.imgArr][that.fileIndex].real, [that._that.data[that.imgArr][that.fileIndex].real]);
          } else if (res.tapIndex === 1) {
            that.chooseImage();
          } else if (res.tapIndex === 2) {
            that._that.data[that.imgArr].splice(that.fileIndex, 1);
            that._that.setData(_defineProperty({}, that.imgArr, that._that.data[that.imgArr]));
          }
        }
      });
    }
  }, {
    key: 'checkAll',
    value: function checkAll() {
      var status = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._that.data[this.imgArr][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          if (v.progress < 99) status = false;
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

      if (!status) app.toast({ toastType: 'ontop', content: '\u8BF7\u7B49\u5F85\u6240\u6709\u56FE\u7247\u4E0A\u4F20\u5B8C\u6210\u540E\u518D\u7EE7\u7EED\u64CD\u4F5C', bgc: 'rgba(255, 0, 0, 0.67)', color: '#fff' });
      return status;
    }
  }, {
    key: 'upImgSingle',
    value: function upImgSingle(url) {
      var that = this;
      wx.showLoading();
      that.tempFilpaths = [url];
      var temp = [{
        temp: url,
        real: '',
        key: '',
        progress: 0
      }];
      // console.log(that.imgArr)
      that._that.setData(_defineProperty({}, that.imgArr, that._that.data[that.imgArr] ? that._that.data[that.imgArr].concat(temp) : temp), function () {
        that.upLoad();
      });
    }
  }, {
    key: 'chooseImage',
    value: function chooseImage() {
      var that = this;
      if (!this.checkAll()) return;
      wx.showLoading();
      wx.chooseImage({
        count: that.fileIndex > -1 ? 1 : that.count - (that._that.data[that.imgArr].length || 0),
        sourceType: that.sourceType,
        success: function success(res) {
          wx.hideLoading();
          that.tempFilpaths = res.tempFilePaths;
          var temp = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = res.tempFilePaths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var v = _step2.value;

              temp.push({
                temp: v,
                real: '',
                key: '',
                progress: 0
              });
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

          if (that.fileIndex > -1) {
            that._that.setData(_defineProperty({}, that.imgArr + '[' + that.fileIndex + ']', {
              temp: res.tempFilePaths[0],
              real: '',
              key: '',
              progress: 0
            }), function () {
              that.upLoad();
            });
          } else {
            that._that.setData(_defineProperty({}, that.imgArr, that._that.data[that.imgArr] ? that._that.data[that.imgArr].concat(temp) : temp), function () {
              that.upLoad();
            });
          }
        },
        fail: function fail(err) {
          wx.hideLoading();
          console.log(err);
        }
      });
    }
  }, {
    key: 'upLoad',
    value: function upLoad() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (!this.tempFilpaths[i]) return wx.hideLoading();
      var that = this;
      var FilePath = this.tempFilpaths[i];
      var Key = 'image/' + (app.gs('userInfoAll').id || 10000) + '/' + FilePath.substr(FilePath.lastIndexOf('/') + 1);
      // console.log(Key)
      // console.log(FilePath)
      cos.postObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        FilePath: FilePath,
        onProgress: function onProgress(info) {
          that._that.setData(_defineProperty({}, that.imgArr + '[' + (that.fileIndex > -1 ? that.fileIndex : that._that.data[[that.imgArr]].length - that.tempFilpaths.length + i) + '].progress', info.percent * 100));
        }
      }, function (err, data) {
        if (err) {
          that._that.setData(_defineProperty({}, that.imgArr + '[' + (that.fileIndex > -1 ? that.fileIndex : that._that.data[that.imgArr].length - that.tempFilpaths.length + i) + '].temp', false), function () {
            that.upLoad(++i);
          });
        } else {
          that._that.setData(_defineProperty({}, that.imgArr + '[' + (that.fileIndex > -1 ? that.fileIndex : that._that.data[that.imgArr].length - that.tempFilpaths.length + i) + ']', {
            real: 'https://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com/' + Key,
            key: Key,
            temp: FilePath,
            progress: 100
          }), function () {
            that.upLoad(++i);
          });
        }
      });
    }
  }]);

  return upLoad;
}();

module.exports = upLoad;