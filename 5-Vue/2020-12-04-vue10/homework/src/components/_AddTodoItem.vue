<template>
    <div>
        <input  type="input" @keyup.enter="handleInput" v-model="newTodo">
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    setup () {
        const store = useStore();
        let newTodo = ref("");
        const handleInput = () => {
            store.commit("addTodoItems",newTodo)

        }

        return { handleInput,newTodo }
    }
}
</script>

<style>

</style>