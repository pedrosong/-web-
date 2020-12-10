import { Component } from "react";
import SubChild from "./subchild";
class Child extends Component {
  render() {
    return <div>
        <h2>数据修改</h2>
        {/* <SubChild 
            count={this.props.count}
            name={this.props.name}
        /> */}
        <SubChild 
          {...this.props}
        />
    </div>
  }
}

export default Child;
