<template>
    <div>
        <TodoInput></TodoInput>
        <template v-for="(item) in todoItems" :key="item.id">
            <TodoItem :itemData="item"></TodoItem> <!--这个item是上面从todoItems遍历出来的，然后赋值给了itemData传递给了子组件-->
        </template>
        <TodoFilter></TodoFilter>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoFilter from './TodoFilter';
export default {
    components:{
        TodoItem,
        TodoInput,
        TodoFilter
    },
    setup () {
        const store =useStore();
        const todoItems = computed(()=>{
            return store.state.todoItems
        })
        return {todoItems}
    }
}
</script>

<style lang="scss" scoped>

</style>