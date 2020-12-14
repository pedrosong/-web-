/*
  function 组件名(props){
    return ReactNode
  }
  函数式组件：react 16.7 之前也叫作无状态或纯渲染组件
*/
function Child(props) {
    console.log(props);
    const {count,setCount} = props;
    return <div>
        <div>{count}</div>
        <button onClick={()=>{
            setCount(count + 1);
        }}>递增</button>
    </div>
}

export default Child;