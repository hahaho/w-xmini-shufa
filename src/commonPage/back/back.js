// 获取全局应用程序实例对象
const app = getApp()
const COS = require('../cos-js-sdk-v5.min')
const config = require('../config')
const cos = new COS({
  getAuthorization (params, callback) {
    let authorization = COS.getAuthorization({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Method: params.Method,
      Key: params.Key
    })
    callback(authorization)
  }
})
// const UpLoad = require('../upLoad')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fix: app.data.fix,
    backType: [
      {
        t: '我要退款（无需退货）'
      },
      {
        t: '我要退货退款'
      }
    ],
    backTypeIndex: 0,
    backReason: [
      {
        t: '多拍、错拍、不想要'
      },
      {
        t: '不喜欢、效果不好'
      },
      {
        t: '货物与描述不符'
      },
      {
        t: '质量问题'
      },
      {
        t: '收到商品少件、破损与污渍'
      },
      {
        t: '卖家发错货'
      },
      {
        t: '假冒品牌'
      }
    ],
    backReasonIndex: 0,
    upImgArr: [],
    upImgArrProgress: []
  },
  refund () {
    let that = this
    app.wxrequest({
      url: app.getUrl()[that.data.options.ping > 0 ? 'refund' : 'refundGoods'],
      data: {
        uid: app.gs('userInfoAll').id,
        openid: app.gs('userInfoAll').openid,
        mid: that.data.options.mid,
        oid: that.data.options.oid,
        amount: that.data.options.amount || 0,
        out_trade_no: that.data.options.out_trade_no,
        types: (that.data.backTypeIndex * 1) + 1,
        reason: that.data.backReason[that.data.backReasonIndex].t,
        explain: that.data.content || '顾客未填写说明'
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            apply: false
          })
        } else {
          app.setToast(that, {content: res.data.desc})
        }
      }
    })
  },
  inputValue (e) {
    app.inputValue(e, this)
  },
  pickerChange (e) {
    // console.log(e)
    this.setData({
      [`${e.currentTarget.dataset.type}`]: e.detail.value
    })
  },
  wxUploadImg (index = -1) {
    let that = this
    let length = that.data.upImgArr.length || 0
    let id = app.gs('userInfoAll').id || 10000
    wx.chooseImage({
      count: index >= 0 ? 1 : 9 - length,
      success (res) {
        for (let [i, v] of res.tempFilePaths.entries()) {
          if (!that.data.upImgArr[index >= 0 ? index : length + i]) {
            that.data.upImgArr[index >= 0 ? index : length + i] = {
              temp: null,
              real: null
            }
          }
          that.data.upImgArr[index >= 0 ? index : length + i]['real'] = ''
          that.data.upImgArr[index >= 0 ? index : length + i]['temp'] = v
        }
        that.setData({
          upImgArr: that.data.upImgArr
        })
        if (index >= 0) {
          cos.deleteObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: that.data.upImgArr[index].Key
          })
        }
        (function upLoad (j) {
          let v = res.tempFilePaths[j]
          let Key = `image/${id}/${v.substr(v.lastIndexOf('/') + 1)}` // 这里指定上传的文件名
          cos.postObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: Key,
            FilePath: v,
            onProgress: function (info) {
              that.data.upImgArrProgress[index >= 0 ? index : length + j] = info.percent * 100
              that.setData({
                upImgArrProgress: that.data.upImgArrProgress
              })
            }
          }, (err, data) => {
            if (err) {
              console.error('upLoadErr', err)
              that.data.upImgArr[index >= 0 ? index : length + j]['upFail'] = true
              that.setData({
                upImgArr: that.data.upImgArr
              })
            } else {
              console.log(data)
              that.data.upImgArr[index >= 0 ? index : length + j]['real'] = `https://${config.Bucket}.cos.${config.Region}.myqcloud.com/${Key}`
              that.data.upImgArr[index >= 0 ? index : length + j]['Key'] = Key
            }
            if (j + 1 < res.tempFilePaths.length) upLoad(j + 1)
          })
        })(0)
      }
    })
  },
  imgOperation (e) {
    if (!this.data.upImgArr[e.currentTarget.dataset.index].real) return app.setToast(this, {content: '请稍后操作'})
    let that = this
    let itemList = ['查看图片', '替换图片', '删除图片']
    for (let v of this.data.upImgArr) {
      if (!v.real) itemList = ['查看图片', '替换图片']
    }
    wx.showActionSheet({
      itemList,
      success (res) {
        if (res.tapIndex === 0) {
          app.showImg(that.data.upImgArr[e.currentTarget.dataset.index].temp, [that.data.upImgArr[e.currentTarget.dataset.index].temp])
        } else if (res.tapIndex === 2) {
          cos.deleteObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: that.data.upImgArr[e.currentTarget.dataset.index].Key
          }, () => {
            that.data.upImgArr.splice(e.currentTarget.dataset.index, 1)
            that.setData({
              upImgArr: that.data.upImgArr
            })
          })
        } else if (res.tapIndex === 1) {
          that.wxUploadImg(e.currentTarget.dataset.index)
        }
      }
    })
  },
  shopUserRefund () {
    app.wxrequest({
      url: app.getUrl().shopUserRefund,
      data: {
        uid: app.gs('userInfoAll').uid,
        oid: this.data.info.id,
        amount: this.data.info.total_fee,
        out_trade_no: this.data.info.out_trade_no,
        types: this.data.backType[this.data.backTypeIndex].t,
        reason: this.data.backReason[this.data.backReasonIndex].t,
        explain: this.data.content
      }
    }).then(() => {
      this.setData({
        apply: true
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({
      info: app.gs('backInfo')
    })
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
