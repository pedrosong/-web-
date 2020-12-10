import { Component } from "react";
/*
mount 挂载阶段 --- 组件从初始化到真实渲染到DOM中
   - constructor 组件初始化
    - static getDerivedStateFromProps(props) 
      - 注意 this 问题
    - render
    - componentDidMount -- 处理副作用(请求)
update 更新阶段 --- 从setState之后组件开始更新，一直完成对真实的DOM节点更新
unmount 卸载阶段
*/
class Child extends Component {
  constructor(props){
      super(props);
      console.log(0,"组件初始化");
  }
  // 将props 关联到state中
  static getDerivedStateFromProps(props){
      //console.log(this,props);该方法中没有 this
      console.log(1," 将props 关联到state中");
      return { //该生命周期函数必须有返回值，返回值中保存的是从 props 中 要关联到 state 中数据
        info: "要关联的数据"
      }
  } 
  state={
    count: 1
  }
  componentDidMount(){
    console.log(3,"组件挂载完成，虚拟DOM，已经生成了真实DOM");
  }
  render() {
    console.log(2,"生成虚拟DOM",this.state);
    const {count} = this.state;
    return <div>
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
