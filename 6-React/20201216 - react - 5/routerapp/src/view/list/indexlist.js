import {useHistory, useLocation, useParams, useRouteMatch, withRouter} from "react-router-dom";
import data from "../../data";
const limit = 5;
/*
  根据动态路由获取路由信息
*/
// function List(props) {
//   console.log(props);
//   return <ul>列表内容</ul>
// }

/*
  如何在非路由组件中获取路由参数
  - 高阶路由 
      withRouter 传入普通组件，并返回一个新组件，调用新组件时，新组件会调用传入的组件，并将路由信息传递进去
  - hooks
    - useHistory
    - useLocation
    - useParams
    - useRouteMatch
*/
// const NewList = withRouter(List);
// export default NewList;
//export default withRouter(List);

function List() {
  // console.log(useHistory());
  // console.log(useLocation());
  // console.log(useParams());
 // console.log(useRouteMatch());
  const {t="good",p="1"} = useParams();
  let start = (Number(p) - 1) * limit;
  let end = start + limit;
  let nowData = data[t].filter((item,index)=>{
      return index>=start&&index<end;
  });
  /*
    1: 0,1,2,3,4
    2: 5,6,7,8,9
    3: 10,11,12,13,14
  */
  return <ul>{
      nowData.length > 0 ?  nowData.map(item=><li key={item.id}>{item.title}</li>):"暂无数据"
  }</ul>
}

export default List;