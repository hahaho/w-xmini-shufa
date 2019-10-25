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
    height: app.data.height,
    imgArr: ['https://c.jiangwenqiang.com/lqsy/canvas_bottom_0.jpg'],
    chooseArr: [
      {
        t: '作品宽',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100',
          '100-100',
          '100-100',
          '100-100',
          '100-100',
          '100-100',
          '100-100'
        ]
      },
      {
        t: '作品高',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100'
        ]
      },
      {
        t: '摆放场景',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100'
        ]
      },
      {
        t: '作品高',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100'
        ]
      },
      {
        t: '摆放场景',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100'
        ]
      },
      {
        t: '作品高',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100'
        ]
      },
      {
        t: '摆放场景',
        tIndex: -1,
        items: [
          '100-100',
          '100-100',
          '100-100'
        ]
      }
    ]
  },
  chooseImage (e) {
    app.data['userBackImage'] = this.data.imgArr[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: `/commonPage/canvas2/index?single=${this.data.single}`
    })
  },
  itemChoose (e) {
    this.setData({
      [`chooseArr[${e.currentTarget.dataset.oindex}].tIndex`]: e.currentTarget.dataset.iindex * 1 === this.data.chooseArr[e.currentTarget.dataset.oindex].tIndex.tIdnex * 1 ? -1 : e.currentTarget.dataset.iindex
    })
  },
  confirmSceneChange () {
    this._toggleSpec()
  },
  _toggleSpec () {
    this.setData({
      showSpec: !this.data.showSpec
    })
  },
  typeChoose () {
    wx.chooseImage({
      count: 1,
      success (res) {
        app.data['chooseImage'] = res.tempFilePaths[0]
        wx.navigateTo({
          url: '/commonPage/canvas2/step_two/index'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.data.single = options.single
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // this.getCourse()
  }
})
