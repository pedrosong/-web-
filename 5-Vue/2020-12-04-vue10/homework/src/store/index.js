import {
    createStore
} from "vuex";


export default createStore({
    state: {
        todoItems: [{
            item: "吃早饭",
            done: false,
        }, {
            item: "吃午饭",
            done: true,
        }, {
            item: "吃晚饭",
            done: false,
        }, {
            item: "学习",
            done: true,
        }],
        finshedItems: []
    },
    mutations: {
        addTodoItems(state, payload) {
            let newTodo = {
                item: payload,
                done: false
            }
            state.todoItems.push(newTodo)
            newTodo = ""
        },
        removeTodoItems(state, payload) {
            state.todoItems.splice(payload, 1)
        },
        finshTodoItems(state, payload) {
            state.todoItems[payload].done = true
        },
        active(state) {
            state.todoItems.forEach(item => {
                if (item.done == true) {
                    state.finshedItems.push(item);
                    state.todoItems.splice(state.todoItems.indexOf(item), 1)
                }
            })
        },
        all(state) {
            state.finshedItems.forEach(item => {
                state.todoItems.push(item);
                state.finshedItems.splice(state.finshedItems.indexOf(item), 1)
            })
        }
    }
})