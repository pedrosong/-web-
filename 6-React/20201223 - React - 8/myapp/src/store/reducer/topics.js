function topics(topics={
  data:[],
  loading:true
},action) {
  switch (action.type) {
    case "TOPICS_LOADING":
      return {
        data:[],
        loading:true
      }
    case "TOPICS_LOAD":
        return {
          data:action.data,
          loading:false
        }
  }
  return topics;
}

export default topics;