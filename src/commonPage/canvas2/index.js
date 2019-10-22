// 获取全局应用程序实例对象
const app = getApp()
// const UpLoad = require('../upLoad')
let baseScale = 1 // 底图缩放率
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backImageInfo: {
      src: 'https://c.jiangwenqiang.com/lqsy/canvas_bottom_0.jpg',
      positionItem: [
        {
          x: 375,
          y: 375,
          width: 350,
          height: 350
        }
      ]
    },
    upImgArr: [
      {
        src: 'https://c.jiangwenqiang.com/lqsy/nav_0.png'
      }
    ]
  },
  /**
   * 获取图片信息
   * @param src // 传入图片路径
   * @returns {Promise}
   */
  getImageInfo (src) {
    wx.showLoading({
      title: '加载中...'
    })
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success (res) {
          wx.hideLoading()
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  /**
   * 获取底图的尺寸信息
   * @param src
   */
  getBackImageInfo (src) {
    this.getImageInfo(src).then(res => {
      res.fixWidth = app.data.system.windowWidth
      baseScale = app.data.system.windowWidth / res.width
      res.fixHeight = baseScale * res.height
      for (let v of this.data.backImageInfo.positionItem) {
        v.x = baseScale * v.x
        v.y = baseScale * v.y
        v.width = baseScale * v.width / 8
        v.height = baseScale * v.height / 8
      }
      this.setData({
        backImageInfo: Object.assign(this.data.backImageInfo, res)
      }, () => {
        this.getItemImageInfo(0)
      })
    })
  },
  /**
   * 获取每个图片的信息和位置
   * @param index
   */
  getItemImageInfo (index) {
    this.getImageInfo(this.data.upImgArr[index].src).then(res => {
      let temp = this.data.backImageInfo.positionItem[index].width * res.height / res.width
      res.width = this.data.backImageInfo.positionItem[index].width
      res.height = temp
      // 记录图片的宽高
      res.startWidth = res.width
      res.startHeight = res.height
      res.useWidth = res.width < res.height
      res.scale = 5
      res.x = this.data.backImageInfo.positionItem[index].x - res.width / 2
      res.y = this.data.backImageInfo.positionItem[index].y - res.height / 2
      res.bgc = '#ffffff'
      res.border = {
        width: 0,
        color: '#ffffff'
      }
      this.setData({
        [`upImgArr[${index}]`]: res
      }, () => {
        this.getBorderInfo('https://c.jiangwenqiang.com/lqsy/canvas_border_3.jpg', 0)
      })
    })
  },
  /**
   * 获取对应图片的边框信息
   * @param src
   * @param index
   */
  getBorderInfo (src, index = 0) {
    this.getImageInfo(src).then(res => {
      let angleWidth = this.data.upImgArr[index][this.data.upImgArr[index].useWidth ? 'startWidth' : 'startHeight'] * 2
      res.width = Math.sqrt(Math.pow(angleWidth, 2) / 2)
      res[this.data.upImgArr[index].useWidth ? 'x' : 'y'] = Math.floor(this.data.upImgArr[index][this.data.upImgArr[index].useWidth ? 'startWidth' : 'startHeight'] / (angleWidth / 2)) + 1
      res[this.data.upImgArr[index].useWidth ? 'y' : 'x'] = Math.floor(this.data.upImgArr[index][this.data.upImgArr[index].useWidth ? 'startHeight' : 'startWidth'] / (angleWidth / 2)) + 1
      res.angleWidth = angleWidth
      this.setData({
        borderImageInfo: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getBackImageInfo(this.data.backImageInfo.src)
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
    // console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // this.getCourse()
  }
})
