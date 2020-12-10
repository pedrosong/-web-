import { Component } from "react";
/*
mount 挂载阶段 --- 组件从初始化到真实渲染到DOM中
   - constructor 组件初始化
   - static getDerivedStateFromProps(props) 
      - 注意 this 问题
   - render
   - componentDidMount -- 处理副作用(请求)
update 更新阶段 --- 从setState之后组件开始更新，一直完成对真实的DOM节点更新
    - static getDerivedStateFromProps(props, state)
    - shouldComponentUpdate()  -- 判断是否更新
    - render()
    - getSnapshotBeforeUpdate() 
    - componentDidUpdate() -- 处理副作用(请求)
unmount 卸载阶段

副作用:
1. 获取真实 DOM 节点
2. 数据请求 

*/
class Child extends Component {
  // 将props 关联到state中
  static getDerivedStateFromProps(props){
      //console.log(this,props);该方法中没有 this
      console.log(1," 将props关联到state中");
      
      return { //该生命周期函数必须有返回值，返回值中保存的是从 props 中 要关联到 state 中数据
        info: "要关联的数据"
      }
  } 
  state={
    count: 1
  }
  shouldComponentUpdate(nextProps,nextState){
      //nextProps 更新后的props， nextState 更新后的state
      //console.log(nextState,this.state);
      console.log(2,"判断组件是否需要更新");
      return true; //返回值为 true 则继续执行更新，返回值为false 则不执行更新，后续的生命周期函数，也不会执行
  }
  getSnapshotBeforeUpdate(){
    //已经完成新的虚拟DOM的构建，但是还未更新真实DOM
    //用来获取更新前的DOM快照
    console.log(4,"已经完成新的虚拟DOM的构建，但是还未更新真实DOM");
    let box = document.querySelector("#box");
    return box.innerHTML;//改返回值会传递给componentDidUpdate的prevDOM参数
  }
  componentDidUpdate(prevProps,prevState,prevDOM){
    // console.log(prevDOM);
    console.log(5,"组件更新完成");
  }
  render() {
    console.log(3,"生成虚拟DOM",this.state);
    const {count} = this.state;
    return <div id="box">
        <p>{count}</p>
        <button onClick={()=>{
          this.setState({
            count: count + 1
          })
        }}>递增</button>
    </div> 
  }
  
}

export default Child;
