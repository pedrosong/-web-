export default function (topic={
    data:{},
    loading: true
},action){
    switch(action.type){
        case "TOPIC_LOADING":
            return {
                data:{},
                loading: true
            }
        case "TOPIC_LOAD":
            return {
                data:action.data,
                loading: false
            }
    }
    return topic;
}