// pages/04-https/04-https.js
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
    /* request 发起 HTTPS 网络请求
    *   url 开发者服务器接口地址
    *   method HTTP 请求方法
    *     GET 默认
    *     POST
    *     ……	
    *   success 接口调用成功的回调函数	
    *   fail 接口调用失败的回调函数	
    *   complete 接口调用结束的回调函数（调用成功、失败都会执行）
    */
    
    /*根据id获取新闻信息 http://localhost:9000/getNews?id=1*/
    wx.showLoading({
      title: '数据加载中……',
    })
    wx.request({
      url: 'http://localhost:9000/getNews?id=1',
      success:(res)=>{
        console.log(res);
        
      },
      fail:(res)=>{
        console.log(res);
        
      },
      complete:()=>{
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    
    /* 根据id获取用户名 http://localhost:9000/getUserName*/
    wx.request({
      url: 'http://localhost:9000/getUserName',
      method:'POST',
      success:(res)=>{
        console.log(res);
        
      }
    })  
    
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