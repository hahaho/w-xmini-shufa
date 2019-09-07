// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgDomain: app.data.imgDomain,
    painting: {},
    goodsInfo: {},
    color: '#0094ff',
    shareImage: ''
  },
  getBottomList () {
    this.getGood()
  },
  getGood () {
    let that = this
    app.wxrequest({
      url: app.getUrl().goodOne,
      data: {
        id: that.data.options.type
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status) {
          that.data.goodsInfo = res.data.data
          that.getQrCode()
        } else {
          app.setToast(that, {content: res.data.desc})
        }
      }
    })
  },
  eventDraw (e) {
    wx.showLoading({
      title: '定制专属海报中',
      mask: true
    })
    let that = this
    let views = [
      {
        type: 'image',
        url: app.gs('userInfoAll').avatar_url,
        top: 94,
        left: 154,
        width: 70,
        height: 70
      },
      {
        type: 'image',
        url: `${that.data.qrCode}`,
        top: 358,
        left: 198,
        width: 130,
        height: 130
      },
      {
        type: 'image',
        url: that.data.options.style > 1 ? 'https://teach-1258261086.cos.ap-guangzhou.myqcloud.com/image/admin/mask/share_4.png' : that.data.options.type * 1 === 3 ? 'https://teach-1258261086.cos.ap-guangzhou.myqcloud.com/image/admin/mask/share_3.png' : that.data.options.type * 1 === 2 ? 'https://teach-1258261086.cos.ap-guangzhou.myqcloud.com/image/admin/mask/share_2.png' : 'https://teach-1258261086.cos.ap-guangzhou.myqcloud.com/image/admin/mask/share_1.png',
        top: 0,
        left: 0,
        width: 375,
        height: 603
      }
    ]

    this.setData({
      painting: {
        width: 375,
        height: 603,
        clear: true,
        views
      }
    })
  },
  eventDraw2 (e) {
    wx.showLoading({
      title: '定制海报中',
      mask: true
    })
    let that = this
    let views = [
      {
        type: 'image',
        url: 'https://teach-1258261086.cos.ap-guangzhou.myqcloud.com/image/admin/mask/share_4.png',
        top: 0,
        left: 0,
        width: 375,
        height: 603
      },
      {
        type: 'image',
        url: `${this.data.imgDomain}/${this.data.goodsInfo.cover_image}`,
        top: 120,
        left: 36,
        width: 300,
        height: 220
      },
      {
        type: 'text',
        content: this.data.goodsInfo.name,
        breakWord: true,
        MaxLineNumber: 1,
        fontSize: 20,
        lineHeight: 20,
        top: 360,
        left: 40,
        width: 120
      },
      {
        type: 'text',
        content: '售价：' + this.data.goodsInfo.price,
        breakWord: true,
        MaxLineNumber: 2,
        top: 420,
        left: 40,
        width: 120
      },
      {
        type: 'image',
        url: `${that.data.qrCode}`,
        top: 358,
        left: 198,
        width: 130,
        height: 130
      }
    ]

    this.setData({
      painting: {
        width: 375,
        height: 603,
        clear: true,
        views
      }
    })
  },
  eventGetImage (event) {
    wx.hideLoading()
    const { tempFilePath } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
  },
  getQrCode () {
    let that = this
    // that.eventDraw()
    app.wxrequest({
      url: app.getUrl().getCode,
      data: {
        id: app.gs('userInfoAll').id,
        shop_id: that.data.options.type
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status) {
          that.setData({
            qrCode: `https://mask.idwenshi.com/mask/public/qrcode/share/${res.data.data}`
          }, that.data.options.style > 1 ? that.eventDraw2 : that.eventDraw)
        } else {
          app.setToast(that, {content: res.data.desc})
        }
      }
    })
  },
  savePhoto () {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success () {
        console.log(1)
        wx.showToast({
          title: '保存成功'
        })
      },
      fail () {
        app.setToast(that, {content: '请授权相册保存'})
        that.setData({
          buttonShow: true
        })
      }
    })
  },
  // onShareAppMessage () {
  //   let title = app.gs('share')[0].title
  //   let imageUrl = app.gs('share')[0].image_url
  //   return {
  //     title,
  //     imageUrl,
  //     path: `/pages/menu/menu?recommend=${app.gs('userInfoAll').id},${app.gs('userInfoAll').rank <= 1 ? 1 : app.gs('userInfoAll').rank},${app.gs('userInfoAll').parent_id}`
  //   }
  // },
  openSettingO (e) {
    if (e.detail.authSetting['scope.writePhotosAlbum']) {
      this.setData({
        buttonShow: false
      })
    } else {
      this.setData({
        buttonShow: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // this.setData({
    //   options,
    //   color: options.type >= 3 ? '#7D5334' : options.type >= 2 ? '#34477D' : '#7E3535',
    //   info: app.gs('userInfoAll')
    // }, this.getBottomList)
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
