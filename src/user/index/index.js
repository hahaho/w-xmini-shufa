// 获取全局应用程序实例对象
const app = getApp()
// const bmap = require('../../utils/bmap-wx')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {
      transparent: true,
      bgc: ''
    },
    capsules: app.data.capsule,
    op: [
      {
        t: '我的收益',
        i: 'jwqjindutiaoshouyidaozhang',
        c: '#ff0000',
        url: '/user/money/index'
      },
      {
        t: '我的赞',
        i: 'jwqshoucang',
        c: '#f39800',
        url: '/user/collect/index?type=zan'
      },
      {
        t: '意见反馈',
        i: 'jwqyoujian',
        c: '#0068b7',
        url: '/commonPage/talk/index?type=suggest'
      }
    ],
    uiOp: [
      {
        t: '帖子',
        n: 13,
        url: '/user/collect/index?type=send'
      },
      {
        t: '评论',
        n: 13,
        url: '/user/comment/index?type=comment'
      },
      {
        t: '粉丝',
        n: 13,
        url: '/user/comment/index?type=fans'
      }
    ],
    tabArr: [
      {
        t: '我的师友',
        i: '',
        url: '/user/team/index'
      },
      {
        t: '邀约好友',
        i: '',
        url: '/share/carShare/carShare?type=user'
      },
      {
        t: '关于刘谦',
        i: '',
        url: ''
      },
      {
        t: '我的消息',
        i: '',
        url: '/user/message/index?type=user'
      }
    ]
  },
  upFormId (e) {
    app.upFormId(e)
  },
  _toggleSign () {
    this.setData({
      sign: !this.data.sign
    })
  },
  _sign (e) {
    let that = this
    if (!e.detail.value.sign.trim()) return app.toast({content: '请输入内容'})
    app.wxrequest({
      url: app.getUrl().userSign,
      data: {
        uid: app.gs('userInfoAll').uid,
        sign: e.detail.value.sign.trim()
      }
    }).then(() => {
      app.toast({content: '修改成功'})
      that._toggleSign()
    })
  },
  _getUserInfo (e) {
    console.log('用户信息', e)
    let that = this
    if (!app.gs('access_token')) return app.toast({content: '请先登录再进行此操作'})
    wx.login({
      success (loginRes) {
        app.wxrequest({
          url: app.getUrl().wechatOpenid,
          data: {
            uid: app.gs('userInfoAll').uid,
            code: loginRes.code,
            avatar_url: e.detail.userInfo.avatarUrl,
            nickname: e.detail.userInfo.nickName,
            phone: app.gs('userInfoAll').phone || ''
          }
        }).then(res => {
          console.log('登录结果', res)
          app.su('userInfoAll', Object.assign(app.gs('userInfoAll') || {}, res))
        })
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
