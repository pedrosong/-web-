// pages/03-page/03-page.js
let time=null
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    time=setTimeout(()=>{
      console.log('一级页信息');
      
    },3000)
  },

  /* 去二级页 */
  toSecPage(){
    wx.navigateTo({
      url:'../03-secPage/03-secPage'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
    clearInterval(time)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('二级页页面卸载');
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage');
    
  }
})