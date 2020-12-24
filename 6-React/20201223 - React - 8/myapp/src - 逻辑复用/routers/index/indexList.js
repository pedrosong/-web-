import { List } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoadTopics } from "../../store/action/topics";

function IndexList(props) {
  const {tab,page} = props;
  const {loading,data} = useSelector(state=>state.topics);
  const getData = useLoadTopics();
  useEffect(()=>{
    getData(page,tab);
  },[tab,page])
  return <List 
      className="index_list"
      loading={loading}
      dataSource={data}
      renderItem={item=>{
        return  <List.Item>{item.title}</List.Item>
      }}
  />
}
export default IndexList;