import React,{Component, Fragment, createRef} from 'react';
import PropTypes from "prop-types";
let age = 9;
class Child extends Component {
  render(){
    let {name,setName} = this.context;
    return <Fragment>
        <p>{age}</p>
        <p>{name}</p>
        <button
          onClick={()=>{
            age++;
            this.forceUpdate();
          }}
        >修改age</button>
        <button onClick={()=>{
          setName("开课吧");
        }}>修改name</button>
    </Fragment>
  }
}
// 定义组件的 contextTypes 属性来接收父级传递下来的信息
Child.contextTypes = {
    name: PropTypes.string,
    setName: PropTypes.func
};
export default Child;
