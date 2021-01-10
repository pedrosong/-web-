import React, { useEffect, Fragment } from 'react';
import { useParams,Link } from 'react-router-dom';
import { useGetListData } from '../../store/action';
import { useSelector } from 'react-redux';
function List() {
  let {type="all",page=1} = useParams();
  let getListData = useGetListData();
  let {data,loading} = useSelector(state=>state.list);
  useEffect(()=>{
    getListData(type,page);
  },[type,page]);
  return (<Fragment>
      {
        loading?
            <p className="info">数据获取中</p>
            :
            (
                data.length>1?
                    <ul className="list">
                        {data.map(item=><li key={item.id}><Link to={`/detail/${item.id}`}>{item.title}</Link></li>)}
                    </ul>
                    :
                    <p className="info">暂无数据</p>
            )
      }
  </Fragment>);
}
export default List;
