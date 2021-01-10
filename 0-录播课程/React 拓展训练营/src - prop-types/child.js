import React,{Component, Fragment, createRef} from 'react';
import PropTypes from "prop-types";
let age = 9;
class Child extends Component {
  age_p = createRef();
  name_p = createRef();
  componentDidMount(){
      //console.log(this.age_p)
  }
  render(){
    let {name,setName} = this.props;
    return <Fragment>
        <p ref={(dom)=>{
          //console.log(dom);
          this.age_p.current = dom;
        }}>{age}</p>
        <p ref={this.name_p}>{name}</p>
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
Child.defaultProps = {
  name:"开课吧"
}
Child.propTypes = {
  name:(props, propName, componentName)=>{
    console.log(props, propName, componentName);
    if(typeof props[propName] !== "string"){
      return new Error('Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.');
    }
  },
  setName: PropTypes.func
};
export default Child;
