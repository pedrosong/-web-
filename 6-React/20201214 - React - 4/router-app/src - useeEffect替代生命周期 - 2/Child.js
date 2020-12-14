import { useEffect, useRef, useState } from "react";
/*
useEffect 作用：副作用函数用来替代生命周期
  componentDidMount、componentDidUpdate 和 componentWillUnmount

*/
// 挂载时 和 更新时 都执行
function Child(){
  const [count,setCount] = useState(0);
  const [name,setName] = useState("a");
  const isMount = useRef(true);
  // 组件挂载时和count有变化时执行
  useEffect(()=>{
    console.log("请求数据","组件挂载时和count有变化时执行")
  },[count]);
  // 只在组件挂载阶段执行
  useEffect(()=>{
    console.log("只在挂载阶段执行");
    return ()=>{ // 只在组件卸载的时候
      console.log("组件的即将卸载");
    }
  },[]);
  // 当组件更新时
  useEffect(()=>{
   if(!isMount.current){
      console.log("组件更新")
   } else {
      isMount.current = false;
   }   
  })
  return <div>
      <p>{count}</p>
      <button onClick={()=>{
          setCount(count + 1);
      }}>递增</button>
      <p>{name}</p>
      <button onClick={()=>{
          setName(name + 1);
      }}>递增</button>
  </div>
}
export default Child;
