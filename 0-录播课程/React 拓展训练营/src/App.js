import React, {useState } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
function App() {
  let [data,setData] = useState([
    {
      id: 1,
      title: "开课吧"
    },{
      id: 2,
      title: "慧科集团"
    },{
      id: 3,
      title: "WEB 事业部"
    },{
      id: 4,
      title: "WEB 高级工程师"
    }
  ]);
  return <div className="wrap">
      <TransitionGroup
        appear={true}
      >
        {
          data.map(item=>{
              let {id,title} = item;
              return <CSSTransition
                  key={id}
                  timeout={1000}
                  onEntering={(node)=>{
                    node.style.opacity  = 1;
                  }}
                  onEntered={node=>{
                    node.style.cssText = "";
                  }}
              >
                <p className="p">{title} - <a
                  onClick={()=>{
                      setData(data.filter(itemData=>(itemData.id!==id)));
                  }}
                >删除</a></p>
              </CSSTransition>
          })
        }
      </TransitionGroup>
      <button onClick={()=>{
        data.push({
          id: Date.now(),
          title: "这是一个新加项 - " +  data.length
        });
        setData([...data]);
      }}>添加</button>
  </div>;
}

export default App;
