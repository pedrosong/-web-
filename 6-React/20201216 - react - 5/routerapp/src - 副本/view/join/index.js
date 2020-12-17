const { Fragment } = require("react");

function JoinPage(props) {
  //console.log(props);
  const {history} = props;
  //console.log(history.length);
  return <Fragment>
      <h1>加入视图</h1>
      <button onClick={()=>{
        history.goForward();
      }}>前进</button>
      <button onClick={()=>{
        history.goBack();
      }}>后退</button>
      <button onClick={()=>{
        history.go(-3);
      }}>跳转多项</button>
      <button onClick={()=>{
        history.push("/about",{
          info:"加入传递来的信息"
        });
      }}>关于</button>
  </Fragment>
}
export default JoinPage;