<template>
<TodoList></TodoList>
<AddTodoItem></AddTodoItem>
</template>

<script>
import TodoList from "./components/TodoList"
import AddTodoItem from './components/AddTodoItem';
export default {
  name: 'App',
  components: {
    TodoList,
    AddTodoItem,
  },
  setup(){

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
