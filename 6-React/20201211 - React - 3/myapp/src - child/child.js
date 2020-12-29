const { Component } = require("react");
class Child extends Component {
  render(){
    console.log(this.props);
    // this.props.children[3]();
    return <div>
        <h1>children</h1>
        {this.props.children.slice(0,3)}
    </div>
  }
}

export default Child;