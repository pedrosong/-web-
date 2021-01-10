import React,{Fragment} from 'react';
import { useSelector, useDispatch } from './react-redux';
function Child(){
  let {name,age} = useSelector(state=>state);
  let dispatch = useDispatch();
  return <Fragment>
    <p>{age}</p>
    <p>{name}</p>
    <button
      onClick={()=>{
        age++;
        dispatch({
          type:"AGE",
          age
        })
      }}
    >修改age</button>
    <button onClick={()=>{
         dispatch({
          type:"NAME",
          name: "开课吧"
        })
    }}>修改name</button>
  </Fragment>
}
export default Child;
