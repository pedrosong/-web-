// pages/03-pageScroll/03-pageScroll.js

/**
 * 模拟后端数据库：
 *  collection 新闻列表的数据集合
 *  每隔10秒钟，以前置的方式，向新闻列表添加20 条新闻
 */
/* const collection=[]
addNews()
setInterval(function(){
  addNews()
},10000)
function addNews(){
  const ind=collection.length+1
  const len=ind+20
  for(let i=ind;i<len;i++){
    collection.unshift({id:i})
  }
  console.log('collection',collection);
} */


Page({
  data: {
    newsList: [],
  },
  /**
   * 页面加载
   *  从后端获取最新的10条新闻
   */
  onLoad(){
    const newsList=this.getNews()
    this.setData({newsList})
  },
  /* 下拉更新 
  *   从后端获取最新的10条新闻
  */
  onPullDownRefresh(){
    const newsList=this.getNews()
    this.setData({newsList})
  },
  /* 上拉加载 
  *   获取当前的newsList 数据
  *   获取newsList 中最后一条新闻的id
  *   基于新闻id，向后端请求其后面的10条新闻
  *   若请求结果不为空，更新新闻列表
  */
  onReachBottom(){
    const newsList=this.data.newsList
    const {id}=newsList.pop()
    const list=this.getNews(id)
    if(list.length){
      this.setData({
        newsList:[...newsList,...list]
      })
    }
  },

  /**
   * 模拟后端获取数据的方法：
   *  基于新闻的id，获取其后面10 条新闻
   */
  getNews(newsId,pageSize=10){
    let ind=0;
    for(let news of collection){
      if(news.id===newsId){
        ind=collection.indexOf(news)
        break
      }
    }
    return collection.slice(ind,ind+pageSize)
  }
})
