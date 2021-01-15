// pages/05-login/05-login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    type:''
  },

  /* getUserInfo 获取用户信息 {detail:{userInfo}}
  *   getCode() 获取code
  *   getOpenId() 获取openid
  *   putOpenId() 在第三方服务端将openid和业务id 相绑定
  *   setData() 更新数据
  */
  getUserInfo(res){
      // console.log(res);
      const {detail:{userInfo}}=res
      console.log('用户信息',userInfo);
      this.getCode()
        .then(code=>this.getOpenId(code))
        .then(openid=>this.putOpenId(openid,userInfo))
        .then(({type})=>{
          this.setData({
            userInfo,
            hasUserInfo:true,
            type
          })
        })
  },
  
  /* 1.获取微信登录凭证code 
  *   login() 调用接口获取登录凭证（code）
  */
  getCode(){
    return new Promise((resolve) => {
      wx.login({
        success:({code})=>{
          console.log('code',code);
          resolve(code)
        }
      })
    })
  },
  /* 2.在前端获取微信用户身份id，即发送 code 到后台换取 openId、sessionKey等信息*/
  getOpenId(code){
    const url=`https://api.weixin.qq.com/sns/jscode2session?appid=wx3b70d5eb01fb536c&secret=084e6e828ca65b61b009276c79b05cef&js_code=${code}&grant_type=authorization_code`
    //发起网络请求
    return new Promise((resolve)=>{
      wx.request({
        url,
        success:({data:{openid}})=>{
          console.log('openid',openid);
          resolve(openid)
          
        }
      })
    })
  },
  
  /* 3.把openId 传给第三方后端 */
  putOpenId(openid,userInfo){
    const data=Object.assign({openid},userInfo)
    return new Promise((resolve)=>{
      wx.request({
        url:'http://localhost:9000/putOpenId',
        method:'POST',
        data,
        success({data}) {
          resolve(data)
        }
      })
    })
  },
})