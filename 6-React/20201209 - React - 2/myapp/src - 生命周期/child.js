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
    - componentWillUnmount 组件即将卸载

副作用:
1. 获取真实 DOM 节点
2. 数据请求 

*/
class Child extends Component {
  state={
    count: 1
  }
  componentDidMount(){
    let getSize = ()=>{
      let size = document.querySelector("#size");
      size.innerHTML = window.innerWidth;
    }
    getSize();
    window.onresize = getSize;
  }
  componentWillUnmount(){
    window.onresize = null;
  }
  render() {
    const {count} = this.state;
    return <div id="box">
        <p>{count}</p>
        <button onClick={()=>{
          this.setState({
            count: count + 1
          })
        }}>递增</button>
        <div id="size">0</div>
    </div> 
  }
  
}

export default Child;
