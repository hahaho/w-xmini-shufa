// 获取全局应用程序实例对象
const app = getApp()
const UpLoad = require('../upLoad')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fix: app.data.fix,
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    textArr: ['非常差', '差', '一般', '好', '非常好'],
    imgArr: [],
    sos: [
      '笔画求教',
      '单字求救',
      '作品求救',
      '无'
    ],
    sosIndex: 0
  },
  chooseSoS () {
    let that = this
    wx.showActionSheet({
      itemList: this.data.sos,
      success (res) {
        that.setData({
          sosIndex: res.tapIndex
        })
      }
    })
  },
  _chooseLv (e) {
    this.setData({
      commentLV: e.currentTarget.dataset.index
    })
  },
  upload () {
    new UpLoad({imgArr: 'imgArr'}).chooseImage()
  },
  checkAll () {
    if (new UpLoad({imgArr: 'imgArr'}).checkAll()) {
    }
  },
  imgOp (e) {
    new UpLoad({imgArr: e.currentTarget.dataset.img, index: e.currentTarget.dataset.index}).imgOp()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      options
    })
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
