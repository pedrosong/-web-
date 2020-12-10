import { Component } from "react";
class Dl extends Component {
  state = {
    show: false
  }
  render() {
    const { data } = this.props;
    const { show } = this.state;
    return <dl className={`friend-group ${show ? "expanded" : ""}`}>
      <dt onClick={() => {
        this.setState({
          show: !show
        });
      }}>{data.title}</dt>
      {data.list.map((item, index) => {
        return <dd key={index}>{item.name}</dd>
      })}
    </dl>
  }
}

export default Dl;
