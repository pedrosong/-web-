/* 全局对象 */
const {globalData} = getApp()

/* webSocket 连接地址 */
const socketUrl='ws://192.168.43.198:8181'

/**
 * logged 是否登录
 * avatarUrl 头像
 * nickName 昵称
 * inroom 是否进入房间
 * players 玩家列表
 * role 房间角色
 *  1 房主
 *  2 房客
 */
Page({
  data: {
    logged: false,
    avatarUrl: null,
    nickName: null,
    inroom:false,
    players:[],
    role:0,
  },
  
  /* 页面加载 */
  onLoad: function() {
    console.log('---------onLoad----------')
    
    /* 连接websoket */
    wx.connectSocket({url:socketUrl})

    /* 如果用户授权小程序可以获取用户在微信中的信息，就获取用户在微信中的信息 */
    const pro1=this.getUserInfo()
    /* 获取openid */
    const pro2=this.getOpenid()
    /* 监听socket 连接成功事件 */
    const pro3=this.openSocket()
    
    /**
     * 当用户信息有了、openid有了，webSocket 连接成功了
     *  从promise 对象的回调参数里提取用户名、头像、openid
     *  setUserInfo() 更新用户信息
     *  sendUserInfo() 向服务端的webSocket发送openid和用户信息
     *  将openid 存储到全局对象上
     */
    Promise.all([pro1,pro2,pro3]).then((res)=>{
      const {nickName,avatarUrl}=res[0]
      const openid=res[1]
      this.setUserInfo({nickName,avatarUrl})
      this.sendUserInfo(openid,nickName,avatarUrl)
      globalData.openid=openid
    })

    /* webSocket 连接断开 */
    wx.onSocketClose(this.socketCloseFn)
  },

  /**
   * 页面显示时
   *  onSocketMessage()监听后端webSocket信息的回馈
   */
  onShow:function(){
    wx.onSocketMessage(this.socketMessageFn)
  },

  /**
   * onGetUserInfo 点击按钮登录,获取用户信息
   *  若用户没有登录，并且获取到了用户信息
   *    setUserInfo() 更新用户信息
   *    sendUserInfo() 向服务端的webSocket发送openid和用户信息
   */
  onGetUserInfo({detail:{userInfo}}) {
    if (!this.data.logged && userInfo) {
      const {nickName,avatarUrl}=userInfo
      this.setUserInfo(userInfo)
      this.getOpenid().then(openid=>{
        this.sendUserInfo(openid,nickName,avatarUrl)
        globalData.openid=openid
      })
    }
  },

  /**
   * 用js 方法获取用户信息
   *  getUserInfoSetting() 判断用户是否允许微信小程序获取用户在微信中的信息，比如昵称、头像……
   *  wx.getUserInfo() 获取用户信息
   */
  getUserInfo(){
    return new Promise(resolve=>{
      wx.getSetting({
        success: res => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success: ({userInfo}) => {
                if(userInfo){
                  resolve(userInfo)
                }
              }
            })
          }
        }
      })
    })
  },

  /* 更新用户信息 */
  setUserInfo({avatarUrl,nickName}){
    this.setData({
      logged: true,
      avatarUrl: avatarUrl,
      nickName: nickName
    })
  },

  /**
   * 进出房间的切换
   *  setData() 更新玩家在小程序端的inroom 状态
   *  updateInroom() 更新玩家在后端的inroom 状态
   */
  toggleRoom(){
    const inroom=!this.data.inroom
    this.setData({inroom})
    this.updateInroom(inroom)
  },

  /* 连接成功 */
  openSocket(){
    return new Promise(resolve=>{
      wx.onSocketOpen(()=>{
        resolve()
      })
    })
  },

  /**
   * 收到后端webSocket 发来的信息
   * 在返回数据中，method 是接口信息，data 是实际数据
   *  play：跳转页面
   *  update：更新玩家列表
   */
  socketMessageFn(res){
    console.log('------------onSocketMessage-------------')
    const {method,data}=JSON.parse(res.data)
    switch(method){
      case 'play':
        this.gotoGame()
        break
      case 'update':
        this.updatePlayers(data)
        break  
    }
  },
  /* 跳转到game 页 */
  gotoGame(){
    wx.navigateTo({
      url: '/pages/game/game',
    })
  },
  /**
   * 更新玩家列表
   *  如果玩家列表里包含当前玩家，更新玩家的房间角色，以及玩家列表
   *  否则，更新玩家列表
   */
  updatePlayers(players){
    const player=this.getPlayer(players);
    if(player){
      this.setData({
        role:player.role,
        players
      })
    }else{
      this.setData({players})
    }
  },
  /* 更新inroom */
  updateInroom(inroom){
    this.sendMsg('updateInroom',{inroom})
  },
  /* 判断当前玩家是否在玩家列表里 */
  getPlayer(players=this.data.players){
    for(let player of players){
      if(this.data.avatarUrl===player.avatarUrl){
        return player;
      }
    }
    return null;
  },
  /* 传递用户信息 */
  sendUserInfo(openid,nickName,avatarUrl){
    this.sendMsg(
      'pushUserInfo',
      {
        initial:true,
        openid,
        nickName,
        avatarUrl,
      }
    )
  },
  /* webSocket 连接断开 */
  socketCloseFn(){
    const players=this.data.players.filter(ele=>{
      return this.data.avatarUrl!==ele.avatarUrl;
    })
    this.setData({players})
  },

  /* 向后端发送开始游戏的信息 */
  play(){
    this.sendMsg('play')
  },

  /* 向后端发送信息 */
  sendMsg(method='',data={}){
    wx.sendSocketMessage({
      data:JSON.stringify({method,data})
    })
  },
  /* 通过云函数获取openid */
  getOpenid: function() {
    return new Promise((resolve,reject)=>{
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          resolve(res.result.openid)
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          reject(err)
        }
      })
    })
  },
})
