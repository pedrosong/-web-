import { Component } from "react";
import context, { Consumer } from "./context";
// class SubChild extends Component {
//   render() {
//     // const {count,name} = this.props;
//     // console.log(this.props);
//     return <Consumer>
//       {(context) => {
//         const { count, name } = context;
//         return <div>
//           <p>count:{count}</p>
//           <p>name:{name}</p>
//         </div>
//       }}
//     </Consumer>
//   }
// }
class SubChild extends Component {
  static contextType = context;// contextType ，告诉当前组件，当前组件中 context 值，从哪个 context 中获取。
  render() {
    const { count, name, setCount } = this.context;
    return <div>
      <p>count:{ count}</p>
      <p>name:{name }</p>
      <button onClick={()=>{
        setCount(count +1);
      }}>递增</button>
    </div>
  }
}

export default SubChild;
