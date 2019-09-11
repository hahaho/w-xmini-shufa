// 获取全局应用程序实例对象
const app = getApp()
let timer = null
let second = 60
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      bgc: 'url(https://c.jiangwenqiang.com/lqsy/2.png)'
    },
    capsules: app.data.capsule,
    codeText: '获取验证码'
  },
  upFormId (e) {
    app.upFormId(e)
  },
  _getCode () {
    if (timer) { return app.toast({ content: `${second}秒后可再次获取验证码` }) }
    let that = this
    that.setData({
      codeText: `${second}秒`
    })
    timer = setInterval(() => {
      second--
      if (second <= 0) {
        that.setData({
          codeText: '获取验证码'
        })
        clearInterval(timer)
        timer = null
        second = 60
      } else {
        that.setData({
          codeText: `${second}秒`
        })
      }
    }, 1000)
  },
  _phoneLogin () {
    this.setData({
      phoneLogin: !this.data.phoneLogin
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
