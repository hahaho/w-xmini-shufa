// 获取全局应用程序实例对象
const app = getApp()
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
    capsules: app.data.capsule,
    num: 1,
    more: true,
    page: 0,
    comment: [],
    skuIndex: -1
  },
  _submit () {
    if (this.data.skuIndex < 0) return app.toast({content: `请选择${this.data.info.label}分类`})
    if (this.data.buyType === 'car') return this.shopCartAdd()
    let temp = [{
      pid: this.data.info.sku[this.data.skuIndex].pid,
      sku_id: this.data.info.sku[this.data.skuIndex].id,
      count: this.data.num,
      product: {
        title: this.data.info.title,
        price: this.data.info.sku[this.data.skuIndex].price,
        img_url: this.data.info.sku[this.data.skuIndex].img_url,
        freight: this.data.info.freight,
        value: this.data.info.sku[this.data.skuIndex].value,
        label: this.data.info.label
      }
    }]
    app.su('buyInfo', temp)
    wx.navigateTo({
      url: '/shop/submit/index'
    })
  },
  _numOp (e) {
    if (e.currentTarget.dataset.type === 'add') {
      this.data.num++
    } else {
      this.data.num > 1 && this.data.num-- || app.toast({content: '最小购买数量为1'})
    }
    this.setData({
      num: this.data.num
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
  _showComment () {
    this.setData({
      showComment: !this.data.showComment
    })
  },
  _toggleSpec (e) {
    this.data.buyType = e ? e.currentTarget.dataset.type : ''
    this.setData({
      showSpec: !this.data.showSpec
    })
  },
  _goPicShare () {
    this._shareType()
    wx.navigateTo({
      url: '/share/carShare/carShare?type=2'
    })
  },
  shopProductDetail () {
    app.wxrequest({
      url: app.getUrl().shopProductDetail,
      data: {
        pid: this.data.options.id
      }
    }).then(res => {
      res.imgs_url = JSON.parse(res.imgs_url)
      res.new_price = res.new_price.split('.')
      res.detail_url = res.detail_url.split(',')
      if (!res.imgs_url.imgs.length) res.imgs_url.imgs[0] = res.img_url
      this.setData({
        info: res
      })
    })
  },
  shopDiscuss () {
    app.wxrequest({
      url: app.getUrl().shopDiscuss,
      data: {
        uid: app.gs('userInfoAll').uid,
        pid: this.data.options.id,
        page: ++this.data.page
      }
    }).then(res => {
      for (let v of res.lists) {
        v.imgs_url = JSON.parse(v.imgs_url)
      }
      this.setData({
        comment: this.data.comment.concat(res.lists),
        commentTotal: res.total
      })
      this.data.more = res.lists.length >= res.pre_page
    })
  },
  moreComments () {
    if (!this.data.more) return app.toast({content: '没有更多内容了'})
    this.shopDiscuss()
  },
  showImg (e) {
    app.showImg(e.currentTarget.dataset.url, this.data.comment[e.currentTarget.dataset.index].imgs_url.imgs)
  },
  chooseSku (e) {
    this.setData({
      skuIndex: e.currentTarget.dataset.index
    })
  },
  shopCartAdd () {
    if (!app.gs('userInfoAll').uid) {
      app.toast({content: '您尚未登陆,请登陆后再购买'})
      return setTimeout(() => {
        wx.navigateTo({
          url: '/user/login/index'
        })
      }, 2000)
    }
    app.wxrequest({
      url: app.getUrl().shopCartAdd,
      data: {
        pid: this.data.info.id,
        uid: app.gs('userInfoAll').uid,
        sku_id: this.data.info.sku[this.data.skuIndex].id,
        count: this.data.num
      }
    }).then(() => {
      app.toast({content: '添加入购物车成功', image: ''})
      this._toggleSpec()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.data.options = options
    this.shopProductDetail()
    this.shopDiscuss()
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
    let temps = app.gs('shareUrl')
    let url = getCurrentPages()[getCurrentPages().length - 1].route
    for (let i in temps) {
      if (temps[i].indexOf(url) >= 0) {
        return {
          title: `${this.data.info.title}`,
          path: `/openShare/index/index?url=${i}&q=${this.data.info.id}`,
          imageUrl: `${this.data.info.img_url}`
        }
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // this.getCourse()
  }
})
