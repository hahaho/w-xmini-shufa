const app = getApp()
let timer = null
Component({
  properties: {
    capsule: {
      type: 'Object'
    }
  },
  observers: {
    'capsule' (res) {
      setTimeout(() => {
        this.data.capsuleSet.backShow = getCurrentPages().length > 1
        this.setData({
          capsuleSet: Object.assign(this.data.capsuleSet, res)
        })
      }, 10)
    }
  },
  data: {
    capsules: app.data.capsule,
    capsuleSet: {
      bgc: '#fff',
      backShow: false,
      backImg: 'https://c.jiangwenqiang.com/lqsy/back.png',
      op: false,
      opImg: 'https://c.jiangwenqiang.com/api/image/home.png',
      opType: 'reLaunch'
    },
    height: app.data.height,
    capsuleTop: app.data.capsuleTop,
    capsuleHeight: app.data.capsuleHeight,
    capsuleCenter: app.data.capsuleCenter
  },
  behavior: {
  },
  created () {
    // console.log(2)
  },
  ready () {},
  pageLifetimes: {
    show () {
      let that = this
      const query = wx.createSelectorQuery().in(this)
      query.select('#capsule_t').boundingClientRect(function (res) {
        that.data.capsuleCenterWidth = res.width
        if (res.width > that.data.capsuleCenter) {
          timer = setInterval(function () {
            const animation = wx.createAnimation({
              duration: Math.floor((res.width - that.data.capsuleCenter) / 50) * 1000 || 1000,
              timingFunction: 'linear'
            })
            animation.translateX(-(res.width - that.data.capsuleCenter + 10)).step()
            animation.translateX(0).step()
            that.setData({
              animationData: animation.export()
            })
          }, 2000)
        }
      }).exec()
    },
    hide () {
      if (timer) clearInterval(timer)
    }
  },
  methods: {
    _getAuth (e) {
      if (this.data.user.type !== 'getUserInfo') this.triggerEvent('back', e.detail)
      else app.wxlogin()
    },
    _back () {
      app.goBack()
    },
    _op () {
      wx[this.data.capsuleSet.opType]({
        url: this.data.capsuleSet.opUrl
      })
    }
  }
})
