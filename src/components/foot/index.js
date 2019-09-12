const app = getApp()
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
  ready () {
    let that = this
    if (!app.gs('footArr')) {
      app.wxrequest({
        url: 'https://teach.idwenshi.com/teaching/public/index.php/home/page',
        data: {
          style: 1
        }
      })
        .then(res => {
          let current = getCurrentPages()[getCurrentPages().length - 1]
          for (let v of res) {
            v['active'] = false
            if (v.url.indexOf(current) >= 0) {
              v['active'] = true
            }
          }
          app.su('footArr', res)
          that.setData({
            footArr: res
          })
        })
    } else {
      this.setData({
        footArr: app.gs('footArr')
      })
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
      app.su('footArr', this.data.footArr)
      wx.reLaunch({
        // url: this.data.footArr[e.currentTarget.dataset.index].url
        url: '/shop/index/index'
      })
    }
  }
})
