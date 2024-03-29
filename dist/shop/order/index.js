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
    tabIndex: 0,
    addressInfo: app.gs('addressInfo'),
    tabId: 0,
    // '', '待付款', '待发货', '待收货', '待评价'
    tabArr: [{
      t: '全部',
      s: 0
    }, {
      t: '待付款',
      s: -1
    }, {
      t: '待发货',
      s: 1
    }, {
      t: '待收货',
      s: 2
    }, {
      t: '待评价',
      s: 3
    }],
    cancelArr: ['收货地址填错了', '忘记支付密码／余额不足', '无法正常支付', '不想购买', '其他原因'],
    cancelIndex: 0,
    page: 0,
    list: [],
    more: true
  },
  changeAddress: function changeAddress() {
    var _this = this;

    console.log(this.data.chooseOrderIndex);
    app.wxrequest({
      url: app.getUrl().shopOrderUpdate,
      data: {
        oid: this.data.list[this.data.chooseOrderIndex].id,
        out_trade_no: this.data.list[this.data.chooseOrderIndex].out_trade_no,
        uid: app.gs('userInfoAll').uid,
        name: this.data.addressInfo.userName,
        phone: this.data.addressInfo.telNumber,
        address: '' + this.data.addressInfo.provinceName + this.data.addressInfo.cityName + this.data.addressInfo.countyName + this.data.addressInfo.detailInfo
      }
    }).then(function () {
      _this._toggleMask({
        currentTarget: {
          dataset: {
            type: 'changeAdd'
          }
        }
      });
    });
  },
  chooseIndex: function chooseIndex(e) {
    var _this2 = this;

    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      tabId: e.currentTarget.dataset.index
    }, function () {
      _this2.data.page = 0;
      _this2.data.list = [];
      _this2.shopOrderList();
    });
  },
  _cancelChoose: function _cancelChoose(e) {
    this.setData({
      cancelIndex: e.currentTarget.dataset.index
    });
  },

  // _cancelMask () {
  //   if (this.data.cancelOrder) {
  //     this.setData({
  //       cancelOrderAnimate: !this.data.cancelOrderAnimate
  //     })
  //     setTimeout(() => {
  //       this.setData({
  //         cancelOrder: !this.data.cancelOrder
  //       })
  //     }, 900)
  //     return
  //   }
  //   this.setData({
  //     cancelOrderAnimate: !this.data.cancelOrderAnimate,
  //     cancelOrder: !this.data.cancelOrder
  //   })
  // },
  _toggleMask: function _toggleMask(e) {
    var _this3 = this,
        _setData2;

    var type = e.currentTarget.dataset.type;
    var animate = type + 'Animate';
    if (this.data[type]) {
      this.setData(_defineProperty({}, animate, !this.data[animate]));
      setTimeout(function () {
        _this3.setData(_defineProperty({}, type, !_this3.data[type]));
      }, 900);
      return;
    }
    this.setData((_setData2 = {}, _defineProperty(_setData2, animate, !this.data[animate]), _defineProperty(_setData2, type, !this.data[type]), _setData2));
    this.data.chooseOrderIndex = e.currentTarget.dataset.index;
  },

  // 选择地址
  chooseAddress: function chooseAddress() {
    if (this.data.lostTime) return;
    var that = this;
    wx.chooseAddress({
      success: function success(res) {
        if (res.telNumber) {
          // 获取信息成功
          wx.setStorageSync('addressInfo', res);
          that.setData({
            needSetting: false,
            addressInfo: res
          });
        }
      },
      fail: function fail() {
        wx.getSetting({
          success: function success(res) {
            if (!res.authSetting['scope.address']) {
              that.setData({
                needSetting: true
              });
              app.toast({ content: '需授权获取地址信息' });
            }
          }
        });
      }
    });
  },

  // 获取设置
  openSetting: function openSetting() {
    var that = this;
    wx.openSetting({
      success: function success(res) {
        if (res.authSetting['scope.address']) {
          that.setData({
            needSetting: false
          });
          that.chooseAddress();
        }
      }
    });
  },
  _remind: function _remind(e) {
    app.wxrequest({
      url: app.getUrl().shopRemind,
      data: {
        oid: e.currentTarget.dataset.id,
        uid: app.gs('userInfoAll').uid
      }
    }).then(function () {
      app.toast({ content: '提醒商家发货成功', image: '' });
    });
  },
  _buyAgain: function _buyAgain() {
    app.toast({ content: '商品已添加到您的购物车中', image: '' });
  },
  shopOrderList: function shopOrderList() {
    var _this4 = this;

    app.wxrequest({
      url: app.getUrl().shopOrderList,
      data: {
        page: ++this.data.page,
        uid: app.gs('userInfoAll').uid,
        // 0获取全部 -1未支付 1已支付准备发货 2已发货 3已收货 4收货后删除订单 -2申请退款 -3 退款成功 -4 未支付删除 -5 退款并删除订单 -6拒绝退款
        status: this.data.tabArr[this.data.tabIndex].s
      }
    }).then(function (res) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = res.lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          v.create_at = v.create_at ? app.momentFormat(v.create_at * 1000, 'YYYY-MM-DD HH:mm') : '时间不详';
          v.statuss = v.status;
          switch (v.status * 1) {
            case 0:
              v.status = '无状态';
              break;
            case 1:
              v.status = '待发货';
              break;
            case 2:
              v.status = '待收货';
              break;
            case 3:
              v.status = '待评价';
              break;
            case 4:
              v.status = '已删除';
              break;
            case -1:
              v.status = '待付款';
              break;
            case -2:
              v.status = '退款中';
              break;
            case -3:
              v.status = '退款成功';
              break;
            case -4:
              v.status = '无效订单';
              break;
            case -5:
              v.status = '已退款';
              break;
            case -6:
              v.status = '退款失败';
              break;
          }
          v.all_count = 0;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = v.list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var s = _step2.value;

              v.all_count += s.count * 1;
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

      _this4.setData({
        list: _this4.data.list.concat(res.lists)
      });
      _this4.data.more = res.lists.length >= res.pre_page;
    });
  },
  orderOperate: function orderOperate(e) {
    var _this5 = this;

    app.wxrequest({
      url: app.getUrl().shopOrderOperate,
      data: {
        oid: this.data.list[e.currentTarget.dataset.op === 'confirm' ? e.currentTarget.dataset.index : this.data.chooseOrderIndex].id,
        uid: app.gs('userInfoAll').uid,
        state: e.currentTarget.dataset.op === 'confirm' ? 3 : -4,
        remark: e.currentTarget.dataset.op === 'confirm' ? '' : this.data.cancelArr[this.data.cancelIndex]
      }
    }).then(function () {
      _this5.data.list.splice(e.currentTarget.dataset.op === 'confirm' ? e.currentTarget.dataset.index : _this5.data.chooseOrderIndex, 1);
      _this5.setData({
        list: _this5.data.list
      });
      _this5._toggleMask(e);
    });
  },
  backMoney: function backMoney(e) {
    app.su('backInfo', this.data.list[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: '/commonPage/back/back'
    });
  },
  goPJ: function goPJ(e) {
    app.su('pjInfo', this.data.list[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: '/commonPage/talk/index?type=comment'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.setData({
      options: options,
      tabIndex: options.type,
      tabId: options.type
    }, this.shopOrderList);
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

  // onShareAppMessage () {
  //   // return {
  //   //   title: app.gs('shareText').t || '绣学问，真纹绣',
  //   //   path: `/pages/index/index`,
  //   //   imageUrl: app.gs('shareText').g
  //   // }
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // this.getCourse()
  }
});