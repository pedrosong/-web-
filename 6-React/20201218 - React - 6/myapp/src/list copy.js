import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// http://localhost:8080/api/topics
// 异步 action 
// dispatch(action) --> reducer
//dispatch(异步action) --> 请求数据 --> dispatch(同步)-->reducer 
/*
  使用了 Redux Thunk 中间件之后，dispatch 可以接收一个类型为函数的 action
  对象 action：会直接调用 reducer 修改
  函数 action：会执行这个函数 
*/
function List() {
    const {data,loading} = useSelector(state=>state.list);
    const dispatch = useDispatch();
    useEffect(()=>{
      // dispatch({
      //   type: "LIST_LOAD",
      //   data:[{
      //     id:1,
      //     title:1
      //   }]
      // })
      dispatch(function(dispatch,getState) {
        //console.log("函数action")
        console.log("正在发起数据请求");
        fetch('http://localhost:8080/api/topics').then(res=>res.json())
        .then(res=>{
           
            dispatch({
              type: "LIST_LOAD",
              data:res.data
            })
            console.log("数据请求成功");
        })
      })
    },[])
    return <ul>
      {loading ?
        "数据请求中" 
        :data.map(item=><li key={item.id}>{item.title}</li>)
      }
    </ul>
}

export default List;