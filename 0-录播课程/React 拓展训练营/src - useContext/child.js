import React,{Fragment, useContext, useState} from 'react';
import context from "./store/index";
function Child(){
  let [age,setAge] = useState(9);
  const data = useContext(context);
  let {name,setName} = data;
  return <Fragment>
    <p>{age}</p>
    <p>{name}</p>
    <button
      onClick={()=>{
        age++;
        setAge(age);
      }}
    >修改age</button>
    <button onClick={()=>{
      setName("开课吧");
    }}>修改name</button>
  </Fragment>
}
export default Child;
