/**
 * Created by JWQ on 2019/2/20.
 */
wx.cloud.init({
  traceUser: true
})

module.exports = {
  getShareText () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getShareText',
        data: {},
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getUserOperation () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getUserOperation',
        data: {},
        success (res) {
          resolve(res.result)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getMoney () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getMoney',
        data: {},
        success (res) {
          resolve(res.result)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getShareUrl () {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'shareUrl',
        data: {},
        success (res) {
          resolve(res.result)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  getFreight () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://c.jiangwenqiang.com/lqsy/freight.json',
        success (res) {
          if (res.statusCode !== 200) {
            wx.cloud.callFunction({
              name: 'getFreight',
              data: {},
              success (res) {
                resolve(res.result)
              },
              fail (err) {
                reject(err)
              }
            })
          } else {
            resolve(res.data.data)
          }
        },
        fail () {
          wx.cloud.callFunction({
            name: 'getFreight',
            data: {},
            success (res) {
              resolve(res.result)
            },
            fail (err) {
              reject(err)
            }
          })
        }
      })
    })
  }
}
