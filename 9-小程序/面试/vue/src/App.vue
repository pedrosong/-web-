<template>
  <todo-item></todo-item>
</template>

<script>
import TodoItem from "./components/TodoItem";
export default {
  name: 'App',
  components: {
    TodoItem
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
