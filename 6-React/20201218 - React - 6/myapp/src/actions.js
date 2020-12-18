function getListData(dispatch,getState) {
  console.log("正在发起数据请求");
  console.log(getState());
  fetch('http://localhost:8080/api/topics').then(res=>res.json())
  .then(res=>{
     
      dispatch({
        type: "LIST_LOAD",
        data:res.data
      })
      console.log("数据请求成功");
  })
}

export {getListData}