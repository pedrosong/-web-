// pages/06-storage/06-storage.js
Page({

  /**
   * 页面的初始数据
   *  list商品列表
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   *  getStorageSync('list') 同步获取本地缓存的list数据
   *  若list 存在，就setData
   *  getGoods()异步请求最新的商品信息
   *    setData 最新数据
   *    setStorageSync('list', list) 把最新数据放到缓存中
   */
  onLoad: function (options) {
    const list=wx.getStorageSync('list')
    if(list){
      this.setData({list})
    }
    this.getGoods()
      .then(list=>{
        this.setData({list})
        wx.setStorageSync('list', list)
      })
  },

  /**
   * 向后端请求商品列表
   *  模拟https请求，获取最新的数据
   */
  getGoods(){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve([
          {id:1,name:Math.random()},
          {id:2,name:Math.random()},
          {id:3,name:Math.random()},
          {id:4,name:Math.random()},
          {id:5,name:Math.random()},
          {id:6,name:Math.random()},
        ])
      },3000)
    })
  },
})