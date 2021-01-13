// components/floatball/floatball.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:'string',
      value:'悬浮球'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap(){
      this.triggerEvent('tapBall',{tap:true})
    }
  }
})
