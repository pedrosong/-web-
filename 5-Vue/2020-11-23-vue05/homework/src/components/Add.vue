<template>
    <div>
        <div>{{count}}</div>
        <button @click="addCount">add</button> 
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        computed:{
            ...mapState(["count"])
        },
        methods:{
            addCount(){
                this.$store.commit("addCount")
            }
        }
    }
</script>