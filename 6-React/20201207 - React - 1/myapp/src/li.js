import { Component } from "react";
class Li extends Component {
  state={
    show: false
  }
  changeShow=()=>{
    const {show} = this.state;
    this.setState({
        show:!show
    });
  };
  render() {
    //console.log(this.props);
    const {title,data} = this.props;
    const {show} = this.state;
    return <li className={show?"subList-show":""}>
        <a onClick={this.changeShow}>{title}</a>
        <ul className="subList">
          {data.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
      </li>
  }
}
export default Li;