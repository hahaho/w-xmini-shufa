// 获取全局应用程序实例对象
const app = getApp()
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    bottomImg: [
      {
        i: '',
        t: '无'
      },
      {
        i: 'https://c.jiangwenqiang.com/lqsy/camera_mi.png',
        t: '米字格'
      },
      {
        i: 'https://c.jiangwenqiang.com/lqsy/camera_hui.png',
        t: '回字格'
      },
      {
        i: 'https://c.jiangwenqiang.com/lqsy/camera_jiu.png',
        t: '九宫格'
      }
    ],
    bottomIndex: 0,
    cameraType: [
      {
        i: 'jwqduibi',
        t: '快速对比'
      },
      {
        i: 'jwqtupian',
        t: '选图对比'
      },
      {
        i: 'jwqmn_shangchuantupian',
        t: '拍照对比'
      }
    ]
  },
  openSetting (res) {
    if (res.detail.authSetting['scope.camera']) {
      this.setData({
        needSetting: false
      })
      app.toast({content: '授权成功，请选择功能进行体验', image: ''})
    } else {
      app.toast({content: '请授权使用相机功能，否则无法体验功能, 请再次点击并进行授权', time: 10000})
    }
  },
  userCamera (e) {
    let that = this
    wx.authorize({
      scope: 'scope.camera',
      success () {
        that._toggleMask(e)
      },
      fail () {
        that.setData({
          needSetting: true
        })
        app.toast({content: '请授权使用相机功能，否则无法体验功能, 请再次点击并进行授权', time: 10000})
      }
    })
  },
  _toggleMask (e) {
    let type = e.currentTarget.dataset.type
    let animate = type + 'Animate'
    if (this.data[type]) {
      this.setData({
        [animate]: !this.data[animate]
      })
      setTimeout(() => {
        this.setData({
          [type]: !this.data[type]
        })
      }, 900)
      return
    }
    this.setData({
      [animate]: !this.data[animate],
      [type]: !this.data[type]
    })
  },
  chooseType (e) {
    this.setData({
      bottomIndex: e.currentTarget.dataset.index
    })
  },
  _follow () {
    this.setData({
      follow: !this.data.follow
    })
  },
  _writeComment (e) {
    this.setData({
      focus: e.currentTarget.dataset.type === 'in'
    })
  },
  _collection () {
    this.setData({
      collection: !this.data.collection
    })
  },
  _shareType () {
    this.setData({
      showShare: !this.data.showShare
    })
  },
  _goPicShare () {
    this._shareType()
    wx.navigateTo({
      url: '/share/carShare/carShare?type=2'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // app.toast()
    // this.setKill()
    // console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // clearInterval(timer)
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // clearInterval(timer)
    // console.log(' ---------- onUnload ----------')
  },
  onShareAppMessage () {
    // return {
    //   title: app.gs('shareText').t || '绣学问，真纹绣',
    //   path: `/pages/index/index`,
    //   imageUrl: app.gs('shareText').g
    // }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // this.getCourse()
  }
})
