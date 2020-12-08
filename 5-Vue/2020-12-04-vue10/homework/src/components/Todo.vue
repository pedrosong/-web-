<template>
    <div>
        <template v-for="(item) in todoItems" :key="item.id">
            <TodoItem :itemData="item"></TodoItem>
        </template>
    </div>
</template>

<script>
import { createStore } from "vuex";
import { computed } from "vue";
import TodoItem from "./TodoItem";
export default {
    components:{
        TodoItem
    },
    setup () {
        const store =createStore();
        const todoItems = computed(()=>{
            return store.state.todoItems
        })

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>