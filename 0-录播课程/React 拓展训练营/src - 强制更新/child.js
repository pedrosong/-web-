import React,{Component, Fragment} from 'react';
let age = 9;
class Child extends Component {
  render(){
    let {name,setName} = this.props;
    return <Fragment>
        <p>{age}</p>
        <p>{name}</p>
        <button
          onClick={()=>{
            age++;
            // 强制更新
            this.forceUpdate();
          }}
        >修改age</button>
        <button onClick={()=>{
          setName("开课吧");
        }}>修改name</button>
    </Fragment>
  }
}

export default Child;
