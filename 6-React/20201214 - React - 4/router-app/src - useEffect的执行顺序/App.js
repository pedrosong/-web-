import { useEffect, useState } from "react";
/*
useEffect：副作用 hook，用于替代生命周期
   useEffect(function{ ---> effect 函数
      return ()=>{ ---> 返还函数

      }
   },[依赖参数])
*/
/*
组件挂载阶段：
   1. 执行 useEffect 将 effect 函数存入队列
   2. 挂载完成之后，执行 effect 函数队列，并获取返回函数存入队列
组件更新阶段：
   1. 执行 useEffect 将 effect 函数存入队列
   2. 更新完成之后，先将返回函数队列执行: 在执行时会观察该 effect 是否有依赖参数，无依赖数据，直接执行，有依赖则追踪依赖是否改变，改变才执行，不变则不执行
   3. 执行新的  effect 函数存入队列: 在执行时会观察该 effect 是否有依赖参数，无依赖数据，直接执行，有依赖则追踪依赖是否改变，改变才执行，不变则不执行
卸载阶段：
   1. 将返回函数队列执行

*/
function App() {
  const [count,setCount] = useState(0);
  const [name,setName] = useState("a");
  useEffect(()=>{
    console.log("effect-1");
    return ()=>{
      console.log("effect 返还函数 - 1");
    }
  })
  useEffect(()=>{
    console.log("effect-2");
    return ()=>{
      console.log("effect 返还函数 - 2");
    }
  },[])
  useEffect(()=>{
    console.log("effect-3");
    return ()=>{
      console.log("effect 返还函数 - 3");
    }
  },[count])
  console.log("render");
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
export default App;
