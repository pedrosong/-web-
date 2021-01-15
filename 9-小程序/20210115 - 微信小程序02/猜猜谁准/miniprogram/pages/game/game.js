/* 游戏倒计时提示数组 */
const countTips=['3','2','1','GO!']
/* 倒计时定时器 */
let countInter=null;
/* 游戏进度定时器 */
let progressInter=null;
/* 游戏时长 */
const totalTime=4000
const halfTime=totalTime/2
/* 游戏开始时间 */
let startTime=null;

/**
 * progress 游戏进度
 * counting 游戏倒计时中
 * playing 游戏进行中
 * gameOver 游戏结束
 * countTip 倒计时提示内容
 * diff 准确度，玩家成绩
 * players 玩家列表
 */
Page({
  data: {
    progress:0,
    counting:true,
    playing:false,
    gameOver:false,
    countTip:countTips[0],
    diff:halfTime,
    players:[]
  },

  /**
   * 页面加载
   *  countDown() 开始倒计时
   *  onSocketMessage() 监听后端webSocket信息的回馈
   */
  onLoad: function() {
    this.countDown()
    wx.onSocketMessage(this.socketMessageFn)
  },
  /**
   * 倒计时
   *  num 记录倒计时定时器执行次数
   *  为countInter 建立setInterval 计时器
   *    num 递增
   *    若num 小于倒计时提示数组的长度
   *      基于num 更新计时提示countTip
   *      若num等于3
   *        beginGame() 开始游戏
   *    否则
   *      finishCount() 结束倒计时
   */
  countDown(){
    let num=0;
    countInter=setInterval(()=>{
      num++;
      if(num<countTips.length){
        this.setData({
          countTip:countTips[num]
        })
        if(num===3){
          this.beginGame()
        }
      }else{
        this.finishCount()
      }
    },1000)
  },
  /**
   * 开始游戏
   *  记录游戏开始时间 startTime
   *  更新playing 数据为true
   *  setProgress() 更新进度条
   */
  beginGame(){
    startTime=new Date()
    this.setData({
      playing:true
    })
    this.setProgress()
  },
  /**
   * 结束倒计时
   *  更新counting为false，结束倒计时
   *  清理倒计时定时器
   */
  finishCount(){
    this.setData({
      counting:false
    })
    clearInterval(countInter);
  },

  /**
   * 点击“点一下”按钮
   *  diff 计算当前时间减去开始游戏时间，再减去游戏时长的一半，取绝对值
   *  结束游戏
   */
  tap(){
    const now=new Date()
    const diff=Math.abs(now-startTime-halfTime)
    this.finishGame(diff)
  },

  /**
   * 进度条走起
   *  为progressInter 建立setInterval 计时器
   *    通过时差和总游戏时长的比值计算进度百分比
   *    若进度大于100
   *      让进度等于100
   *      结束游戏
   *    更新progress 进度数据
   */
  setProgress(){
    progressInter=setInterval(()=>{
      const now=new Date()
      const diff=now-startTime
      let progress=100*diff/totalTime
      if(progress>100){
        progress=100
        this.finishGame()
      }
      this.setData({progress})
    },20)
  },

  /**
   * 结束游戏
   *  更新playing、gameOver、diff数据
   *  清理进度条计时器
   *  updateDiff() 向后端webSocket 传递当前玩家的diff 数据
   */
  finishGame(diff=halfTime){
    this.setData({
      playing:false,
      gameOver:true,
      diff
    })
    clearInterval(progressInter)
    this.updateDiff(diff)
  },

  /**
   * updatePlayer：向后端webSocket 传递当前玩家的diff 数据
   */
  updateDiff(diff){
    wx.sendSocketMessage({
      data:JSON.stringify({
        method:'updatePlayer',
        data:{diff}
      })
    })
  },
  /**
   * 当收到后端信息
   *  update：更新玩家列表
   */
  socketMessageFn(res){
    console.log('------------onSocketMessage-game-------------')
    const {method,data}=JSON.parse(res.data)
    switch(method){
      case 'update':
        this.setData({players:data})
        break  
    }
  },
})
