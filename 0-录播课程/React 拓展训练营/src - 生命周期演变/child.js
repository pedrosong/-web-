import React,{Component, Fragment} from 'react';
class Child extends Component {
  state= {
    age:9
  }
  componentWillReceiveProps(newProps){
      console.log("父组件更新引起子组件更新 newProps 中，存储新的 props");
  }
  shouldComponentUpdate(){
      return true;
  }
  componentWillUpdate(newProps,newState){
    console.log("组件即将更新");
  }
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
