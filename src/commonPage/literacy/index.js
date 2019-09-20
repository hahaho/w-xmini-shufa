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
    tab: [
      {
        i: 'https://c.jiangwenqiang.com/lqsy/camera.png',
        t: '拍照'
      },
      {
        i: 'https://c.jiangwenqiang.com/lqsy/camera_pic.png',
        t: '照片'
      }
    ],
    itemIndex: 0
  },
  _literacy () {
    this.setData({
      literacy: !this.data.literacy
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
