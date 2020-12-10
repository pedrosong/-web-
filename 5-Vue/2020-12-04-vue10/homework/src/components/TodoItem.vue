<template>
    <div v-show="item.canShow" :style="item.complate? 'background-color: #ddd;':''">
        <span :style="item.complate? 'text-decoration:line-through':''" >{{item.name}}</span>
        <el-button class="btn" type="success" size="mini" round @click="onComplate">complate</el-button>
        <el-button class="btn" type="danger" size="mini" round @click="onRemove">remove</el-button>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { readonly } from "vue";
export default {
    props:['itemData'],  //只有注册了这个props，子组件才能拿到这个值
    setup (props) {
        const store = useStore();
        const item = readonly(props.itemData)

        function onComplate(){
            store.commit("complateItem",item.id)
        }
        function onRemove(){
            store.commit("removeItem",item.id)
        }
        return {item,onComplate,onRemove}
    }
}
</script>

<style lang="scss" scoped>

</style>