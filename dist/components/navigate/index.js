'use strict';

var app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    url: {
      type: String,
      val: ''
    }
  },
  observers: {},
  ready: function ready() {},

  methods: {
    _navigateTo: function _navigateTo() {
      var pages = getCurrentPages();
      if (pages.length > 9) {
        wx.redirectTo({
          url: this.data.url
        });
      } else {
        wx.navigateTo({ url: this.data.url });
      }
    }
  }
});