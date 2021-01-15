// pages/03-feedback/03-feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paying:false,
  },

  /* 支付 */
  pay(){
    this.setData({
      paying:true
    })
    //模拟异步事件
    setTimeout(()=>{
      this.setData({
        paying:false
      })
      /* 支付成功 */
      // this.paySuc()
      /* 支付失败 */
      this.payFail()
    },1000)
  },

  /* 支付成功 */
  /* showToast 显示消息提示框
  *   title 提示的内容	
  *   icon 图标,如success
  *   duration 提示的延迟时间	
  */
  paySuc(){
    wx.showToast({
      title: '支付成功',
    })
  },

  /* 支付失败 */
  /* showModal 显示模态对话框
  *   title 提示的标题
  *   content 提示的内容
  *   confirmText 确认按钮的文字，最多 4 个字符
  *   cancelText 取消按钮的文字，最多 4 个字符
  *   success 接口调用成功的回调函数，返回res
  *     confirm 为 true 时，表示用户点击了确定按钮
  *     cancel	为 true 时，表示用户点击了取消按钮
  */
  payFail(){
    wx.showModal({
      title:'支付失败',
      content:'请使用其它方式支付',
      success:(res)=>{
        console.log(res);
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})