//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    new Promise((resolve) => {
      wx.login({
        success({code,errMsg}) {
          // 发送 code 到后台换取 openId, sessionKey, unionId
          if (code) {
            resolve(code)
          } else {
            console.log('登录失败！' + errMsg)
          }
        }
      })
    }).then((code) => {
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx3b70d5eb01fb536c&secret=9ff6b5ecf89967d3cc1420bd2c38dbad&js_code=${code}&grant_type=authorization_code`
      //发起网络请求
      return new Promise((reflect)=>{
        wx.request({
          url,
          success(res) {
            console.log(res)
            return reflect(res.data)
          }
        })
      })
    }).then(({expires_in,openid,session_key}) => {
      console.log({expires_in,openid,session_key})
    })
  },
  globalData: {
    userInfo: null
  },
})



function getOpenId(res) {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx3b70d5eb01fb536c&secret=9ff6b5ecf89967d3cc1420bd2c38dbad&js_code=${code}&grant_type=authorization_code`
  //发起网络请求
  wx.request({
    url,
    success(res) {
      return res
    }
  })
}