import { useEffect, useRef, useState } from "react";
/*
useRef 用法和作用类似于 createRef
1. 获取 DOM 和 组件 实例
2. 跨更新阶段传递数据
*/
function Child(){
  const [count,setCount] = useState(0);
  const [name,setName] = useState("a");
  const wrap = useRef();
  const prevCount = useRef(count); // 当 Ref 中保存的是数据时，数据并不会随着组件的更新自动更新
  useEffect(()=>{
    //console.log(wrap.current.innerHTML);
    console.log(prevCount.current);
    prevCount.current = count;
  })
  return <div ref={wrap}>
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
