import {useState } from "react";
import Child from "./Child";
function App() {
  const [show,changeShow] = useState(true)
  return <div>
    {show?<Child />:""}
    <button onClick={()=>{
      changeShow(!show)
    }}>显示/隐藏</button>
  </div>
}
export default App;
