import { createStore } from "vuex";

export default createStore({
  state: {
    todoItems: [],
  },
  mutations: {
    addTodoItem(state, name) {
      state.todoItems.push({
        id: new Date().getTime(),
        name: name,
        complate: false,
        canShow: true,
      });
    },
    removeItem(state, id) {
      console.log("remove",  id);
      state.todoItems = state.todoItems.filter((item) => {
        return item.id != id;
      });
    },
    complateItem(state, id) {
      state.todoItems.map((item) => {
        if (item.id == id) {
          item.complate = true;
        }
      });
    },
    showAllItems(state) {
      state.todoItems.map((item) => {
        item.canShow = true;
      });
    },
    showActiveItems(state) {
      state.todoItems.map((item) => {
        if (item.complate == true) {
          item.canShow = false;
        } else {
          item.canShow = true;
        }
      });
    },
  },
  actions: {},
  modules: {},
});
