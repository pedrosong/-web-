<template>
    <div>
    <button @click="minusCount">minus</button>
    </div>
</template>

<script>
    export default {
        methods: {
            minusCount() {
                this.$store.commit("minusCount")
            }
        },
    }
</script>
