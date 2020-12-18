import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListData } from "./actions";
function List() {
    const {data,loading} = useSelector(state=>state.list);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getListData);
    },[])
    return <ul>
      {loading ?
        "数据请求中" 
        :data.map(item=><li key={item.id}>{item.title}</li>)
      }
    </ul>
}

export default List;