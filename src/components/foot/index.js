const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  properties: {},
  observers: {},
  data: {
    fix: app.data.fix,
    shop: false
    // bgc: '#f00'
  },
  ready () {
    if ((new Date().getTime() - (app.gs('openTime') || 0)) >= 86400000) {
      this.getNav()
    } else {
      this.setFootArr()
    }
  },
  methods: {
    footOp (e) {
      if (this.data.footArr[e.currentTarget.dataset.index]['active']) return
      for (let v of this.data.footArr) {
        v['active'] = false
      }
      this.data.footArr[e.currentTarget.dataset.index]['active'] = true
      this.setData({
        footArr: this.data.footArr
      })
      app.su(this.data.shop ? 'shop_nav' : 'main_nav', this.data.footArr)
      wx.reLaunch({
        url: this.data.footArr[e.currentTarget.dataset.index].path_mini
        // url: '/shop/index/index'
      })
    },
    getNav () {
      let that = this
      app.wxrequest({
        // url: 'https://c.jiangwenqiang.com/lqsy/bottom_nav.json'
        url: app.getUrl().homeConfig
      })
        .then(res => {
          // console.log(res)
          app.su('openTime', new Date().getTime())
          app.su('main_nav', res.bottom_menu)
          // app.su('shop_nav', res.shop_nav)
          that.setFootArr()
        })
    },
    checkIndex () {
      let arr = []
      let current = getCurrentPages()[getCurrentPages().length - 1].route
      if (current.indexOf('shop') >= 0) { // 商城
        arr = app.gs('shop_nav')
        this.data.shop = true
      } else {
        arr = app.gs('main_nav')
        this.data.shop = false
      }
       // ? arr = app.gs('shop_nav') : arr = app.gs('main_nav')
      for (let v of arr) {
        v['active'] = false
        v.path_mini.indexOf(current) >= 0 ? v['active'] = true : ''
      }
      return arr
    },
    setFootArr () {
      this.setData({footArr: this.checkIndex()})
    }
  }
})
