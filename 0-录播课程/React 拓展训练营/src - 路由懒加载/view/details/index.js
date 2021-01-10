import React, { Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetDetailData } from "../../store/action";
import { useSelector } from "react-redux";
function DetailView(){
    const {id} = useParams();
    const getDetailData = useGetDetailData();
    const history = useHistory();
    const {data,loading} = useSelector(state=>state.topic);
    const {title="文章标题",content="暂无内容"} = data;
    useEffect(()=>{
        getDetailData(id);
    },[id]);
    return <Fragment>
        <header className="header">
            <a 
                className="back-btn"
                onClick={()=>{
                    if(history.length>2){
                        history.goBack(); 
                    } else {
                        history.push("/")
                    }
                    
                }}
            >&lt; 返回</a>
            <h1 className="title">{title}</h1>
        </header>
        <div className="tipic">
            {
                loading?
                    <p className="info">数据获取中</p>
                    :
                    <div dangerouslySetInnerHTML={{__html:content}}></div>
            }
        </div>
    </Fragment>
}
export default DetailView;