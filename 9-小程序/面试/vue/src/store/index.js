import {createStore} from "vuex"


export default createStore({
    state:{
        todolist:[]
    },
    mutations:{
        addTodoItem(state,name){
            state.todolist.push({
                id:Date.now(),
                name,
                complate:false,
                canShow:true
            })
        }
    },
    actions:{},
    modules:{}
})