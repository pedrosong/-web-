import axios from "axios";
import { useDispatch } from "react-redux";
const http = axios.create({
    baseURL: "https://cnodejs.org/api/v1"
});

function useGetListData(){
    const dispatch = useDispatch();
    return (tab,page)=>{
        dispatch({
            type:"LIST_LOADING"
        })
        http.get(`/topics?tab=${tab}&page=${page}&limit=10`)
            .then((res)=>{
                dispatch({
                    type:"LIST_LOAD",
                    data: res.data.data
                })
            });
    }
}
function useGetDetailData(){
    const dispatch = useDispatch();
    return (id)=>{
        dispatch({
            type:"TOPIC_LOADING"
        })
        http.get(`/topic/`+id)
            .then((res)=>{
                dispatch({
                    type:"TOPIC_LOAD",
                    data: res.data.data
                })
            });
    }
}

export {useGetListData,useGetDetailData};
