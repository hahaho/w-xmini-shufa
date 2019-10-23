// 获取全局应用程序实例对象
const app = getApp()
// const UpLoad = require('../upLoad')
let baseScale = 1 // 底图缩放率
let currentIndex = 0 // 当前的图片
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
          width: 500,
          height: 500
        }
      ]
    },
    upImgArr: [
      {
        src: 'https://c.jiangwenqiang.com/lqsy/nav_0.png'
      }
    ],
    tabBorderArr: {
      i: -1,
      item: [
        'https://c.jiangwenqiang.com/lqsy/canvas_border_0.jpg',
        'https://c.jiangwenqiang.com/lqsy/canvas_border_1.jpg',
        'https://c.jiangwenqiang.com/lqsy/canvas_border_2.jpg',
        'https://c.jiangwenqiang.com/lqsy/canvas_border_3.jpg',
        'https://c.jiangwenqiang.com/lqsy/canvas_border_4.jpg',
        'https://c.jiangwenqiang.com/lqsy/canvas_border_5.jpg'
      ]
    },
    bgColorArr: {
      i: -1,
      item: [
        '#ffffff',
        '#ff0000',
        '#ffff00',
        '#00ff00',
        '#0000ff',
        '#ff00ff'
      ]
    },
    borderColorArr: {
      i: 0,
      item: [
        '#ffffff',
        '#ff0000',
        '#ffff00',
        '#00ff00',
        '#0000ff',
        '#ff00ff'
      ]
    },
    operationArr: {
      chooseIndex: 0,
      tab: [
        {
          t: '画框',
          img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
          imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
          sliderText: '缩放',
          currentSlider: 0,
          minSlider: 0,
          maxSlider: 80
        },
        {
          t: '卡纸',
          img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
          imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
          sliderText: '宽度',
          currentSlider: 0,
          minSlider: 0,
          maxSlider: 20
        },
        {
          t: '局条',
          img: 'https://c.jiangwenqiang.com/lqsy/canvasType_2.png',
          imgChoose: 'https://c.jiangwenqiang.com/lqsy/canvasType_1_choose.png',
          sliderText: '宽度',
          currentSlider: 0,
          minSlider: 0,
          maxSlider: 3
        }]
    }
  },
  /**
   * slider对应不同内容处理
   * @param e
   */
  sliderChanage (e) {
    if (this.data.operationArr.chooseIndex === 0) { // 改变整体大小
      this.setData({
        [`operationArr.tab[0].currentSlider`]: e.detail.value,
        [`upImgArr[0].scale`]: (100 - e.detail.value) / 100
      })
    } else if (this.data.operationArr.chooseIndex === 1) { // 改变图片大小
      let inScale = 1 - (e.detail.value / 40)
      this.setData({
        [`operationArr.tab[1].currentSlider`]: e.detail.value,
        [`upImgArr[${currentIndex}].width`]: this.data.upImgArr[currentIndex].startWidth * inScale,
        [`upImgArr[${currentIndex}].height`]: this.data.upImgArr[currentIndex].startHeight * inScale,
        [`upImgArr[${currentIndex}].xx`]: ((1 - inScale) * this.data.upImgArr[currentIndex].startWidth) / 2,
        [`upImgArr[${currentIndex}].yy`]: ((1 - inScale) * this.data.upImgArr[currentIndex].startHeight) / 2
      })
      if (this.data.operationArr.tab[2].currentSlider > 0) {
        let value = this.data.operationArr.tab[2].currentSlider * 2
        this.setData({
          [`upImgArr[${currentIndex}].border.x`]: this.data.upImgArr[currentIndex].xx - value / 2,
          [`upImgArr[${currentIndex}].border.y`]: this.data.upImgArr[currentIndex].yy - value / 2,
          [`upImgArr[${currentIndex}].border.width`]: this.data.upImgArr[currentIndex].width + value,
          [`upImgArr[${currentIndex}].border.height`]: this.data.upImgArr[currentIndex].height + value
        })
      }
    } else if (this.data.operationArr.chooseIndex === 2) { // 改变局条颜色
      let value = 2 * e.detail.value
      this.setData({
        [`operationArr.tab[2].currentSlider`]: e.detail.value,
        [`upImgArr[${currentIndex}].border.x`]: this.data.upImgArr[currentIndex].xx - value / 2,
        [`upImgArr[${currentIndex}].border.y`]: this.data.upImgArr[currentIndex].yy - value / 2,
        [`upImgArr[${currentIndex}].border.width`]: this.data.upImgArr[currentIndex].width + value,
        [`upImgArr[${currentIndex}].border.height`]: this.data.upImgArr[currentIndex].height + value
      })
    }
  },
  /**
   * 修改不同分类的索引
   * @param e
   */
  chooseIndex (e) {
    if (e.currentTarget.dataset.type === 'type') { // 选择类型
      this.setData({
        [`operationArr.chooseIndex`]: e.currentTarget.dataset.index
      })
    } else if (e.currentTarget.dataset.type === 'type0') { // 选择边框
      this.setData({
        [`tabBorderArr.i`]: e.currentTarget.dataset.index
      }, () => {
        this.getBorderInfo(this.data.tabBorderArr.item[e.currentTarget.dataset.index])
      })
    } else if (e.currentTarget.dataset.type === 'type1') { // 选择卡纸
      this.setData({
        [`bgColorArr.i`]: e.currentTarget.dataset.index,
        [`upImgArr[${currentIndex}].bgc`]: this.data.bgColorArr.item[e.currentTarget.dataset.index]
      })
    } else if (e.currentTarget.dataset.type === 'type2') { // 选择局条
      this.setData({
        [`borderColorArr.i`]: e.currentTarget.dataset.index,
        [`upImgArr[${currentIndex}].border.color`]: this.data.borderColorArr.item[e.currentTarget.dataset.index]
      })
    }
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
        // v.width = baseScale * v.width / 8
        // v.height = baseScale * v.height / 8
        v.width = baseScale * v.width
        v.height = baseScale * v.height
      }
      this.setData({
        backImageInfo: Object.assign(this.data.backImageInfo, res)
      }, () => {
        this.data.upImgArr[0].src = app.data.userUseImg || 'https://c.jiangwenqiang.com/lqsy/nav_0.png'
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
      if (res.width >= res.height) {
        let temp = this.data.backImageInfo.positionItem[index].width * res.height / res.width
        res.width = this.data.backImageInfo.positionItem[index].width.toFixed(1)
        res.height = temp.toFixed(1)
      } else {
        let temp = this.data.backImageInfo.positionItem[index].height * res.width / res.height
        res.height = this.data.backImageInfo.positionItem[index].height.toFixed(1)
        res.width = temp.toFixed(1)
      }
      // 记录图片的宽高
      res.startWidth = res.width
      res.startHeight = res.height
      res.useWidth = res.width < res.height
      res.scale = 1
      res.rotate = 0
      res.x = this.data.backImageInfo.positionItem[index].x - res.width / 2
      res.y = this.data.backImageInfo.positionItem[index].y - res.height / 2
      res.xx = 0
      res.yy = 0
      res.bgc = '#ffffff'
      res.border = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        color: '#ffffff'
      }
      this.setData({
        [`upImgArr[${index}]`]: res
      })
    })
  },
  /**
   * 获取对应图片的边框信息
   * @param src
   * @param index
   */
  getBorderInfo (src, index = 0) {
    if (!src) {
      return this.setData({
        borderImageInfo: null
      })
    }
    this.getImageInfo(src).then(res => {
      res.width = (res.width * baseScale).toFixed(1)
      let x = this.data.upImgArr[index].startWidth / (res.width / 2)
      let y = this.data.upImgArr[index].startHeight / (res.width / 2)
      res.x = x === Math.floor(x) ? Math.floor(x) - 1 : Math.floor(x)
      res.y = y === Math.floor(y) ? Math.floor(y) - 1 : Math.floor(y)
      this.setData({
        borderImageInfo: res
      })
    })
  },

  canvasDraw () {
    wx.showLoading({
      title: '疯狂生成中',
      mask: true
    })
    let ctx = wx.createCanvasContext('outPic', this)
    let that = this
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, that.data.backImageInfo.showWidth * 2, that.data.backImageInfo.showHeight * 2)
    if (that.data.backImageInfo.zIndex <= 1) {
      ctx.drawImage(that.data.backImageInfo.path, 0, 0, that.data.backImageInfo.showWidth * 2, that.data.backImageInfo.showHeight * 2)
    }
    for (let v of that.data.imgArr) {
      ctx.save()
      ctx.translate(v.left * 2 + v.showWidth, v.top * 2 + v.showHeight)
      ctx.rotate(v.rotate * Math.PI / 180)
      ctx.drawImage(v.path, -(v.showWidth * v.scale), -(v.showHeight * v.scale), v.showWidth * v.scale * 2, v.showHeight * v.scale * 2)
      if (v.border) {
        // 左上角
        ctx.translate(-v.showWidth * v.scale, -v.showHeight * v.scale)
        ctx.rotate(45 * Math.PI / 180)
        ctx.drawImage(v.border.path, -(v.border.width * v.scale), -(v.border.width * v.scale), v.border.width * v.scale * 2, v.border.width * v.scale * 2)
        ctx.rotate(-45 * Math.PI / 180)
        ctx.translate(v.showWidth * 2 * v.scale, 0)
        ctx.rotate(135 * Math.PI / 180)
        ctx.drawImage(v.border.path, -(v.border.width * v.scale), -(v.border.width * v.scale), v.border.width * v.scale * 2, v.border.width * v.scale * 2)
        ctx.rotate(-135 * Math.PI / 180)
        ctx.translate(0, v.showHeight * 2 * v.scale)
        ctx.rotate(225 * Math.PI / 180)
        ctx.drawImage(v.border.path, -(v.border.width * v.scale), -(v.border.width * v.scale), v.border.width * v.scale * 2, v.border.width * v.scale * 2)
        ctx.rotate(-225 * Math.PI / 180)
        ctx.translate(-v.showWidth * 2 * v.scale, 0)
        ctx.rotate(315 * Math.PI / 180)
        ctx.drawImage(v.border.path, -(v.border.width * v.scale), -(v.border.width * v.scale), v.border.width * v.scale * 2, v.border.width * v.scale * 2)
        ctx.rotate(-315 * Math.PI / 180)
        ctx.translate(v.showWidth * v.scale, -v.showHeight * v.scale)
        ctx.drawImage(v.path, -(v.showWidth * v.scale), -(v.showHeight * v.scale), v.showWidth * v.scale * 2, v.showHeight * v.scale * 2)
      }
      ctx.restore()
    }

    if (that.data.backImageInfo.zIndex >= 10) {
      ctx.drawImage(that.data.backImageInfo.path, 0, 0, that.data.backImageInfo.showWidth * 2, that.data.backImageInfo.showHeight * 2)
    }
    ctx.draw()
    setTimeout(() => {
      this.outImageDouble()
    }, 300)
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
