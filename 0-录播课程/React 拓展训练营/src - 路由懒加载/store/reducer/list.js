export default function (list={
    data:[],
    loading: true
},action){
    switch(action.type){
        case "LIST_LOADING":
            return {
                data:[],
                loading: true
            }
        case "LIST_LOAD":
            return {
                data:action.data,
                loading: false
            }
    }
    return list;
}