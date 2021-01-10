import React,{Component, Fragment} from 'react';
class Child extends Component {
  state= {
    age:9
  }
  // 在 React 17 之后还想要使用 前边要加 UNSAFE_
  // UNSAFE_componentWillMount(){
  //   console.log("组件即将挂载");
  // }
  componentWillMount(){
      console.log("组件即将挂载");
  }
  // 注意组件内新旧生命周期不能同时使用，如果使用了新增的生命周期函数如getSnapshotBeforeUpdate，就不能使用 react 16.3 之前被废除的生命周期
  // getSnapshotBeforeUpdate(){
  //   console.log(111);
  //   return "哈哈"
  // }
  // componentDidUpdate(){

  // }
  render(){
    console.log("生成VDOM");
    let {name,setName} = this.props;
    let {age} = this.state;
    return <Fragment>
        <p>{age}</p>
        <p>{name}</p>
        <button
          onClick={()=>{
            this.setState({
              age:++age
            })
          }}
        >修改age</button>
        <button onClick={()=>{
          setName("开课吧");
        }}>修改name</button>
    </Fragment>
  }
}

export default Child;
