// pages/07-scanCode/07-scanCode.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code:0
  },
  /**
   * scanCode 微信扫码
   *  success 扫码成功后的回调函数
   */
  getScancode: function() {
    wx.scanCode({
      success:({result})=>{
        console.log(result);
        
        const code=this.getCode(result)
        this.setData({code})
      }
    })
  },
  /* 从url 中提取桌号 */
  getCode(url) {
    return url.split('?')[1].split('=')[1];
  }
})