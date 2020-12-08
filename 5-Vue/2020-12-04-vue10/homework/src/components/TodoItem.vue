<template>
    <div v-show="item.canShow">
        <span :style="item.complate? 'text-decoration:line-through':''" >{{item.name}}</span>
        <el-button>complate</el-button>
        <el-button>remove</el-button>
    </div>
</template>

<script>
import { createStore } from 'vuex';
import { readonly } from "vue";
export default {
    setup (props) {
        const store = createStore();
        const item = readonly(props.itemData)

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>