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
    }
  },
  typeChoose () {
    wx.chooseImage({
      count: 1,
      success (res) {
        app.data['chooseImage'] = res.tempFilePaths[0]
        wx.navigateTo({
          url: '/commonPage/canvas2/step_two/index?single=single'
        })
      }
    })
  },
  onShareAppMessage () {
    return {
      path: 'commonPage/canvas2/step_one/index'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (options.from === 'sell_release') {
      app.data.sell_release = true
    } else {
      app.data.sell_release = false
    }
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
    app.checkUser({login: false})
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
