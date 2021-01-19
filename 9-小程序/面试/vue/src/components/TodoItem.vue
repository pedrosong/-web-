<template>
    <div>
        <button @click="addTodoItem">{{item}}</button>
    </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
    props:['itemData'],//这里声明在父级传入的组件
    setup (props) {
        const store = useStore()
        const item = {
            id:1,
            name:'tom'
        }
        console.log(props)
        function addTodoItem(){
            store.commit('addTodoItem',item.name)
        }

        return {
            addTodoItem,
            item
        }
    }
}
</script>

<style lang="scss" scoped>

</style>