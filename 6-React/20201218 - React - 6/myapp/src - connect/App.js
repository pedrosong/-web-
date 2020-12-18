import { connect } from "react-redux";
function App(props) {
  //console.log(props);
  const {count,dispatch} = props;
  return <div>
      <p>{count}</p>
      <button onClick={()=>{
          dispatch({
              type:"ADD"
          })
      }}>递增</button>
      <button onClick={()=>{
           dispatch({
              type:"MIUS"
          })
      }}>递减</button>
  </div>
}
/*
  组件中想要使用或修改 redux 中的 state：
  1. connect 高级组件
  2. React Redux 的相关 hooks
*/
// let withReudx = connect(state=>({count:state.count})); // connect，可以接收一个类型为函数的参数，该函数作用为截取 state ，最终 withRedux 只会将截取出来的部分传递给组件。注意：该函数的返回值必须为对象
// export default withReudx(App);
export default connect((state)=>({count:state.count}))(App);