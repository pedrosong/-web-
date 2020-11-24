<template>
  <div id="app">
    <Add></Add>
    <Minus></Minus>
  </div>
</template>

<script>
import Add from './components/Add';
import Minus from './components/Minus';
export default {
  name: 'App',
  components: {
    Add,
    Minus
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
