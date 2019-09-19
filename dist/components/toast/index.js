'use strict';

var app = getApp();
var timer = null;
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    toast: {
      type: 'Object',
      value: {}
    }
  },
  observers: {
    toast: function toast(value) {
      if (!value) return;
      var that = this;
      this.setData({
        type: value.toastType
      }, function () {
        that.setData({
          toastInfo: value,
          show: true
        });
      });
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        that.setData({
          show: false
        });
      }, value.time);
    }
  },
  data: {
    user: {},
    type: 'center',
    height: app.data.height
  },
  methods: {
    _touchStart: function _touchStart() {
      if (this.data.toast.mask) return;
      if (app.data.requireDisable < 10) return;
      if (timer) clearTimeout(timer);
      this.setData({
        show: false
      });
    }
  }
});