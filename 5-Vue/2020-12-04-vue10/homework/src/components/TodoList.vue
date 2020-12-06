<template>
  <div>
    <ul>
      <li
        v-for="(todoItem, index) in todoItems"
        v-bind:key="index"
        :class="{ style: todoItem.done }"
      >
        {{ todoItem.item }}
        <el-button @click="handleDone(index)">done</el-button>
        <el-button @click="handleRemove(index)">Remove</el-button>
      </li>
    </ul>
    <el-button @click="moveToFinshBox">active</el-button>
    <el-button @click="moveToTodoItem">all</el-button>
  </div>
</template>

<script>
import { useStore } from "vuex";
// import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const todoItems = store.state.todoItems;
    // 处理完成事件
    const handleDone = (index) => {
      store.commit("finshTodoItems", index);
    };
    // 处理移除事件
    const handleRemove = (index) => {
      store.commit("removeTodoItems", index);
    };

    //active
    const moveToFinshBox = () => {
      // console.log(store)
      store.commit("active");
    };

    //all
    const moveToTodoItem = () =>{
      store.commit("all")
    }

    return {
      todoItems,
      handleDone,
      handleRemove,
      moveToFinshBox,
      moveToTodoItem
    };
  },
};
</script>

<style>
.style {
  text-decoration: line-through;
}
</style>