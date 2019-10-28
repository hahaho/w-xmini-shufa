// 获取全局应用程序实例对象
// const app = getApp()
const UpLoad = require('../upLoad')
// const bmap = require('../../utils/bmap-wx')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    now: true,
    swiperImg: [],
    derationImg: [
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png',
      'https://c.jiangwenqiang.com/lqsy/2.png'
    ]
  },
  _toggleSpec (e) {
    if (e.currentTarget.dataset.type === 'showSpec2') {
      this.setData({showSpec2: !this.data.showSpec2})
    } else {
      this.setData({showSpec: !this.data.showSpec})
    }
  },
  pickerChoose (e) {
    this.setData({
      [`${e.currentTarget.dataset.type}`]: e.currentTarget.dataset.type === 'wareHouse' ? e.detail.value.join(' ') : e.detail.value
    })
  },
  toggleTime () {
    this.setData({
      now: !this.data.now
    })
  },
  uploadSingleImg (url) {
    new UpLoad({imgArr: 'swiperImg', this: this}).upImgSingle(url)
  },
  chooseType () {
    wx.showActionSheet({
      itemList: ['拍照', '作品装裱', '从手机相册选择'],
      success (e) {
        switch (e.tapIndex) {
          case 0:
            new UpLoad({imgArr: 'swiperImg', sourceType: ['camera']}).chooseImage()
            break
          case 1:
            wx.navigateTo({
              url: '/commonPage/canvas2/step_one/index?from=sell_release'
            })
            break
          case 2:
            new UpLoad({imgArr: 'swiperImg', sourceType: ['album']}).chooseImage()
            break
          default:
            break
        }
      }
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
