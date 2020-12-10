<template>
  <div v-show="todoItemsLength">
    <el-button class="btn" type="primary" size="middle" @click="onShowActive" round>showActive</el-button>
    <el-button class="btn" type="primary" size="middle" @click="onShowAll" round>showAll</el-button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore} from "vuex"
export default {
    setup(){
        const store = useStore();
        const todoItemsLength = computed(()=>{
            return store.state.todoItems.length
        })
        function onShowActive(){
            store.commit("showActiveItems")
        }
        function onShowAll(){
            store.commit("showAllItems")
        }
        return{
            onShowActive,
            onShowAll,
            todoItemsLength
        }
    }
}
</script>
<style scoped>
    .btn{
        width: 150px;
    }
</style>